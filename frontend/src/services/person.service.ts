import http from "../http-common";
import IPersonData from "../types/person.type";

class PersonDataService {

	getAll(){
        return http.get<Array<IPersonData>>("/person");
  }
	
	getPersonById = async (id: number): Promise<IPersonData | Error> => {
		try {
			const { data } = await http.get<IPersonData>(`/person/${id}`);
	
			if (data) {
				return data;
			}
	
			return new Error('Erro ao consultar o registro.');
		} catch (error) {
			console.error(error);
			return new Error((error as { message: string }).message || 'Erro ao consultar o registro.');
		}
	};

	postPerson = async (dados: Omit<IPersonData, 'id'>): Promise<IPersonData | Error> => {
		try {
			const { data } = await http.post<IPersonData>('/person', dados);
	
			if (data) {
				return data;
			}
	
			return new Error('Erro ao criar o registro.');
		} catch (error) {
			console.error(error);
			return new Error((error as { message: string }).message || 'Erro ao criar o registro.');
		}
	};

	updatePerson = async (dados: IPersonData): Promise<IPersonData | Error> => {
		try {
			const { data } = await http.put(`/person/${dados.id}`, dados);

			if (data) {
				return data;
			}

			return new Error('Erro ao atualizar o registro.');			
		} catch (error) {
			console.error(error);
			return new Error((error as { message: string }).message || 'Erro ao atualizar o registro.');
		}
	};
	
}

export default new PersonDataService();