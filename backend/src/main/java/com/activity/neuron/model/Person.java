package com.activity.neuron.model;

import java.util.Date;
import java.util.List;

public class Person {
    private Long id;
    private String fullName;
    private String cpf;
    private Date birthDate;
    private List<Address> addresses;

    public Person() {
    }

    public Person(Long id, String fullName, String cpf, Date birthDate, List<Address> addresses) {
        this.id = id;
        this.fullName = fullName;
        this.cpf = cpf;
        this.birthDate = birthDate;
        this.addresses = addresses;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public Date getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(Date birthDate) {
        this.birthDate = birthDate;
    }

    public List<Address> getAddresses() {
        return addresses;
    }

    public void setAddresses(List<Address> addresses) {
        this.addresses = addresses;
    }
}
