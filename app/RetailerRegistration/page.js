'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import { Input, Button, Select, Option } from "@material-tailwind/react";
import { useRouter } from 'next/navigation';

const Page = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        Name: '',
        Phone_Number: '',
        Password: '',
        GST_Number: '',
        Address: '',
        State: '',
        District: '',
        Pincode: '',
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const indianStates = [
        "Andhra Pradesh", "Karnataka", "Kerala", "Tamil Nadu", "Telangana",
        // Add more states as needed
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSelectChange = (value) => {
        setFormData(prev => ({
            ...prev,
            State: value
        }));
    };



    const validateForm = () => {
        if (!formData.Name || !formData.Phone_Number || !formData.Address || !formData.State || !formData.District || !formData.Pincode) {
            setError('Please fill in all fields');
            return false;
        }
        if (formData.Phone_Number.length !== 10) {
            setError('Phone number must be 10 digits');
            return false;
        }
        if (formData.Password.length < 6) {
            setError('Password must be at least 6 characters');
            return false;
        }
        if (formData.Pincode.length !== 6) {
            setError('Pincode must be 6 digits');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);
        setError('');

        try {
            // Prepare the data in the format expected by the API
            const apiData = {
                ...formData,
                path: '/retailer'
            };

            console.log('Sending data to API:', {
                ...apiData,
                Shop_Agreement: {
                    ...apiData.Shop_Agreement,
                    base64: 'BASE64_STRING' // Log truncated for brevity
                }
            });

            const response = await fetch('https://x8ki-letl-twmt.n7.xano.io/api:eaXUv0bD/retailer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(apiData),
            });

            const data = await response.json();
            console.log('API Response:', data);

            if (response.ok) {
                setSuccessMessage('Registration successful! Redirecting to products page...');
                // Store user data in localStorage
                localStorage.setItem('retailerData', JSON.stringify({
                    name: formData.Name,
                    phoneNumber: formData.Phone_Number,
                    type: 'retailer'
                }));
                // Redirect to shopping page after 1.5 seconds
                setTimeout(() => {
                    router.push('/Retailer/Products');
                }, 1500);
            } else {
                throw new Error(data.message || 'Registration failed. Please try again.');
            }
        } catch (err) {
            console.error('Registration error:', err);
            setError(err.message || 'An error occurred. Please try again.');
            setSuccessMessage('');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='min-h-screen relative bg-gray-900'>
            <div className='absolute inset-0 bg-fixed bg-cover opacity-30'>
                <Image
                    src='/sign_up_background.jpg'
                    alt='Background'
                    fill
                    style={{ objectFit: 'cover' }}
                    priority
                />
            </div>
            <div className='relative z-10 container mx-auto px-4 py-12'>
                <div className='text-white text-center mb-12'>
                    <h1 className='text-5xl font-bold mb-4'>Retailer Registration</h1>
                    <p className='text-lg text-gray-300'>Join our network of retailers and access fresh produce directly from farmers</p>
                </div>

                <form onSubmit={handleSubmit} className='max-w-4xl mx-auto bg-white/10 backdrop-blur-md p-8 rounded-lg shadow-xl'>
                    <div className='grid md:grid-cols-2 gap-6'>
                        <div className='space-y-4'>
                            <Input
                                size="lg"
                                variant="outlined"
                                label="Name"
                                name="Name"
                                value={formData.Name}
                                onChange={handleChange}
                                className='text-white'
                                color='white'
                            />
                            <Input
                                size="lg"
                                variant="outlined"
                                label="Phone Number"
                                name="Phone_Number"
                                type="tel"
                                value={formData.Phone_Number}
                                onChange={handleChange}
                                className='text-white'
                                color='white'
                            />
                            <Input
                                size="lg"
                                variant="outlined"
                                label="Password"
                                name="Password"
                                type="password"
                                value={formData.Password}
                                onChange={handleChange}
                                className='text-white'
                                color='white'
                            />
                            <Input
                                size="lg"
                                variant="outlined"
                                label="GST Number"
                                name="GST_Number"
                                value={formData.GST_Number}
                                onChange={handleChange}
                                className='text-white'
                                color='white'
                            />
                        </div>

                        <div className='space-y-4'>
                            <Input
                                size="lg"
                                variant="outlined"
                                label="Address"
                                name="Address"
                                value={formData.Address}
                                onChange={handleChange}
                                className='text-white'
                                color='white'
                            />
                            <Select
                                size="lg"
                                variant="outlined"
                                label="State"
                                value={formData.State}
                                onChange={(value) => handleChange({ target: { name: 'State', value } })}
                                className='text-white'
                                color='white'
                            >
                                {indianStates.map((state) => (
                                    <Option key={state} value={state}>
                                        {state}
                                    </Option>
                                ))}
                            </Select>
                            <Input
                                size="lg"
                                variant="outlined"
                                label="District"
                                name="District"
                                value={formData.District}
                                onChange={handleChange}
                                className='text-white'
                                color='white'
                            />
                            <Input
                                size="lg"
                                variant="outlined"
                                label="Pincode"
                                name="Pincode"
                                type="number"
                                value={formData.Pincode}
                                onChange={handleChange}
                                className='text-white'
                                color='white'
                            />
                        </div>
                    </div>



                    {error && (
                        <div className='mt-4 p-3 bg-red-500/10 border border-red-500 rounded text-red-500 text-center'>
                            {error}
                        </div>
                    )}

                    {successMessage && (
                        <div className='mt-4 p-3 bg-green-500/10 border border-green-500 rounded text-green-500 text-center'>
                            {successMessage}
                        </div>
                    )}

                    <div className='mt-8 flex justify-center'>
                        <Button
                            size="lg"
                            type="submit"
                            className='bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg transition-colors'
                            disabled={isLoading}
                        >
                            {isLoading ? 'Registering...' : 'Register'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Page;