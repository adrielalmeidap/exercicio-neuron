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

    public List<Person> getAll() {
        return personRepository.findAll();
    }

    public Optional<Person> getPersonById(Long idPerson) {
        return personRepository.findById(idPerson);
    }

    public Person createPerson(Person person) {
        return personRepository.save(person);
    }

    public void deletePerson(Long idPerson) {
        Optional<Person> optionalPerson = getPersonById(idPerson);

        if (optionalPerson.isPresent()) {
            personRepository.deleteById(idPerson);
        }
    }

    public Person updatePerson(Person person, long idPerson) {
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
}
