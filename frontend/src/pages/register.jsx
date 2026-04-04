import { TextField, Button, Box, Typography, Alert, CircularProgress } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
// import LoginPage from "./login";

const RegisterPage = () => {
    const {
        register,
        handleSubmit,
        setError,
        watch,
        clearErrors,
        formState: { errors, isSubmitting },
    } = useForm()

    const navigate = useNavigate()
    // handle submit
    const onSubmit = async (credentials) => {
        try {
            console.log("hii")
            const data = await fetch("http://127.0.0.1:3000/api/users/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(credentials),
            })
            const newdata = await data.json()
            if (!data.ok) {
                setError("MyError", {
                    type: "manual",
                    message: newdata.message
                })
                return;
            }

            //   data.ok kya check karta hai?
            //   true → status 200–299
            // false → error (400, 500 etc.)

            console.log("Success", newdata.message)
            navigate("/login")
        } catch (error) {
            console.log("Netword Error", error)
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box
                sx={{
                    width: 350,
                    margin: "80px auto",
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    padding: 3,
                    boxShadow: 3,
                    borderRadius: 2,
                }}
            >
                <Typography variant="h5" textAlign="center">
                    Register
                </Typography>

                <TextField
                    label="Full Name"
                    fullWidth
                    {...register("name", { required: "Name is required" })}
                    error={!!errors.name} // errors.name is undefined means false,!false=true then !true=false so !!undefined=false, if errors.name consists a object then errors.name=true, !errors.name=false, !!errors.name=true
                    helperText={errors.name?.message}
                />

                {/* error- controls ui style, if true then border becomes red, red label */}
                {/* helperText- displays the message */}


                <TextField
                    label="Phone Number"
                    fullWidth
                    {...register("phoneNumber", {
                        required: "Phone Number is reuired",
                        onChange: () => clearErrors("MyError"),
                        pattern: {
                            value: /^[0-9]{10}$/,
                            message: "Enter a valid 10-digit phone number"
                        }
                    })}
                    error={!!errors.phoneNumber}
                    helperText={errors.phoneNumber?.message}
                />

                <TextField
                    label="Email"
                    type="email"

                    fullWidth
                    {...register("email", {
                        required: "Email is required",
                        onChange: () => clearErrors("MyError"), // 👈 add this
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Enter a valid email address"
                        }
                    })}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                />

                <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    {...register("password", {
                        required: "Password is required", minLength: { value: 6, message: "Password should be of minimum 6 characters" }, maxLength: { value: 15, message: "Password should be of maximum 15 characters" },
                        pattern: {
                            value: /^(?=.*[A-Za-z])(?=.*\d).{6,}$/,
                            message: "Password must be at least 6 characters and include letters and numbers"
                        }
                    })}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                />

                {errors.MyError && (
                    <Alert severity="error" sx={{ mt: 1 }}>
                        {errors.MyError.message}
                    </Alert>
                )}
                <Button type="submit" variant="contained" disabled={isSubmitting}>
                    {isSubmitting ? (<CircularProgress size={24} color="inherit" />) : ("Register")}
                </Button>

                <Typography textAlign="center">
                    Already have an account?{" "}
                    <Link to="/login">Login</Link>
                </Typography>
            </Box>
        </form>
    );
};

export default RegisterPage;
