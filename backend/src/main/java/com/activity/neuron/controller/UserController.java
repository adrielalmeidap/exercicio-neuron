package com.activity.neuron.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class UserController {

    @GetMapping("/")
    public String apiIsRunning() {
        return "Running";
    }
}
