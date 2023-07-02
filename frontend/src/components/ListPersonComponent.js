import React, { useEffect, useState } from 'react'
import PersonService from '../services/PersonService';

const ListPersonComponent = () => {

    const [persons, setPersons] = useState([]);

    useEffect(() => {
        PersonService.getAllPersons().then((response) => {
            setPersons(response.data);
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        })
    }, [])
  return (
    <div className='container'>
        <h2 className='text-center'> Personas </h2>
        <table className='table table-boreded table-striped'>
            <thead>
                <th>Id</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Tipo Documento</th>
                <th>Numero Documento</th>
                <th>Fecha Nacimiento</th>
            </thead>
            <tbody>
                {
                    persons.map(
                        person =>
                        <tr key={person.id}>
                            <td>{person.id}</td>
                            <td>{person.firstName}</td>
                            <td>{person.lastName}</td>
                            <td>{person.documentType}</td>
                            <td>{person.documentNumber}</td>
                            <td>{person.birthDate}</td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    </div>
  )
}

export default ListPersonComponent