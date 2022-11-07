import http from "../http-common";
import IPersonData from "../types/person.type";

class PersonDataService {
    getAll(){
        return http.get<Array<IPersonData>>("/person");
    }
    get(id: string){
        return http.get<IPersonData>(`/person/${id}`);
    }
}

export default new PersonDataService();