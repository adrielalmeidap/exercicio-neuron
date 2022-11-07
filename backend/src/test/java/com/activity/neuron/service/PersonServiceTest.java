package com.activity.neuron.service;

import java.util.Date;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;

import com.activity.neuron.model.Person;
import com.activity.neuron.repository.PersonRepository;

import static org.assertj.core.api.Java6Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class PersonServiceTest {

    @Mock
    private PersonRepository personRepository;

    @Autowired
    PersonService personService;

    @Test
    public void savedPerson_Success() {
        Person person = new Person();
        person.setFullName("Fulano de tal");
        person.setCpf("199.922.399-94");
        person.setBirthDate(new Date());

        when(personRepository.save(any(Person.class))).thenReturn(person);

        Person personSaved = personRepository.save(person);
        assertNotNull(personSaved);
    }
}
