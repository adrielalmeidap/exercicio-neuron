import IPersonData from "../types/person.type"
import PersonDataService from '../services/person.service';
import { Link, RouterProps } from 'react-router-dom';
import { Component } from "react";
import { Main } from "../components/main/main";
import { cpfMask, cepMask } from '../utils/masks';
import { formatDate } from '../utils/dateFormat';

let auxPerson: IPersonData = {
    id: "",
    fullName: "",
    cpf: "",
    birthDate: new Date(),
    addresses: []
};

export default class EditPage extends Component{
    constructor(props: RouterProps){
        super(props);
        auxPerson = {
            id: "",
            fullName: "",
            cpf: "",
            birthDate: new Date(),
            addresses: []
        };
        this.setState(auxPerson);
        this.getPerson = this.getPerson.bind(this);
    }

    componentDidMount(): void {
        auxPerson = {
            id: "",
            fullName: "",
            cpf: "",
            birthDate: new Date(),
            addresses: []
        }

        const url = window.location.href;
        const idParam = url.split("?")[1];

        this.getPerson(idParam);
    }

    async getPerson(idParam: string): Promise<void>{
        await PersonDataService.get(idParam).then((response: any) => {
            auxPerson = response.data;
            this.setState(auxPerson);
        }).catch((e: Error) => {
            console.log(e);
            window.location.href = "/";
        });
    }
    
    savePerson(): void {
        PersonDataService.updatePerson(auxPerson).then((response: any) => {
			if (response instanceof Error) {
				alert("CPF já cadastrado");
			} else {
				alert("Cliente alterado com sucesso !!");
			}
        }).catch((e: Error) => {
            console.log(e);
            window.location.href = "/person/id?" + auxPerson.id;
        });
    }

    updateInfoPerson(e: any): void {
        const { name, value } = e.target;
      
        if(name === "fullName") auxPerson.fullName = value;
        else if(name === "cpf") {
			auxPerson.cpf = cpfMask(value);
			this.setState(auxPerson);
		}
		else if(name === "birthDate") {
			auxPerson.birthDate = value;
			this.setState(auxPerson);
		} 

    };

    updateAddress(index: number, e: any): void {
        const { name, value } = e.target;
        
        if(name === "street") auxPerson.addresses[index].street = value;
        else if(name === "complement") auxPerson.addresses[index].complement = value;
        else if(name === "postalCode") {
			auxPerson.addresses[index].postalCode = cepMask(value);
			this.setState(auxPerson);
		}
        else if(name === "district") auxPerson.addresses[index].district = value;
        else if(name === "city") auxPerson.addresses[index].city = value;
        else if(name === "state") auxPerson.addresses[index].state = value;
    };

    renderAddress(person: IPersonData){
        return  person.addresses.map( (address, index) => {
            return (
                <>
                    <div>
                        <hr className="lightgray-line" />
                        <div className="row">
                            <div className="col-6">
                                <label htmlFor="input1">Rua</label>
                                <input className="form-control" name="street" id="input1" defaultValue={address.street} onChange={(e) => this.updateAddress(index, e)}/>	  
                            </div>

                            <div className="col-4">
                                <label htmlFor="input1">Complemento</label>
                                <input className="form-control" name="complement" id="input1" defaultValue={address.complement} onChange={(e) => this.updateAddress(index, e)}/>	  
                            </div>

                            <div className="col-2">
                                <label htmlFor="input1">CEP</label>
                                <input className="form-control" name="postalCode" id="input1" value={cepMask(address.postalCode)} onChange={(e) => this.updateAddress(index, e)}/>	  
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <label htmlFor="input1">Bairro</label>
                                <input className="form-control" name="district" id="input1" defaultValue={address.district} onChange={(e) => this.updateAddress(index, e)}/>	  
                            </div>

                            <div className="col">
                                <label htmlFor="input2">Cidade</label>
                                <input className="form-control" name="city" id="input2" defaultValue={address.city} onChange={(e) => this.updateAddress(index, e)}/>	
                            </div>
                            
                            <div className="col">
                                <label htmlFor="input3">Estado</label>
                                <input className="form-control"  name="state" id="input3" defaultValue={address.state} onChange={(e) => this.updateAddress(index, e)}/>	  
                            </div>
                        </div>
                    </div>
                </>
            );
        });
    }

    public render(){
        return (
            <Main icon='user' title="Página do cliente" subtitle="Perfil do cliente">
                <>
                    <div className="securities">
                        <div className="container">
                            <div className="box">
                                <article className="securitytable">
                                    <div className="title">
                                        <h4>
                                            <strong>Informações pessoais</strong>
                                        </h4>
                                        <hr className="lightgray-line" />
                                    </div>
                                    <div className="row">
                                        <div className="col-6">
                                            <label htmlFor="input1">Nome completo</label>
                                            <input className="form-control" name="fullName" id="input1" defaultValue={auxPerson.fullName} onChange={(e) => this.updateInfoPerson(e)}/>	  
                                        </div>

                                        <div className="col-3">
                                            <label htmlFor="input2">CPF</label>
                                            <input className="form-control" name="cpf" id="input2" value={cpfMask(auxPerson.cpf)} onChange={(e) => this.updateInfoPerson(e)}/>	
                                        </div>
                                        
                                        <div className="col-3">
                                            <label htmlFor="input3">Dt. Nascimento</label>
                                            <input type="date" className="form-control" name="birthDate" id="input3" value={formatDate(auxPerson.birthDate, "en_US")} onChange={(e) => this.updateInfoPerson(e)} />	  
                                        </div>
                                    </div>
                                </article>
                            </div>
                            <div className="box">
                                <article className="securitytable">
                                    <div className="title">
                                        <div className="row align-items-start">
                                            <div className="col">
                                                <h4><strong>Endereços</strong></h4>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {this.renderAddress(auxPerson)}
                                </article>
                            </div>
                            

                            <div className="text-center">
                                <Link to={"/"}><button className="btn btn-outline-success m-1">Voltar</button></Link>
                                <Link to={""}><button className="btn btn-outline-warning m-1" onClick={this.savePerson}>Salvar</button></Link>
                            </div>
                        </div>
                    </div>
                </>
            </Main>
        );
    }
}
