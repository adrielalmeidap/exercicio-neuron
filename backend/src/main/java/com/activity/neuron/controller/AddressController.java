package com.activity.neuron.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.activity.neuron.model.Address;
import com.activity.neuron.service.AddressService;

@CrossOrigin
@RestController
@RequestMapping("/address")
public class AddressController {

    @Autowired
    private AddressService addressService;

    @DeleteMapping("/{idAddress}")
    public void deleteAddress(@PathVariable Long idAddress) {
        addressService.deleteAddress(idAddress);
    }

    @PostMapping
    public ResponseEntity<Address> savePerson(@RequestBody Address address) {
        Address newPerson = addressService.createAddress(address);

        return new ResponseEntity<Address>(newPerson, HttpStatus.CREATED);
    }

    @PutMapping("/{idAddress}")
    public ResponseEntity<Address> updatePerson(@RequestBody Address addressBody, @PathVariable Long idAddress) {
        Address address = addressService.updateAddress(addressBody, idAddress);

        if (address != null) {
            return new ResponseEntity<Address>(address, HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
