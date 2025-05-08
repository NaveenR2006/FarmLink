'use client'
import React from 'react'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CardDefault } from '@/components/CardDefault';
import { PaymentForm } from '@/components/PaymentForm';
import { Button } from '@material-tailwind/react';

const Page = () => {
    const router = useRouter();
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [showPayment, setShowPayment] = useState(false);
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        fetch('https://x8ki-letl-twmt.n7.xano.io/api:eaXUv0bD/products')
            .then((res) => res.json())
            .then((data) => {
                setProducts(data);
            });
    }, []);

    const addToCart = (product) => {
        setCart(prev => {
            const existingItem = prev.find(item => item.id === product.id);
            if (existingItem) {
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
        setTotalAmount(prev => prev + parseFloat(product.Price));
    };

    const handlePaymentSuccess = () => {
        setShowPayment(false);
        setCart([]);
        setTotalAmount(0);
        alert('Payment successful! Thank you for your purchase.');
    };

    const handlePaymentCancel = () => {
        setShowPayment(false);
    };

    return (
        <>
            <div className='flex justify-between items-center m-4 p-2'>
                <h1 className='text-2xl font-bold'>Available Products</h1>
                <div className='flex items-center gap-4'>
                    <span className='text-lg'>Cart Total: ₹{totalAmount.toFixed(2)}</span>
                    <Button
                        color='green'
                        disabled={cart.length === 0}
                        onClick={() => setShowPayment(true)}
                    >
                        Checkout ({cart.length} items)
                    </Button>
                </div>
            </div>
            <div className='grid lg:grid-cols-3 gap-10 p-10 ml-10'>
                {products?.map((product) => {
                    const inCart = cart.find(item => item.id === product.id);
                    return (
                        <div key={product?.id} className='flex flex-col'>
                            <CardDefault
                                id={product?.id}
                                path={product?.Product_Image?.url}
                                name={product?.Name}
                                price={product?.Price}
                                stock={product?.Stock}
                                desc={product?.Description}
                                onAddToCart={() => addToCart(product)}
                                inCart={inCart}
                            />
                        </div>
                    );
                })}
            </div>
            {showPayment && (
                <PaymentForm
                    amount={totalAmount}
                    onSuccess={handlePaymentSuccess}
                    onCancel={handlePaymentCancel}
                />
            )}
        </>
    );
};

export default Page;