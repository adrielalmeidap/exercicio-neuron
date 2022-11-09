import { Component } from 'react';
import IPersonData from '../types/person.type';
import PersonDataService from '../services/person.service';
import { Main } from '../components/main/main';
import { Link } from 'react-router-dom';
import { formatDate } from '../utils/dateFormat';

export interface IHomePageProps {}

export interface IState {
    people: Array<IPersonData>
}

export default class HomePage extends Component<IHomePageProps, IState> {
    constructor(props: IHomePageProps){
        super(props);
        this.getPersonAll = this.getPersonAll.bind(this);
        this.state = { people: []}
    }
    
    componentDidMount(): void {
        this.getPersonAll();
    }

    getPersonAll(){
        PersonDataService.getAll().then((response: any) => {
            this.setState({
                people: response.data
            });
            console.log(response.data);
        }).catch((e: Error) => {
            console.log(e);
        });
    }

    deletePerson (id: number) {
        if (window.confirm("Deseja realmente realizar a deleção deste registro?")) {
            PersonDataService.delete(id);
            let elementPerson: any = window.document.getElementById('person' + id);
            elementPerson.parentNode.removeChild(elementPerson);
        }
    }

    public render(){
        const people = this.state.people;

        return (
            <Main icon='home' title="Paginal inicial" subtitle="Menu inicial">
                <table className="table table-striped table-hover">
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">Nome completo</th>
                            <th scope="col">CPF</th>
                            <th scope="col">Data de nascimento</th>
                            <th scope="col">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {people && people.map(people =>
                            <tr id={'person' + people.id} key={people.id}>
                                <td>{people.fullName}</td>
                                <td>{people.cpf}</td>
                                <td>{formatDate(people.birthDate, "pt_BR")}</td>
                                <td>
                                  <Link to={"/view/id?" + people.id} className="btn btn-outline-success m-1"><i className="bi bi-eye"></i></Link>
                                  <Link to={`/person/id?${people.id}`} className="btn btn-outline-warning m-1"><i className="bi bi-pencil"></i></Link>
                                  <button className="btn btn-outline-danger m-1" onClick={() => this.deletePerson(people.id)}><i className="bi bi-trash3-fill"></i></button>                                  
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </Main>
        );
    }
}