package com.activity.neuron.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.activity.neuron.model.Person;
import com.activity.neuron.service.PersonService;

@RestController
@RequestMapping(value = "/api/person")
public class PersonController {
    
    @Autowired
    private PersonService personService;

    @GetMapping(value = "/{idPerson}") 
    public ResponseEntity<Person> getPersonById(@PathVariable Long idPerson){
        Optional<Person> newPerson = personService.getPersonById(idPerson);

        if(newPerson.isPresent()){
            return new ResponseEntity<Person>(newPerson.get(), HttpStatus.OK);
        }

        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<Person> savePerson(@RequestBody Person person ){
        Person newPerson = personService.createPerson(person);

        return new ResponseEntity<Person>(newPerson, HttpStatus.CREATED);
    }

    @DeleteMapping(value = "/{idPerson}")
    public ResponseEntity<Void> deletePerson(@PathVariable Long idPerson){
        personService.deletePerson(idPerson);

        return ResponseEntity.noContent().build();
    }
}
