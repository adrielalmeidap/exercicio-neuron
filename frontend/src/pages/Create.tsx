import PersonDataService from '../services/person.service';
import { ChangeEvent } from "react";
import { Main } from "../components/main/main";
import IAddress from '../types/address.type';
import React from 'react';
import IPersonInputData from '../types/personInput.type';

export interface ICreatePageProps {}
export interface ICreatePageState {
    lastIndex: number, 
    person: IPersonInputData,
    mapAddress: Map<number, IAddress>,
    addressList: any[]
}

class CreatePage extends React.Component<ICreatePageProps, ICreatePageState> {
    constructor(props: ICreatePageProps){
        super(props);

        this.state = {
            lastIndex: 0, 
            person: {
                id: "",
                fullName: "",
                cpf: "",
                birthDate: "",
                addresses: []
            },
            mapAddress: new Map<number, IAddress>(),
            addressList: []
        }

        this.handleAdd = this.handleAdd.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.updateAddress = this.updateAddress.bind(this);
        this.savePerson = this.savePerson.bind(this);
    } 

    renderDiv(index: number, value: IAddress) {
        return <>
            <div key={index} className='row'>
                <hr className="lightgray-line mt-3" />
                <div className='col-10'>
                    <div className="row">
                        <div className="col-6">
                            <label htmlFor="input1">Rua</label>
                            <input className="form-control" name="street" id="input1" defaultValue={value.street} onChange={(e) => this.updateAddress(index, e)}/>	  
                        </div>

                        <div className="col-4">
                            <label htmlFor="input1">Complemento</label>
                            <input className="form-control" name="complement" id="input1" defaultValue={value.complement} onChange={(e) => this.updateAddress(index, e)}/>	  
                        </div>

                        <div className="col-2">
                            <label htmlFor="input1">CEP</label>
                            <input className="form-control" name="postalCode" id="input1" defaultValue={value.postalCode} onChange={(e) => this.updateAddress(index, e)}/>	  
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <label htmlFor="input1">Bairro</label>
                            <input className="form-control" name="district" id="input1" defaultValue={value.district} onChange={(e) => this.updateAddress(index, e)}/>	  
                        </div>

                        <div className="col">
                            <label htmlFor="input2">Cidade</label>
                            <input className="form-control" name="city" id="input2" defaultValue={value.city} onChange={(e) => this.updateAddress(index, e)}/>	
                        </div>
                        
                        <div className="col">
                            <label htmlFor="input3">Estado</label>
                            <input className="form-control"  name="state" id="input3" defaultValue={value.state} onChange={(e) => this.updateAddress(index, e)}/>	  
                        </div>
                    </div>
                </div>
                <div className='col-2'>
                    <button className="btn btn-outline-warning" onClick={() => this.handleRemove(index)}>remover</button>
                </div>
            </div>
        </>
    }

    handleRemove(index: number){
        const map: Map<number, IAddress> = this.state.mapAddress;;

        if(map.has(index)){
            map.delete(index);
        }

        this.setState({
            addressList: this.state.addressList.filter((address) => address.props.children.key !== "" + index),
            mapAddress: map
        });
    }

    handleAdd() {
        const address: IAddress = {
            id: "",
            postalCode: "",
            district: "",
            city: "",
            street: "",
            complement: "",
            state: ""
        }

        this.state.mapAddress.set(this.state.lastIndex, address);
        this.state.addressList.push(this.renderDiv(this.state.lastIndex, address));
        this.setState({
            addressList: this.state.addressList,
            lastIndex: this.state.lastIndex + 1
        });

    }

    renderAddresses = () => {
        const list = this.state.addressList;
        const map = this.state.mapAddress;

        return list.map((divAddress: any) => {
            const key: number = parseInt(divAddress.props.children.key);
            const address: any = map.get(key);
            return this.renderDiv(key, address);
        });
    }

    savePerson(): void {
        const mapAddress = this.state.mapAddress;
        const person: IPersonInputData = this.state.person;
        
        mapAddress.forEach(value => person.addresses.push(value));
        PersonDataService.postPerson(person).then((response: any) => {
            console.log(response.data);
            
            window.confirm("Cliente cadastrado com sucesso !!");
            window.location.href =  '/';
        }).catch((e: any) => {
            console.log(e);
            window.confirm("CPF inválido !!");
        });
    }

    updateInfoPerson(e: ChangeEvent<HTMLInputElement>): void {
        const person: IPersonInputData = this.state.person;
        const { name, value } = e.target;

        if(name === "fullName") person.fullName = value;
        else if(name === "cpf") person.cpf = value;
        else if(name === "birthDate") person.birthDate = value;
    };

    updateAddress(index: number, e: any): void {
        const { name, value } = e.target;
        const map: Map<number, IAddress> = this.state.mapAddress;
        const address: any = map.get(index);

        if(name === "street") address.street = value;
        else if(name === "complement") address.complement = value;
        else if(name === "postalCode") address.postalCode = value;
        else if(name === "district") address.district = value;
        else if(name === "city") address.city = value;
        else if(name === "state") address.state = value;
        
        map.set(index, address);
        this.setState({
            mapAddress: map
        });
    };

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
                                            <input className="form-control" name="fullName" onChange={(e) => this.updateInfoPerson(e)}/>	  
                                        </div>

                                        <div className="col-3">
                                            <label htmlFor="input2">CPF</label>
                                            <input className="form-control" name="cpf" onChange={(e) => this.updateInfoPerson(e)}/>	
                                        </div>
                                        
                                        <div className="col-3">
                                            <label htmlFor="input3">Dt. Nascimento</label>
                                            <input type="date" className="form-control" name="birthDate" onChange={(e) => this.updateInfoPerson(e)}/>	  
                                        </div>
                                    </div>
                                </article>
                            </div>
                            <div className="box">
                                <article className="securitytable">
                                    <div className="title">
                                        <div className="row">
                                            <div className="col">
                                                <h4><strong>Endereço</strong></h4>
                                            </div>
                                            <div className="col align-left">
                                                <button className="btn btn-outline-success" onClick={this.handleAdd}>Add</button>
                                            </div>
                                        </div>
                                    </div>
                                
                                    {this.renderAddresses()}
                                </article>
                            </div>
                            

                            <div className="text-center">
                                <button className="btn btn-outline-success" onClick={this.savePerson}>Salvar</button>
                            </div>
                        </div>
                    </div>
                </>
            </Main>
        );
    }
}

export default CreatePage;