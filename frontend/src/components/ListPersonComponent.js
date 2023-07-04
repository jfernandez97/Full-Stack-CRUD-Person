import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PersonService from '../services/PersonService';

const ListPersonComponent = () => {
    const [persons, setPersons] = useState([]);
    const [filterCollapsed, setFilterCollapsed] = useState(true);
    const [filteredPersons, setFilteredPersons] = useState([]);
    const [filterFirstName, setFilterFirstName] = useState('');
    const [filterDocumentType, setFilterDocumentType] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        PersonService.getAllPersons()
            .then((response) => {
                setPersons(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    useEffect(() => {
        const filterPersons = () => {
            let filtered = [...persons];

            if (filterDocumentType !== "") {
                filtered = filtered.filter((person) => person.documentType === filterDocumentType);
            }

            if (filterFirstName !== "") {
                filtered = filtered.filter((person) =>
                    person.firstName.toLowerCase().includes(filterFirstName.toLowerCase())
                );
            }

            setFilteredPersons(filtered.length > 0 ? filtered : persons);
        };
        filterPersons();
    }, [filterFirstName, filterDocumentType, persons]);

    const deletePerson = (id) => {
        PersonService.deletePerson(id)
            .then((response) => {
                setPersons(persons.filter((person) => person.id !== id));
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const resetFilters = () => {
        setFilterFirstName('');
        setFilterDocumentType('');
        setFilteredPersons(persons);
    };
    const toggleFilterCollapse = () => {
        setFilterCollapsed(!filterCollapsed);
    };


    return (
        <div className='container'>
            <div className='d-flex justify-content-between p-4'>
                <h2 className='text-center'>People</h2>
                <Link to='/add-person' className='btn btn-success mb-2'>
                    + Add person
                </Link>
            </div>
            <div className='d-flex justify-content-end'>
                <button
                    className='btn btn-primary mb-2'
                    type='button'
                    onClick={toggleFilterCollapse}
                    style={{ marginRight: '5px' }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-funnel-fill" viewBox="0 0 16 16">
                        <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2z" />
                    </svg>
                    {filterCollapsed ? 'Filter' : 'Hide Filters'}
                </button>
                <button
                    className='btn btn-secondary mb-2'
                    type='button'
                    onClick={resetFilters}
                    style={{ marginLeft: '5px' }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                    </svg>
                    Reset Filters
                </button>
            </div>
            <div className={`collapse${filterCollapsed ? '' : ' show'}`} id='filterCollapse'>
                <div className='card card-body'>
                    <div className='mb-3'>
                        <label className='form-label'>Filter by First Name:</label>
                        <input
                            type="text"
                            placeholder="First Name..."
                            name="searchFirstName"
                            className="form-control"
                            value={filterFirstName}
                            onChange={(e) => setFilterFirstName(e.target.value)}
                        />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Filter by Document Type:</label>
                        <select
                            type='text'
                            className='form-control'
                            name="searchDocumentType"
                            value={filterDocumentType}
                            onChange={(e) => setFilterDocumentType(e.target.value)}
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
                </div>
            </div>
            {persons.length === 0 ? (
                <div className='text-center mt-4'>
                    <h4>The people list is empty...</h4>
                </div>
            ) : (
                <table className='table table-boreded table-striped'>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Lastname</th>
                            <th>Document Type</th>
                            <th>Document Number</th>
                            <th>Birthdate</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPersons.map((person) => (
                            <tr key={person.id}>
                                <td>{person.id}</td>
                                <td>{person.firstName}</td>
                                <td>{person.lastName}</td>
                                <td>{person.documentType}</td>
                                <td>{person.documentNumber}</td>
                                <td>{person.birthDate}</td>
                                <td>
                                    <div className='d-flex justify-content-between'>
                                        <button
                                            type='button'
                                            className='btn btn-primary'
                                            onClick={(e) => navigate(`/update-person/${person.id}`)}
                                        >
                                            <svg
                                                xmlns='http://www.w3.org/2000/svg'
                                                width='16'
                                                height='16'
                                                fill='currentColor'
                                                className='bi bi-pencil-square'
                                                viewBox='0 0 16 16'
                                            >
                                                <path
                                                    d='M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z'
                                                />
                                                <path
                                                    fillRule='evenodd'
                                                    d='M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z'
                                                />
                                            </svg>
                                            {' '}
                                            Edit
                                        </button>
                                        <button
                                            type='button'
                                            className='btn btn-danger ml-2'
                                            onClick={() => deletePerson(person.id)}
                                        >
                                            <svg
                                                xmlns='http://www.w3.org/2000/svg'
                                                width='16'
                                                height='16'
                                                fill='currentColor'
                                                className='bi bi-trash3'
                                                viewBox='0 0 16 16'
                                            >
                                                <path
                                                    d='M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z'
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ListPersonComponent;
