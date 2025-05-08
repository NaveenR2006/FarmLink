import {
    Card,
    Input,
    Button,
    Typography,
} from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export function SimpleRegistrationForm({ name, path }) {
    const router = useRouter();
    const [formData, setFormData] = useState({
        phoneNumber: "",
        password: "",
    });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.phoneNumber || !formData.password) {
            setError("Please fill in all fields");
            return;
        }

        try {
            // Here you would typically make an API call to validate credentials
            // For now, we'll just redirect to the dashboard
            router.push(path);
        } catch (error) {
            setError("Invalid credentials. Please try again.");
        }
    };

    return (
        <Card color="transparent" shadow={false} className="pr-40">
            <Typography variant="h4" color="white" className="text-5xl">
                {name}
            </Typography>
            <Typography variant="h4" color="white" className="text-5xl">
                Sign In
            </Typography>
            <Typography color="white" className="mt-1 font-normal">
                Nice to meet you again! Enter your details.
            </Typography>
            <form onSubmit={handleSubmit} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                <div className="mb-1 flex flex-col gap-6">
                    <Input
                        size="lg"
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        placeholder="Enter Phone Number"
                        className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                            className: "before:content-none after:content-none",
                        }}
                    />

                    <Input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        size="lg"
                        placeholder="Enter your password"
                        className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                            className: "before:content-none after:content-none",
                        }}
                    />
                </div>

                {error && (
                    <Typography color="red" className="mt-2 text-center text-sm">
                        {error}
                    </Typography>
                )}

                <Button type="submit" className="mt-6 capitalize" fullWidth>
                    Sign In
                </Button>
                <Button
                    type="button"
                    color="green"
                    className="mt-2 mb-2 capitalize"
                    fullWidth
                    onClick={() => {
                        // Dummy login for Farmer or Retailer
                        if (name === 'Farmer') {
                            router.push('/Farmer/Products');
                        } else if (name === 'Retailer') {
                            router.push('/Retailer/Products');
                        }
                    }}
                >
                    Dummy Login as {name}
                </Button>
                <Typography color="white" className="mt-4 text-center font-normal">
                    Don{"'"}t have an account?{" "}
                    <Link 
                        href={`/${name}Registration`} 
                        className="text-black font-bold hover:underline"
                    >
                        Sign Up
                    </Link>
                </Typography>
            </form>
        </Card>
    );
}