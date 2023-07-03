package com.people.backend.controller;

import com.people.backend.exception.ResourceNotFoundException;
import com.people.backend.model.Person;
import com.people.backend.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
    @GetMapping("/{id}")
    public ResponseEntity<Person> getPersonById(@PathVariable Long id){
        Person person = personRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Person not found with id: "+id));
        return ResponseEntity.ok(person);
    }
    @PutMapping("/{id}")
    public ResponseEntity<Person> updatePerson(@PathVariable Long id, @RequestBody Person personDetails){
        Person person = personRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Person not found with id: "+id));
        person.setFirstName(personDetails.getFirstName());
        person.setLastName(personDetails.getLastName());
        person.setBirthDate(personDetails.getBirthDate().toString());
        person.setDocumentType(personDetails.getDocumentType());
        person.setDocumentNumber(personDetails.getDocumentNumber());
        Person updatedPerson = personRepository.save(person);
        return ResponseEntity.ok(updatedPerson);
    }
}
