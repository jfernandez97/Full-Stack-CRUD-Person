package com.people.backend;

import com.people.backend.model.Person;
import com.people.backend.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.Date;

@SpringBootApplication
public class BackendApplication implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@Autowired
	private PersonRepository personRepository;
	@Override
	public void run(String... args) throws Exception {
//		Person person1 = new Person();
//		person1.setFirstName("Juan");
//		person1.setLastName("Fernandez");
//		person1.setBirthDate("1997-02-27");
//		person1.setDocumentType(Person.DocumentTypeEnum.DNI);
//		person1.setDocumentNumber(40245923L);
//		personRepository.save(person1);
//
//		Person person2 = new Person();
//		person2.setFirstName("Matias");
//		person2.setLastName("Mercado");
//		person2.setBirthDate("1996-10-05");
//		person2.setDocumentType(Person.DocumentTypeEnum.DNI);
//		person2.setDocumentNumber(39235678L);
//		personRepository.save(person2);


	}
}
