package com.activity.neuron.controller;

import java.util.List;
import java.util.Optional;

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

    private PersonService personService;

    public PersonController(PersonService personService) {
        this.personService = personService;
    }

    @GetMapping
    public ResponseEntity<List<Person>> getAllPersons() {
        return ResponseEntity.ok(personService.getPersons());
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
    public ResponseEntity<?> savePerson(@RequestBody Person person) {
        Person newPerson = personService.createPerson(person);

        if (newPerson != null) {
            return new ResponseEntity<Person>(newPerson, HttpStatus.CREATED);
        }

        return new ResponseEntity<>("CPF already is registered", HttpStatus.CONFLICT);
    }

    @DeleteMapping(value = "/{idPerson}")
    public ResponseEntity<Void> deletePerson(@PathVariable Long idPerson) {
        personService.deletePerson(idPerson);

        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{idPerson}")
    public ResponseEntity<?> updatePerson(@RequestBody Person personBody, @PathVariable Long idPerson) {
        Person person = personService.updatePerson(personBody, idPerson);

        if (person != null) {
            return new ResponseEntity<Person>(person, HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
