import { Card, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";

const TABLE_HEAD = ["Item No", "Item Name", "Unit Price", "Quantity", "Subtotal", "Actions"];

export function DefaultTable() {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        // Load cart from localStorage
        const cartData = JSON.parse(localStorage.getItem('cart') || '[]');
        setCart(cartData);
    }, []);

    // Handler to delete an item from cart
    const handleDelete = (id) => {
        const newCart = cart.filter(item => item.id !== id);
        setCart(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));
    };

    // Handler to edit quantity
    const handleEdit = (id) => {
        const newQty = prompt("Enter new quantity:", "1");
        const qty = parseInt(newQty, 10);
        if (!isNaN(qty) && qty > 0) {
            const newCart = cart.map(item =>
                item.id === id ? { ...item, quantity: qty } : item
            );
            setCart(newCart);
            localStorage.setItem('cart', JSON.stringify(newCart));
        }
    };

    return (
        <Card className="h-full w-full pt-40 px-10 rounded-xl ">
            <table className="w-full min-w-max table-auto text-left">
                <thead>
                    <tr>
                        {TABLE_HEAD.map((head) => (
                            <th
                                key={head}
                                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                            >
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal leading-none opacity-70"
                                >
                                    {head}
                                </Typography>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {cart.length === 0 ? (
                        <tr>
                            <td colSpan={TABLE_HEAD.length} className="text-center p-4">Cart is empty.</td>
                        </tr>
                    ) : (
                        cart.map((item, index) => {
                            const subtotal = item.price * item.quantity;
                            const isLast = index === cart.length - 1;
                            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
                            return (
                                <tr key={item.id}>
                                    <td className={classes}>{index + 1}</td>
                                    <td className={classes}>{item.name}</td>
                                    <td className={classes}>{item.price}</td>
                                    <td className={classes}>{item.quantity}</td>
                                    <td className={classes}>{subtotal}</td>
                                    <td className={classes}>
                                        <button className="text-blue-600 font-bold mr-2" onClick={() => handleEdit(item.id)}>Edit</button>
                                        <button className="text-red-600 font-bold" onClick={() => handleDelete(item.id)}>Delete</button>
                                    </td>
                                </tr>
                            );
                        })
                    )}
                </tbody>
            </table>
        </Card>
    );
}