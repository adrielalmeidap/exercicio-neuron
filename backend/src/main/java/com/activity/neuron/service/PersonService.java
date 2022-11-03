package com.activity.neuron.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.activity.neuron.model.Person;
import com.activity.neuron.repository.PersonRepository;

@Service
public class PersonService {
    
    @Autowired
    PersonRepository personRepository;

    public Optional<Person> getPersonById(Long idPerson){
        return personRepository.findById(idPerson);
    }

    public Person createPerson(Person person ){
        return personRepository.save(person);
    }

    public void deletePerson(Long idPerson){
        Optional<Person> optionalPerson = getPersonById(idPerson);

        if(optionalPerson.isPresent()){
            personRepository.deleteById(idPerson);
        }
    }
}
