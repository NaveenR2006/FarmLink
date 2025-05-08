'use client';
import React, { useState } from 'react';
import {
    Card,
    Input,
    Button,
    Typography,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";

export function PaymentForm({ amount, onSuccess, onCancel }) {
    const [formData, setFormData] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        name: ''
    });
    const [error, setError] = useState('');
    const [processing, setProcessing] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = () => {
        if (!formData.cardNumber || !formData.expiryDate || !formData.cvv || !formData.name) {
            setError('Please fill in all fields');
            return false;
        }
        if (formData.cardNumber.replace(/\s/g, '').length !== 16) {
            setError('Invalid card number');
            return false;
        }
        if (!/^\d{3}$/.test(formData.cvv)) {
            setError('Invalid CVV');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setProcessing(true);
        setError('');

        try {
            // Simulate payment processing
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // In a real application, you would make an API call to your payment processor here
            // const response = await fetch('your-payment-api-endpoint', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({
            //         amount,
            //         ...formData
            //     })
            // });
            // const data = await response.json();

            onSuccess();
        } catch (err) {
            setError('Payment failed. Please try again.');
        } finally {
            setProcessing(false);
        }
    };

    return (
        <Dialog open={true} handler={onCancel} size="sm">
            <DialogHeader>
                <Typography variant="h5" color="blue-gray">
                    Payment Details
                </Typography>
            </DialogHeader>
            <DialogBody>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <Typography variant="h6" color="blue-gray" className="mb-2">
                            Amount to Pay: ₹{amount}
                        </Typography>
                    </div>
                    <Input
                        type="text"
                        label="Card Number"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        maxLength="16"
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            type="text"
                            label="Expiry Date (MM/YY)"
                            name="expiryDate"
                            value={formData.expiryDate}
                            onChange={handleChange}
                            maxLength="5"
                        />
                        <Input
                            type="password"
                            label="CVV"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleChange}
                            maxLength="3"
                        />
                    </div>
                    <Input
                        type="text"
                        label="Cardholder Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    {error && (
                        <Typography color="red" className="text-center text-sm">
                            {error}
                        </Typography>
                    )}
                </form>
            </DialogBody>
            <DialogFooter className="space-x-2">
                <Button variant="outlined" color="red" onClick={onCancel}>
                    Cancel
                </Button>
                <Button
                    variant="gradient"
                    color="green"
                    onClick={handleSubmit}
                    disabled={processing}
                >
                    {processing ? 'Processing...' : 'Pay Now'}
                </Button>
            </DialogFooter>
        </Dialog>
    );
}