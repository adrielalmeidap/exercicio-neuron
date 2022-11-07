import React, { useCallback, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import * as Yup from "yup";
import IPersonData from "../types/person.type";
import PersonDataService from "../services/person.service";
import { Main } from "../components/main/main";
import Input from "../components/input/Input";
import getValidationErrors from "../utils/getValidationErrors";

const PersonPage: React.FC = () => {
	const formRef = useRef<FormHandles>(null);
	const { id = "add" } = useParams<"id">();
	const navigate = useNavigate();

	useEffect(() => {
    if (id !== "add") {
      PersonDataService.getPersonById(Number(id))
        .then((result) => {
          if (result instanceof Error) {
            alert(result.message);
          } else {
            formRef.current?.setData(result);
          }
        });
    } else {
      formRef.current?.setData({
        fullName: '',
        cpf: '',
        birthDate: undefined,
      });
    }
  }, [id]);

	const handleSubmit = useCallback(
   	async (data: IPersonData) => {
   		try {
				formRef.current?.setErrors({});
   		
				const schema = Yup.object().shape({
   		   	fullName: Yup.string().required("Nome obrigatório"),
   		   	cpf: Yup.string().required("CPF obrigatório"),
   		   	birthDate: Yup.string().required("Data de nascimento obrigatória")
   		  });
   		
				await schema.validate(data, {
   		   	abortEarly: false,
   		  });

				if (id === 'add') {
					PersonDataService
					.postPerson(data)
					.then((result) => {
						if (result instanceof Error) {
							alert(result.message);
						} else {
							navigate("/");
						}
					});
				} else {
          PersonDataService
            .updatePerson({ id: Number(id), ...data })
            .then((result) => {

              if (result instanceof Error) {
                alert(result.message);
              } else {
                navigate("/");
              }
            });
				}
			} catch (err) {
   		  if (err instanceof Yup.ValidationError) {
      		const errors = getValidationErrors(err);
      		formRef.current?.setErrors(errors);
					return;
   		  }
				console.log(err);
   		}
   	},
   	[id, navigate],
	);

	const handleReset = () => {
		navigate("/");	
	}

  return (
		<Main icon="home" title="Paginal inicial" subtitle="Menu inicial">
			<div className="container">
				<Form ref={formRef} onSubmit={handleSubmit} onReset={handleReset}>
					<div className="form-floating mb-3">
						<Input name="fullName" label="Nome Completo"/>
					</div>
					<div className="row g-2">
						<div className="form-floating mb-3 col-md">
							<Input name="cpf" label="CPF" />
						</div>
						<div className="form-floating mb-3 col-md">
							<Input name="birthDate" label="Data de Nascimento" />
						</div>
					</div>
					<button type="submit" className="btn btn-primary m-1">Salvar</button>
					<button type="reset" className="btn btn-danger m-1">Cancelar</button>
				</Form>			
			</div>
		</Main>
	)
};

export default PersonPage;