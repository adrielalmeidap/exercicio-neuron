package com.activity.neuron.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.activity.neuron.model.Address;
import com.activity.neuron.repository.AddressRepository;

@Service
public class AddressService {

    @Autowired
    AddressRepository addressRepository;

    public Address createAddress(Address address) {
        return addressRepository.save(address);
    }

    public void deleteAddress(Long idAddress) {
        Optional<Address> optionalAddress = this.addressRepository.findById(idAddress);

        if (optionalAddress.isPresent()) {
            addressRepository.deleteById(idAddress);
        }
    }

    public Address updateAddress(Address address, long idAddress) {
        Address addressSaved = this.addressRepository.findById(idAddress)
                .map(addressTarget -> {
                    addressTarget.setComplement(address.getComplement());
                    addressTarget.setCity(address.getCity());
                    addressTarget.setDistrict(address.getDistrict());
                    addressTarget.setPostalCode(address.getPostalCode());
                    addressTarget.setState(address.getState());
                    addressTarget.setStreet(address.getStreet());
                    return addressTarget;
                }).orElse(null);

        if (addressSaved != null) {
            return this.addressRepository.save(addressSaved);
        }

        return null;
    }
}
