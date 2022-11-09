package com.activity.neuron.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.activity.neuron.dto.PersonDTO;
import com.activity.neuron.exception.CpfAlreadyRegisteredException;
import com.activity.neuron.model.Person;
import com.activity.neuron.repository.PersonRepository;

@Service
public class PersonService {

    @Autowired
    PersonRepository personRepository;
    
    public PersonService(PersonRepository personRepository) {
        this.personRepository = personRepository;
    }

    public List<PersonDTO> getPersons() {
        return personRepository.findAll().stream().map(p -> new PersonDTO().personToDTO(p)).collect(Collectors.toList());
    }

    public Optional<Person> getPersonById(Long idPerson) {
        return personRepository.findById(idPerson);
    }

    public Person createPerson(Person person) {
        if(this.checkIfCpfIsAlreadyRegistered(person.getCpf(), 0L)) {
            throw new CpfAlreadyRegisteredException("CPF already is registered");
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
            throw new CpfAlreadyRegisteredException("CPF already is registered");
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
