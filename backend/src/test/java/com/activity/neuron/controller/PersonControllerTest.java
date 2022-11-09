package com.activity.neuron.controller;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import com.activity.neuron.dto.PersonDTO;
import com.activity.neuron.model.Person;
import com.activity.neuron.service.PersonService;
import com.fasterxml.jackson.databind.ObjectMapper;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@WebMvcTest({ PersonController.class })
public class PersonControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    PersonService personService;

    private Person person;

    @BeforeEach
    public void setUp() {
        person = new Person(1L, "Fulano de Tal", "199.299.993-49", null, null);
    }

    @Test
    public void getPersons_Success() throws Exception {
        List<PersonDTO> persons = new ArrayList<>();
        persons.add(new PersonDTO(person.getId(), person.getFullName(), person.getCpf(), person.getBirthDate()));

        when(personService.getPersons()).thenReturn(persons);

        mockMvc.perform(
                MockMvcRequestBuilders
                        .get("/person")
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.[*].id").isNotEmpty());
    }

    @Test
    public void getPerson_Success() throws Exception {
        when(personService.getPersonById(person.getId())).thenReturn(Optional.of(person));

        mockMvc.perform(
                MockMvcRequestBuilders
                    .get("/person/{id}", person.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.fullName").value(person.getFullName()));

    }

    @Test
    public void savePerson_Success() throws Exception {
        when(personService.createPerson(any(Person.class))).thenReturn(person);

        mockMvc.perform(
                MockMvcRequestBuilders.post("/person")
                        .content(asJsonString(person))
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.fullName").value(person.getFullName()));
    }

    @Test
    public void deletePerson_success() throws Exception {
        mockMvc.perform(
                MockMvcRequestBuilders.delete("/person/{id}", person.getId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isNoContent());
    }

    @Test
    public void updatePerson_success() throws Exception {
        when(personService.updatePerson(person, person.getId())).thenReturn(person);

        mockMvc.perform(
                MockMvcRequestBuilders.put("/person/{id}", person.getId())
                    .content(asJsonString(person))
                    .contentType(MediaType.APPLICATION_JSON)
                    .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.cpf").value("199.299.993-49"));
    }

    private static String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

}
