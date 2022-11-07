import IAddress from "./address.type";

export default interface IPersonData {
    id?: any | null,
    fullName: string,
    cpf: string,
    birthDate: string,
    addresses: Array<IAddress>
}