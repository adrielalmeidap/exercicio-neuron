package com.activity.neuron.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.activity.neuron.model.Person;
import com.activity.neuron.repository.PersonRepository;

@Service
public class PersonService {

    @Autowired
    PersonRepository personRepository;
    
    public PersonService(PersonRepository personRepository) {
        this.personRepository = personRepository;
    }

    public List<Person> getPersons() {
        return personRepository.findAll();
    }

    public Optional<Person> getPersonById(Long idPerson) {
        return personRepository.findById(idPerson);
    }

    public Person createPerson(Person person) {
        if(this.checkIfCpfIsAlreadyRegistered(person.getCpf(), 0L)) {
            return null;
        }

        return personRepository.save(person);
    }

    public void deletePerson(Long idPerson) {
        Optional<Person> optionalPerson = personRepository.findById(idPerson);

        if (optionalPerson.isPresent()) {
            personRepository.deleteById(idPerson);
        }
    }

    public Person updatePerson(Person person, long idPerson) {
        if(this.checkIfCpfIsAlreadyRegistered(person.getCpf(), person.getId())) {
            return null;
        }

        Person personSaved = this.personRepository.findById(idPerson)
                .map(personTarget -> {
                    person.setId(idPerson);
                    personTarget.setBirthDate(person.getBirthDate());
                    personTarget.setCpf(person.getCpf());
                    personTarget.setFullName(person.getFullName());
                    personTarget.setAddresses(person.getAddresses());
                    return personTarget;
                }).orElse(null);

        if (personSaved != null) {
            return this.personRepository.save(personSaved);
        }

        return null;
    }

    private boolean checkIfCpfIsAlreadyRegistered(String cpf, Long id) {
        return this.personRepository.existsByCpfLikeAndIdNot(cpf, id);
    }
}
