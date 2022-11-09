package com.activity.neuron.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.activity.neuron.dto.PersonDTO;
import com.activity.neuron.exception.CpfAlreadyRegisteredException;
import com.activity.neuron.exception.ResourceNotFoundException;
import com.activity.neuron.model.Person;
import com.activity.neuron.model.ResponseError;
import com.activity.neuron.service.PersonService;

@CrossOrigin
@RestController
@RequestMapping(value = "/person")
public class PersonController {

    private PersonService personService;

    public PersonController(PersonService personService) {
        this.personService = personService;
    }

    @GetMapping
    public ResponseEntity<List<PersonDTO>> getAllPersons() {
        return ResponseEntity.ok(personService.getPersons());
    }

    @GetMapping(value = "/{idPerson}")
    public ResponseEntity<Person> getPersonById(@PathVariable Long idPerson) {
        Optional<Person> newPerson = personService.getPersonById(idPerson);

        if (newPerson.isPresent()) {
            return new ResponseEntity<Person>(newPerson.get(), HttpStatus.OK);
        }

        throw new ResourceNotFoundException("Not found Person with id = " + idPerson);
    }

    @PostMapping
    public ResponseEntity<?> savePerson(@RequestBody Person person) {
        Person newPerson = personService.createPerson(person);

        if (newPerson != null) {
            return new ResponseEntity<Person>(newPerson, HttpStatus.CREATED);
        }

        return new ResponseEntity<>(new ResponseError(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Unknow Error"),
                HttpStatus.INTERNAL_SERVER_ERROR);
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

    @ExceptionHandler(CpfAlreadyRegisteredException.class)
    public ResponseEntity<ResponseError> exceptionCpfAlreadyRegistered(Exception ex) {
        ResponseError error = new ResponseError(HttpStatus.CONFLICT.value(), ex.getMessage());

        return new ResponseEntity<ResponseError>(error, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ResponseError> exceptionResourceNotFound(Exception ex) {
        ResponseError error = new ResponseError(HttpStatus.NOT_FOUND.value(), ex.getMessage());

        return new ResponseEntity<ResponseError>(error, HttpStatus.NOT_FOUND);
    }
}
