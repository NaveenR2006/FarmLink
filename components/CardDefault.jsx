'use client'
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";
import { useState } from 'react';

export function CardDefault(props) {
    // Check if we're in farmer view based on the URL
    const isFarmerView = typeof window !== 'undefined' && window.location.pathname.includes('/Farmer/');
    const handleDelete = async () => {
        try {
            const response = await fetch(`https://x8ki-letl-twmt.n7.xano.io/api:eaXUv0bD/products/${props.id}`, {
                method: 'DELETE', // Use the DELETE method to delete the item
            });

            if (response.ok) {
                // Item successfully deleted
                console.log(`Item with ID ${props.id} deleted`);
            } else {
                // Handle errors or display a message if needed
                console.error(`Failed to delete item with ID ${props.id}`);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    // Add to Cart handler
    const [quantity, setQuantity] = useState(1);
    const handleAddToCart = () => {
        const qty = Math.max(1, Math.min(quantity, props.stock || 1));
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const existing = cart.find(item => item.id === props.id);
        if (existing) {
            existing.quantity += qty;
        } else {
            cart.push({
                id: props.id,
                name: props.name,
                price: props.price,
                stock: props.stock,
                desc: props.desc,
                path: props.path,
                quantity: qty
            });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Added to cart!');
    }

    return (
        <>
            <Card className="mt-6 w-96">
                <CardHeader color="blue-gray" className="relative h-56">
                    <img
                        src={props.path}
                        alt="card-image"
                        className="absolute w-full h-full rounded-xl object-cover"
                    />
                </CardHeader>
                <CardBody>
                    <div className="flex justify-between">
                        <Typography variant="h5" color="blue-gray" className="mb-2">
                            {props.name}
                        </Typography>
                        <Typography variant="h5" color="blue-gray" className="mb-2">
                            Price: {props.price}/Kg
                        </Typography>
                    </div>

                    <Typography className="font-bold">
                        Stocks:{props.stock}
                    </Typography>

                    <Typography>
                        {props.desc}
                    </Typography>
                </CardBody>
                <CardFooter className="pt-0 flex flex-col gap-2">
                    {!isFarmerView ? (
                        // Retailer view - show buy options
                        <>
                            <div className="flex items-center gap-2 mb-2">
                                <label htmlFor="quantity" className="font-bold">Qty:</label>
                                <input
                                    id="quantity"
                                    type="number"
                                    min="1"
                                    max={props.stock || 1}
                                    value={quantity}
                                    onChange={e => setQuantity(Number(e.target.value))}
                                    className="border rounded px-2 py-1 w-20"
                                />
                            </div>
                            <div className="flex gap-2 w-full">
                                <Button color="green" onClick={handleAddToCart} className="flex-1">Buy</Button>
                                <Button color="blue" onClick={props.onAddToCart} className="flex-1">
                                    {props.inCart ? `Add More (${props.inCart.quantity})` : 'Add to Cart'}
                                </Button>
                            </div>
                        </>
                    ) : (
                        // Farmer view - show manage product options
                        <div className="flex gap-2">
                            <Button color="yellow">Edit</Button>
                            <Button color="red" onClick={handleDelete}>Delete</Button>
                        </div>
                    )}
                </CardFooter>
            </Card>
        </>
    );
}