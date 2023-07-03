import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
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
        <div className='d-flex justify-content-between p-4'>
            <h2 className='text-center'> People </h2>
            <Link to = "/add-person" className = "btn btn-success mb-2"> + Add person </Link>
        </div>
        <table className='table table-boreded table-striped'>
            <thead>
                <th>Id</th>
                <th>Name</th>
                <th>Lastname</th>
                <th>Document Type</th>
                <th>Document Number</th>
                <th>Birthdate</th>
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