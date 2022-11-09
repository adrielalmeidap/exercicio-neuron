package com.activity.neuron.exception;

public class CpfAlreadyRegisteredException extends RuntimeException {
    
    private static final long serialVersionUID = 1L;

    public CpfAlreadyRegisteredException(String msg) {
        super(msg);
    }
}
