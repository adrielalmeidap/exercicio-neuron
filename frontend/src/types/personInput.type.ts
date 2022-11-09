import IAddress from "./address.type";

export default interface IPersonInputData {
    id?: any | null,
    fullName: string,
    cpf: string,
    birthDate: string,
    addresses: Array<IAddress>
}