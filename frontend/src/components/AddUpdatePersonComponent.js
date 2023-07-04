import React, { useEffect, useState } from "react";
import PersonService from "../services/PersonService";
import { useNavigate, useParams } from "react-router-dom";

const AddPersonComponent = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [documentType, setDocumentType] = useState("");
    const [documentNumber, setDocumentNumber] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [firstNameError, setFirstNameError] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    const [documentTypeError, setDocumentTypeError] = useState("");
    const [documentNumberError, setDocumentNumberError] = useState("");
    const [birthDateError, setBirthDateError] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    const saveOrUpdatePerson = (e) => {
        if (validateForm()) {
            e.preventDefault();
            let person = {
                firstName: firstName,
                lastName: lastName,
                documentType: documentType,
                documentNumber: documentNumber,
                birthDate: birthDate,
            };
            if (id) {
                PersonService.updatePerson(id, person)
                    .then((response) => {
                        console.log(response.data);
                        navigate("/persons");
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } else {
                PersonService.createPerson(person)
                    .then((response) => {
                        console.log(response.data);
                        navigate("/persons");
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        }
    };
    useEffect(() => {
        if (id) {
            PersonService.getPersonById(id)
                .then((response) => {
                    console.log(response, "response");
                    setFirstName(response.data.firstName);
                    setLastName(response.data.lastName);
                    setDocumentType(response.data.documentType);
                    setDocumentNumber(response.data.documentNumber);
                    setBirthDate(response.data.birthDate);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [id]);
    const validateForm = () => {
        let isValid = true;

        // Reset error messages
        setFirstNameError("");
        setLastNameError("");
        setDocumentTypeError("");
        setDocumentNumberError("");
        setBirthDateError("");

        // Validate firstName
        if (firstName.trim() === "") {
            setFirstNameError("First Name is required");
            isValid = false;
        }

        // Validate lastName
        if (lastName.trim() === "") {
            setLastNameError("Last Name is required");
            isValid = false;
        }

        // Validate documentType
        if (documentType.trim() === "") {
            setDocumentTypeError("Document Type is required");
            isValid = false;
        }

        // Validate documentNumber
        if (documentNumber.trim() === "") {
            setDocumentNumberError("Document Number is required");
            isValid = false;
        }

        // Validate birthDate
        if (birthDate.trim() === "") {
            setBirthDateError("Birth Date is required");
            isValid = false;
        }

        return isValid;
    };
    const title = id ? (
        <h2 className="text-center">Update Person</h2>
    ) : (
        <h2 className="text-center">Add Person</h2>
    );
    return (
        <div>
            <div className="container p-4">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        {title}
                        <div className="card-body">
                            <form>
                                <div className="form-group">
                                    <label className="form-label">Name </label>
                                    <input
                                        type="text"
                                        placeholder="Name..."
                                        name="firstName"
                                        className="form-control"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                    {firstNameError && <div className="text-danger">{firstNameError}</div>}
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Lastname </label>
                                    <input
                                        type="text"
                                        placeholder="Lastname..."
                                        name="lastName"
                                        className="form-control"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                    {lastNameError && <div className="text-danger">{lastNameError}</div>}
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Document type </label>
                                    <select
                                        className="form-control"
                                        name="documentType"
                                        value={documentType}
                                        onChange={(e) => setDocumentType(e.target.value)}
                                    >
                                        <option value="" disabled selected>
                                            {" "}
                                            Select...
                                        </option>
                                        <option value="DNI">DNI</option>
                                        <option value="PASAPORTE">Pasaporte</option>
                                        <option value="CEDULA">Cédula</option>
                                    </select>
                                    {documentTypeError && <div className="text-danger">{documentTypeError}</div>}
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Document Number </label>
                                    <input
                                        type="text"
                                        name="documentNumber"
                                        className="form-control"
                                        value={documentNumber}
                                        onChange={(e) => setDocumentNumber(e.target.value)}
                                    />
                                    {documentNumberError && <div className="text-danger">{documentNumberError}</div>}
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Birthdate </label>
                                    <input
                                        type="date"
                                        name="birthDate"
                                        className="form-control"
                                        value={birthDate}
                                        onChange={(e) => setBirthDate(e.target.value)}
                                    />
                                </div>
                                {birthDateError && <div className="text-danger">{birthDateError}</div>}
                                <div className="d-flex justify-content-between p-4">
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={(e) => navigate("/persons")}
                                    >
                                        Volver
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-success"
                                        onClick={(e) => saveOrUpdatePerson(e)}
                                    >
                                        Guardar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddPersonComponent;
