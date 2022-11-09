package com.activity.neuron.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.activity.neuron.dto.PersonDTO;
import com.activity.neuron.model.Person;
import com.activity.neuron.repository.PersonRepository;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class PersonServiceTest {

    @Mock
    private PersonRepository personRepository;

    PersonService personService;

    private Person person;

    @BeforeEach
    public void setUp() {
        personService = new PersonService(personRepository);

        person = new Person();
        person.setId(1L);
        person.setFullName("Fulano de tal");
        person.setCpf("199.922.399-94");
        person.setBirthDate(new Date());
    }

    @DisplayName("Test method getPersonById")
    @Test
    public void getPerson_Success() {
        when(personRepository.findById(person.getId())).thenReturn(Optional.of(person));

        Optional<Person> personExpected = personService.getPersonById(person.getId());

        assertTrue(personExpected.isPresent());
        assertEquals(person, personExpected.get());
    }

    @DisplayName("Test method getAll")
    @Test
    public void getAllPersons_Success() {
        List<Person> persons = new ArrayList<>();
        persons.add(person);

        List<PersonDTO> personsDTO = new ArrayList<>();
        personsDTO.add(new PersonDTO(person.getId(), person.getFullName(), person.getCpf(), person.getBirthDate()));

        when(personRepository.findAll()).thenReturn(persons);

        List<PersonDTO> personsExpected = personService.getPersons();

        assertEquals(personsExpected, personsDTO);
    }

    @DisplayName("Test method createPerson")
    @Test
    public void savePerson_Success() {
        when(personRepository.save(any(Person.class))).thenReturn(person);

        Person personSaved = personService.createPerson(person);

        assertNotNull(personSaved);
        assertEquals(personSaved, person);
    }

    @DisplayName("Test method updatePerson")
    @Test
    public void updatePerson_Success() {
        when(personRepository.save(any(Person.class))).thenReturn(person);
        when(personRepository.findById(person.getId())).thenReturn(Optional.of(person));
        
        person.setFullName("Outro Fulano");
        person.setCpf("000.000.000-00");
                
        Person personUpdated = personService.updatePerson(person, person.getId());

        assertEquals(personUpdated.getFullName(), "Outro Fulano");
        assertEquals(personUpdated.getCpf(), "000.000.000-00");
    }

    @DisplayName("Test method deletePerson")
    @Test
    public void deletePerson_Success() {
        when(personRepository.findById(person.getId())).thenReturn(Optional.of(person));

        personService.deletePerson(person.getId());
        verify(personRepository).deleteById(person.getId());
    }
}
