import React, { useEffect } from 'react'
import './form.css'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import TableData from './Table';

const FormMain = () => {

    const [error, setErrors] = useState({});
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        price: '',
        quantity: '',
        city: '',
        state: '',
        zipcode: ''
    })

    const [submitedData, setSubmited] = useState([])

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        })
    }

    const validate = (formData) => {
        const errors = {};

        if (!formData.name) {
            errors.name = 'Name is Required';
        }

        if (!formData.email) {
            errors.email = 'Email is required';
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            errors.email = 'Invalid email address';
        }

        if (isNaN(formData.price) || formData.price <= 0) {
            errors.price = 'Price must be a positive number';
        }

        if (isNaN(formData.quantity) || formData.quantity <= 0) {
            errors.quantity = 'Quantity must be a positive number';
        }

        if (isNaN(formData.zipcode) || formData.zipcode <= 0) {
            errors.zipcode = 'Zipcode must be a positive number';
        }

        if (!/^[a-zA-Z]+$/.test(formData.city) || !formData.city.trim()) {
            errors.city = 'City must be a non-empty string without numbers';
        }

        return errors;
    };

    const handleEdit = (index, payload) => {
        const deleted = submitedData.filter((_, id) => id !== index)
        setSubmited(deleted)
        setFormData({
            name: payload.name,
            email: payload.email,
            price: payload.price,
            quantity: payload.quantity,
            city: payload.city,
            state: payload.state,
            zipcode: payload.zipcode,
        });
    };

    const handleDelete = (index) => {
        const deleted = submitedData.filter((_, id) => id !== index)
        setSubmited(deleted)
    };

    const handleSubmit = (e) => {
        e.preventDefault()

        const error = validate(formData)
        if (Object.keys(error).length == 0) {
            setSubmited([...submitedData, formData]);
            setFormData({
                name: '',
                email: '',
                price: '',
                quantity: '',
                city: '',
                state: '',
                zipcode: '',
            });
        } else {
            setErrors(error)
        }
    };

    useEffect(() => {
        let string = JSON.stringify(submitedData)
            localStorage.setItem('data', string);
    }, [submitedData])

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
                                        {error.name && (<div>{error.name}</div>)}
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
                                        {error.city && (<div className='text-danger'>{error.city}</div>)}
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
                                            type="text"
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

            <TableData data={submitedData} onDelete={handleDelete} onEdit={handleEdit} onSubmit={handleSubmit} />
        </div>

    )
}

export default FormMain