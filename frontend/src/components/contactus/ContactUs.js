import React, { useState } from 'react';
import './contactus.css'; 

const ContactUs = () => {
    const init = {
        name: '',
        email: '',
        message: ''
    };

    const [formData, setFormData] = useState(init);

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.target.reset();
        setFormData(init);
        alert("Query submitted")
        // Sending formData as JSON
        // try {
        //     const response = await fetch('/api/contact', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify(formData)
        //     });

        //     if (response.ok) {
        //         console.log('Form submitted successfully');
        //         // Handle success (e.g., clear form, show success message)
        //         setFormData({ name: '', email: '', message: '' });
        //     } else {
        //         console.log('Error submitting form');
        //         // Handle error (e.g., show error message)
        //     }
        // } catch (error) {
        //     console.error('Error:', error);
        //     // Handle network error
        // }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div className='contact-us'>
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className='col-lg-6'>
                        <h2 className='text-center mb-5'>Contact Us</h2>
                        <form onSubmit={handleSubmit}>
                            <div className='form-group mb-3'>
                                <label htmlFor='name'>Name</label>
                                <input 
                                    type='text' 
                                    className='form-control' 
                                    onChange={handleInputChange} 
                                    id='name' 
                                    name='name' 
                                    value={formData.name} 
                                    placeholder='Enter your name' 
                                    required 
                                />
                            </div>

                            <div className='form-group mb-3'>
                                <label htmlFor='email'>Email address</label>
                                <input 
                                    type='email' 
                                    className='form-control' 
                                    onChange={handleInputChange} 
                                    id='email' 
                                    name='email' 
                                    value={formData.email} 
                                    placeholder='Enter your email' 
                                    required 
                                />
                            </div>

                            <div className='form-group mb-3'>
                                <label htmlFor='message'>Message</label>
                                <textarea 
                                    className='form-control' 
                                    id='message' 
                                    onChange={handleInputChange} 
                                    rows='4' 
                                    name='message' 
                                    value={formData.message} 
                                    placeholder='Enter your message' 
                                    required
                                ></textarea>
                            </div>

                            <button type='submit' className='btn btn-dark'>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactUs;
