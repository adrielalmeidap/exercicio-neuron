import PersonDataService from '../services/person.service';
import { Link } from 'react-router-dom';
import { Component } from "react";
import { Main } from "../components/main/main";
import { cpfMask, cepMask } from '../utils/masks'

let auxPerson: any = {
    id: "",
    fullName: "",
    cpf: "",
    birthDate: new Date(),
    addresses: [{
        id: null,
        postalCode: "",
        district: "",
        city: "",
        street: "",
        complement: "",
        state: ""
    }]
}

export default class CreatePage extends Component {
    componentDidMount(): void {
        auxPerson = {
            id: "",
            fullName: "",
            cpf: "",
            birthDate: new Date(),
            addresses: []
        }

        let address = {
            id: null,
            postalCode: "",
            district: "",
            city: "",
            street: "",
            complement: "",
            state: ""
        }

        auxPerson.addresses.push(address);
    }
    savePerson(): void {
        if (auxPerson.addresses.length > 1) {
            auxPerson.addresses.splice(1, 1);
        }

        PersonDataService.postPerson(auxPerson).then((response: any) => {
            console.log(response.data);

            window.confirm("Cliente cadastrado com sucesso !!");
            window.location.href = '/';
        }).catch((e: any) => {
            console.log(e);
            window.confirm("CPF inválido !!");
        });
    }

    checkCEP: any = (e: any) => {
        const cep = e.target.value.replace(/\D/g, '');

        if (cep.length === 8) {
            fetch(`https://viacep.com.br/ws/${cep}/json/`).then(res => res.json()).then(data => {
                console.log(data);
                auxPerson.addresses[0].street = data.logradouro;
                auxPerson.addresses[0].district = data.bairro;
                auxPerson.addresses[0].city = data.localidade;
                auxPerson.addresses[0].state = data.uf;
                this.setState(auxPerson);
            });
        }
    }

    formatDate(date: Date): string {
        const newDate = new Date(date);

        let day: string = newDate.getDate() > 9 ? "" + (newDate.getDate() + 1) : "0" + (newDate.getDate() + 1);
        let month: string = newDate.getMonth() > 9 ? "" + (newDate.getMonth() + 1) : "0" + (newDate.getMonth() + 1);
        let year: number = newDate.getFullYear();

        return `${day}/${month}/${year}`;
    }

    updateInfoPerson(e: any): void {
        const { name, value } = e.target;
        console.log(value);

        if (name === "fullName") auxPerson.fullName = value;
        else if (name === "cpf") {
            auxPerson.cpf = cpfMask(value);
            this.setState(auxPerson);
        }
        else if (name === "birthDate") auxPerson.birthDate = value;
    };

    updateAddress(index: number, e: any): void {
        const { name, value } = e.target;

        console.log(name);

        if (name === "street") auxPerson.addresses[index].street = value;
        else if (name === "complement") auxPerson.addresses[index].complement = value;
        else if (name === "postalCode") {
            auxPerson.addresses[index].postalCode = cepMask(value);
            this.setState(auxPerson);
        }
        else if (name === "district") auxPerson.addresses[index].district = value;
        else if (name === "city") auxPerson.addresses[index].city = value;
        else if (name === "state") auxPerson.addresses[index].state = value;
    };

    public render() {
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
                                            <input className="form-control" name="fullName" id="input1" defaultValue={auxPerson.fullName} onChange={(e) => this.updateInfoPerson(e)} />
                                        </div>

                                        <div className="col-3">
                                            <label htmlFor="input2">CPF</label>
                                            <input className="form-control" name="cpf" id="input2" value={cpfMask(auxPerson.cpf)} onChange={(e) => this.updateInfoPerson(e)} />
                                        </div>

                                        <div className="col-3">
                                            <label htmlFor="input3">Dt. Nascimento</label>
                                            <input type="date" className="form-control" name="birthDate" id="input3" onChange={(e) => this.updateInfoPerson(e)} />
                                        </div>
                                    </div>
                                </article>
                            </div>
                            <div className="box">
                                <article className="securitytable">
                                    <div className="title">
                                        <div className="row align-items-start">
                                            <div className="col">
                                                <h4><strong>Endereço</strong></h4>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="address" id="idAddress">
                                        <hr className="lightgray-line" />
                                        <div className="row">
                                            <div className="col-2">
                                                <label htmlFor="input1">CEP</label>
                                                <input className="form-control" name="postalCode" id="input1" onBlur={this.checkCEP} value={cepMask(auxPerson?.addresses[0]?.postalCode)} onChange={(e) => this.updateAddress(0, e)} />
                                            </div>
                                            <div className="col-6">
                                                <label htmlFor="input1">Rua</label>
                                                <input className="form-control" name="street" id="input1" value={auxPerson?.addresses[0]?.street} onChange={(e) => this.updateAddress(0, e)} />
                                            </div>
                                            <div className="col-4">
                                                <label htmlFor="input1">Complemento</label>
                                                <input className="form-control" name="complement" id="input1" onChange={(e) => this.updateAddress(0, e)} />
                                            </div>

                                        </div>

                                        <div className="row">
                                            <div className="col">
                                                <label htmlFor="input1">Bairro</label>
                                                <input className="form-control" name="district" id="input1" value={auxPerson?.addresses[0]?.district} onChange={(e) => this.updateAddress(0, e)} />
                                            </div>

                                            <div className="col">
                                                <label htmlFor="input2">Cidade</label>
                                                <input className="form-control" name="city" id="input2" value={auxPerson?.addresses[0]?.city} onChange={(e) => this.updateAddress(0, e)} />
                                            </div>

                                            <div className="col">
                                                <label htmlFor="input3">Estado</label>
                                                <input className="form-control" name="state" id="input3" value={auxPerson?.addresses[0]?.state} onChange={(e) => this.updateAddress(0, e)} />
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            </div>


                            <div className="text-center">
                                <Link to={"/"}><button className="btn btn-outline-success ms-1">Voltar</button></Link>
                                <button className="btn btn-outline-warning" onClick={this.savePerson}>Salvar</button>
                            </div>
                        </div>
                    </div>
                </>
            </Main>
        );
    }
}
