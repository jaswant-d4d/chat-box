
import React, { useState } from "react";
import { Box, Container, Grid, TextField, Button, IconButton, InputAdornment } from "@mui/material";
import { useFormik } from "formik";
import { loginValidation } from "../../helpers/validations";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux-store/store";
import { login } from "../../redux-store/actions/auth";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const navigateToNext = () => {
        navigate("/")
    }

    const formik = useFormik({
        initialValues: {
            role_id: 2,
            email: '',
            password: '',
        },
        validate: loginValidation,
        onSubmit: SubmitHandler,
    });

    async function SubmitHandler(values: any) {
        const response = await dispatch(login(values))
        if (response.payload) {
            navigateToNext();
        }
    }


    return (
        <Container maxWidth="sm">
            <div className="page-title">
                <h1>Login</h1>
            </div>
            <div className="auth-form">
                <form onSubmit={formik.handleSubmit}>
                    <Box sx={{ marginTop: '6rem', marginBottom: '2rem' }}>
                        <Grid container spacing={2} xs={12}>
                            <Box sx={{ marginBottom: "1rem", width: '100%', }} >
                                <TextField id="outlined-basic" label="Email" variant="outlined" name="email" value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} fullWidth error={formik.touched.email && formik.errors.email ? true : false} />
                            </Box>
                            <Box sx={{ width: '100%' }}>
                                <TextField id="outlined-basic" type="password" label="Password" variant="outlined" name="password" value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} fullWidth error={formik.touched.password && formik.errors.password ? true : false} >
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            edge="end"
                                        >
                                            {showPassword ? (<VisibilityOff />) : (<Visibility />)}
                                        </IconButton>
                                    </InputAdornment>
                                </TextField>
                            </Box>
                        </Grid>
                    </Box>
                    <Button variant="contained" type="submit">Login</Button>
                </form>
                <p>Don't have any account? <Link to={"/signup"}>register here</Link></p>
            </div>
        </Container >
    )
}

export default Login
