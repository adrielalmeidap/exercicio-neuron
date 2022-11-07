package com.activity.neuron.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.activity.neuron.model.Address;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {

}
