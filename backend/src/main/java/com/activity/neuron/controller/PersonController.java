package com.activity.neuron.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.activity.neuron.model.Person;
import com.activity.neuron.service.PersonService;

@RestController
@RequestMapping(value = "/person")
public class PersonController {

    @Autowired
    private PersonService personService;

    @GetMapping
    public ResponseEntity<List<Person>> getAllPersons() {
        return ResponseEntity.ok(personService.getAll());
    }

    @GetMapping(value = "/{idPerson}")
    public ResponseEntity<Person> getPersonById(@PathVariable Long idPerson) {
        Optional<Person> newPerson = personService.getPersonById(idPerson);

        if (newPerson.isPresent()) {
            return new ResponseEntity<Person>(newPerson.get(), HttpStatus.OK);
        }

        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<Person> savePerson(@RequestBody Person person) {
        Person newPerson = personService.createPerson(person);

        return new ResponseEntity<Person>(newPerson, HttpStatus.CREATED);
    }

    @DeleteMapping(value = "/{idPerson}")
    public ResponseEntity<Void> deletePerson(@PathVariable Long idPerson) {
        personService.deletePerson(idPerson);

        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{idPerson}")
    public ResponseEntity<Person> updatePerson(@RequestBody Person personBody, @PathVariable Long idPerson) {
        Person person = personService.updatePerson(personBody, idPerson);

        if (person != null) {
            return new ResponseEntity<Person>(person, HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
