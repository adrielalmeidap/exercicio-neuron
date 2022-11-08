import IPersonData from "../types/person.type"
import PersonDataService from '../services/person.service';
import { Link, RouterProps } from 'react-router-dom';
import { Component } from "react";
import { Main } from "../components/main/main";

interface IViewPageProps {
}

interface IState {
    person: IPersonData
}

export default class ViewPage extends Component<IViewPageProps, IState>{
    constructor(props: RouterProps){
        super(props);
        this.getPerson = this.getPerson.bind(this);
        this.state = { 
            person: {
                id: "",
                fullName: "",
                cpf: "",
                birthDate: new Date(),
                addresses: []
            }
        };
    }

    componentDidMount(): void {
        const url = window.location.href;
        const idParam = url.split("?")[1];

        this.getPerson(idParam)
    }

    getPerson(idParam: string): void{
        PersonDataService.get(idParam).then((response: any) => {
            this.setState({
                person: response.data
            });
            console.log(response.data);
        }).catch((e: Error) => {
            console.log(e);
            window.location.href = "/";
        });
    }

    formatDate(date: Date){
        const newDate = new Date(date);

        let day: string = newDate.getDate() > 10 ? "" + (newDate.getDate() + 1) : "0" + (newDate.getDate() + 1);
        let month: string = newDate.getMonth() > 10 ? "" + (newDate.getMonth() + 1) : "0" + (newDate.getMonth() + 1);
        let year: number = newDate.getFullYear();

        return `${day}/${month}/${year}`;
    }

    renderAddress(person: IPersonData){
        return  this.state.person.addresses.map( address => {
            return (
                <>
                    <div>
                        <hr className="lightgray-line" />
                        <div className="row">
                            <div className="col-6">
                                <label htmlFor="input1">Rua</label>
                                <input className="form-control" id="input1" value={address.street} disabled/>	  
                            </div>

                            <div className="col-4">
                                <label htmlFor="input1">Complemento</label>
                                <input className="form-control" id="input1" value={address.complement} disabled/>	  
                            </div>

                            <div className="col-2">
                                <label htmlFor="input1">CEP</label>
                                <input className="form-control" id="input1" value={address.postalCode} disabled/>	  
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <label htmlFor="input1">Bairro</label>
                                <input className="form-control" id="input1" value={address.district} disabled/>	  
                            </div>

                            <div className="col">
                                <label htmlFor="input2">Cidade</label>
                                <input className="form-control" id="input2" value={address.city} disabled/>	
                            </div>
                            
                            <div className="col">
                                <label htmlFor="input3">Estado</label>
                                <input className="form-control" id="input3" value={address.state} disabled/>	  
                            </div>
                        </div>
                    </div>
                </>
            );
        });
    }

    public render(){
        const person = this.state.person;

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
                                            <input className="form-control" id="input1" value={person.fullName} disabled/>	  
                                        </div>

                                        <div className="col-3">
                                            <label htmlFor="input2">CPF</label>
                                            <input className="form-control" id="input2" value={person.cpf} disabled/>	
                                        </div>
                                        
                                        <div className="col-3">
                                            <label htmlFor="input3">Dt. Nascimento</label>
                                            <input className="form-control" id="input3" value={this.formatDate(person.birthDate)} disabled/>	  
                                        </div>
                                    </div>
                                </article>
                            </div>
                            <div className="box">
                                <article className="securitytable">
                                    <div className="title">
                                        <h4>
                                            <strong>Endereços</strong>
                                        </h4>
                                    </div>
                                    
                                    {this.renderAddress(person)}
                                </article>
                            </div>
                            

                            <div className="text-center">
                                <Link to={"/"}><button className="btn btn-outline-success ms-1">Voltar</button></Link>
                                <Link to={"/"}><button className="btn btn-outline-warning">Editar</button> </Link>
                            </div>
                        </div>
                    </div>
                </>
            </Main>
        );
    }
}