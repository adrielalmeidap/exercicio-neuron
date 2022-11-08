package com.activity.neuron.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.activity.neuron.model.Person;

@Repository
public interface PersonRepository extends JpaRepository<Person, Long> {

    public boolean existsByCpfLikeAndIdNot(String cpf, Long id);
}
