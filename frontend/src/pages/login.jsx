import { TextField, Button, Box, Typography, CircularProgress, Alert } from "@mui/material";
import { Link,useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode"; 
import { getUserFromToken } from "../utils/auth";
const LoginPage = () => {
     const user=getUserFromToken()
    const navigate=useNavigate()

   useEffect(() => {
    if (user) {
        if (user.role === "admin") {
            navigate("/admin/dashboard");
        } else {
            navigate("/user/products");
        }
    }
}, [user, navigate]);
    

    const {
        register,
        handleSubmit,
        setError,
        watch,
        clearErrors,
        formState: { errors, isSubmitting },
    } = useForm()

    // handle submit
    const onSubmiting = async (data) => {
        try {
            const res = await fetch("http://127.0.0.1:3000/api/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            })
            const newdata = await res.json()
            if (!res.ok) {
                setError("MyError", {
                    type: "manual",
                    message: newdata.message
                })
                return;
            }
            console.log("Success", newdata)
            localStorage.setItem("CommerceToken", newdata.token)
            if(newdata.user.role==="admin")
                navigate("/admin/dashboard")
            else
                navigate("/user/products")

        } catch (error) {
            console.log("Network Error", error)
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmiting)}>
            <Box
                sx={{
                    width: 350,
                    margin: "160px auto",
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    padding: 3,
                    boxShadow: 3,
                    borderRadius: 2,
                }}
            >
                <Typography variant="h5" textAlign="center">
                    Login
                </Typography>

                <TextField
                    label="Email"
                    type="email"
                    fullWidth
                    {...register("email", {
                        required: "Email is required",
                        onChange: () => clearErrors("MyError"),
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
                        required: "Password is required", minLength: { value: 6, message: "Password must be of 6 characters" }, maxLength: { value: 15, message: "Password cannot be more than 15 characters" },
                        onChange: () => clearErrors("MyError"),
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

                <Button type="submit" variant="contained" disabled={isSubmitting} >
                    {isSubmitting ? (<CircularProgress size={24} color="inherit" />) : ("Login")}
                </Button>

                <Typography textAlign="center">
                    Don't have an account?{" "}
                    <Link to="/">Register</Link>
                </Typography>
            </Box>
        </form>
    );
};

export default LoginPage;
