import { Component } from 'react';
import IPersonData from '../types/person.type';
import PersonDataService from '../services/person.service';
import { Main } from '../components/main/main';
import { Link } from 'react-router-dom';

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
                            <th scope="col">Qtd. de endereços</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {people && people.map(people =>
                            <tr key={people.id}>
                                <td>{people.fullName}</td>
                                <td>{people.cpf}</td>
                                <td>{people.birthDate.toString()}</td>
                                <td>{people.addresses.length}</td>
                                <td>
                                    <Link to={"/view/id?" + people.id}>
                                        <button className="btn btn-outline-success"><i className="bi bi-eye"></i></button>
                                    </Link>
                                    <button className="btn btn-outline-warning"><i className="bi bi-pencil"></i></button>
                                    <button className="btn btn-outline-danger"><i className="bi bi-trash3-fill"></i></button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </Main>
        );
    }
}