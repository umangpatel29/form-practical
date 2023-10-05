import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import TableData from './Table';

const FormMain = () => {

    const [error, setErrors] = useState();
    const [formData, setFormData] = useState({
        name: 'umang',
        email: 'hello@g',
        price: '23',
        quantity: '3',
        city: 'amer',
        state:'gujarat',
        zipcode: '234'
    })
    const [submitedData, setSubmited] = useState([])

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()

        if (validate()) {
            setSubmited([...submitedData, formData]);
            
        }
        localStorage.setItem('data', JSON.stringify(submitedData))
    };
    console.log(error)

    const validate = () => {
        let error = {};
      
        if (formData.name === '') {
          error.name = 'Name cannot be empty';
        }
        if (formData.email === '') {
          error.email = 'Email cannot be empty';
        }
        if (/^[a-zA-Z]*$/.test(formData.city)) {
            error.city = 'City cannot contain numbers';
          }
          
      
        setErrors(error); 
      
        return Object.keys(error).length === 0;
    };
    
    const handleDelete = (index) => {

    }
    const handleEdit = (index, item) => {
        // const editdata = [...formData]

    }

    return (

        <div className="container">
            <div className="row">
                <div className="col d-flex justify-content-center">
                    <div className='form-box px-4'>
                        <h3 className='text-center'>Product Form</h3>
                        <Form onSubmit={handleSubmit}>
                            <div className="row my-3">
                                <div className="col">
                                    <Form.Group>
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control
                                            className='form-control'
                                            required
                                            type="text"
                                            placeholder="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                        />
                                        
                                    </Form.Group>
                                </div>
                            </div>
                            <div className="row my-3">
                                <div className="col">
                                    <Form.Group >
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            className='form-control'
                                            required
                                            type="email"
                                            placeholder="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </div>
                            </div>
                            <div className="row my-3">
                                <div className="col-md-8">
                                    <Form.Group>
                                        <Form.Label>Price</Form.Label>
                                        <Form.Control
                                            className='form-control'
                                            required
                                            type="number"
                                            placeholder="price"
                                            name="price"
                                            value={formData.price}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </div>
                                <div className="col-md-4">
                                    <Form.Group>
                                        <Form.Label>Quantity</Form.Label>
                                        <Form.Control
                                            className='form-control'
                                            required
                                            type="number"
                                            name="quantity"
                                            value={formData.quantity}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </div>
                            </div>
                            <div className="row my-3">
                                <div className="col-md-4">
                                    <Form.Group>
                                        <Form.Label>City</Form.Label>
                                        <Form.Control
                                            className='form-control'
                                            required
                                            type="text"
                                            placeholder="city"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleChange}
                                        />
                                        {/* {
                                            error.city && (<div className='text-danger'>{error.city}</div>)
                                        } */}
                                    </Form.Group>
                                </div>
                                <div className="col-md-4">
                                    <Form.Label>State</Form.Label>
                                    <Form.Select size="md" value={formData.state} onChange={handleChange} name='state' className='form-control'>
                                        <option>Select State</option>
                                        <option>Delhi</option>
                                        <option>Mumbai</option>
                                        <option>Hydrabad</option>
                                    </Form.Select>
                                </div>
                                <div className="col-md-4">
                                    <Form.Group>
                                        <Form.Label>Zipcode</Form.Label>
                                        <Form.Control
                                            className='form-control'
                                            required
                                            type="number"
                                            placeholder="zipcode"
                                            name='zipcode'
                                            value={formData.zipcode}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </div>
                            </div>

                            <Button type="submit" className='btn my-3' >Submit form</Button>
                        </Form>

                    </div>
                </div>
            </div>

            <TableData data={submitedData} onDelete={handleDelete} onEdit={handleEdit} />
        </div>

    )
}

export default FormMain