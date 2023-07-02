package com.people.backend.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;
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
    @Column(name = "birth_date")

    private Date birthDate;
    @Column(name = "document_type")
    private String documentType;
    @Column(name = "document_number")
    private Long documentNumber;



    public enum DocumentTypeEnum {
        DNI, PASAPORTE , CEDULA
    }

    public void setBirthDate(String birthDate) {
       try {
           SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
            this.birthDate = dateFormat.parse(birthDate);
       }
       catch (ParseException e){
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
