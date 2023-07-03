package com.people.backend.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.Date;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "person")
public class Person {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "first_name",length = 50)
    private String firstName;
    @Column(name = "last_name",length = 50)
    private String lastName;
    @Column(columnDefinition = "DATE")
    private LocalDate birthDate;
    @Column(name = "document_type")
    private String documentType;
    @Column(name = "document_number")
    private String documentNumber;



    public enum DocumentTypeEnum {
        DNI, PASAPORTE , CEDULA
    }

    public void setBirthDate(String birthDate) {
       try {
           DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
           LocalDate parsedDate = LocalDate.parse(birthDate, formatter);
           this.birthDate = parsedDate;
       }
       catch (DateTimeParseException e){
           e.printStackTrace();
       }
    }
    public void setDocumentType (DocumentTypeEnum documentType){
        this.documentType = documentType.name();
    }

    public DocumentTypeEnum getDocumentType(){
        if (documentType == null){
            return null;
        }
        return DocumentTypeEnum.valueOf(documentType);
    }

}
