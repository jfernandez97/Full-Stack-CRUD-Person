package com.people.backend.controller;

import com.people.backend.model.Person;
import com.people.backend.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/persons")
public class PersonController {
    @Autowired
    private PersonRepository personRepository;

    @GetMapping
    public List<Person> getAllPersons(){
        return personRepository.findAll();
    }
    @PostMapping
    public  Person createPerson(@RequestBody Person person){
        return personRepository.save(person);
    }
}
