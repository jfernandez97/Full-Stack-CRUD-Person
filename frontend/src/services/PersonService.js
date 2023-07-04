import axios from 'axios';

const PERSON_API_BASE_URL = 'http://localhost:8080/api/v1/persons/';

class PersonService {

    getAllPersons() {
        return axios.get(PERSON_API_BASE_URL);
    }
    createPerson(person) {
        return axios.post(PERSON_API_BASE_URL, person);
    }
    getPersonById(personId) {
        return axios.get(PERSON_API_BASE_URL + personId);
    }
    updatePerson(personId, person) {
        return axios.put(PERSON_API_BASE_URL + personId, person);
    }
    deletePerson(personId) {
        return axios.delete(PERSON_API_BASE_URL + personId);
    }
}

export default new PersonService();