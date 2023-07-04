import React, { useEffect, useState } from "react";
import PersonService from "../services/PersonService";
import { useNavigate, useParams } from "react-router-dom";

const AddPersonComponent = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [documentType, setDocumentType] = useState("");
    const [documentNumber, setDocumentNumber] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    const saveOrUpdatePerson = (e) => {
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
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Document type </label>
                                    <select
                                        className="form-control"
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
