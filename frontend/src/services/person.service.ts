import http from "../http-common";
import IPersonData from "../types/person.type";

class PersonDataService {
    getAll(){
        return http.get<Array<IPersonData>>("/person");
    }
}

export default new PersonDataService();