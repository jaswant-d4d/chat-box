
import React from "react";
import { Box, Container, Grid, TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import { signupValidate } from "../../helpers/validations";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../../redux-store/actions/auth";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux-store/store";

const Signup: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const navigateToNext = () => {
        navigate("/login")
    }

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            username: "",
            dob: ""
        },
        validate: signupValidate,
        onSubmit: SubmitHandler,
    });

    async function SubmitHandler(values: any) {
        const response = await dispatch(signup(values))
        if (!response?.payload?.error && response?.payload?.data) {
            navigateToNext();
        }
    }

    return (
        <Container maxWidth="sm">
            <div className="page-title">
                <h1>Signup</h1>
            </div>
            <div className="auth-form">
                <form onSubmit={formik.handleSubmit}>
                    <Box sx={{ marginTop: '6rem', marginBottom: '2rem' }}>
                        <Grid container spacing={2} xs={12}>
                            <Box sx={{ marginBottom: "1rem", width: '100%', }} >
                                <TextField id="outlined-basic" label="Name" variant="outlined" fullWidth name="name" value={formik.values.name} onBlur={formik.handleBlur} onChange={formik.handleChange} error={formik.touched.name && formik.errors.name ? true : false} />
                            </Box>
                            <Box sx={{ marginBottom: "1rem", width: '100%', }} >
                                <TextField id="outlined-basic" label="Email" variant="outlined" name="email" value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} fullWidth error={formik.touched.email && formik.errors.email ? true : false} />
                            </Box>
                            <Box sx={{ marginBottom: "1rem", width: '100%', }} >
                                <TextField id="outlined-basic" label="Username" variant="outlined" name="username" value={formik.values.username} onBlur={formik.handleBlur} onChange={formik.handleChange} fullWidth error={formik.touched.username && formik.errors.username ? true : false} />
                            </Box>
                            <Box sx={{ width: '100%', marginBottom: "1rem", }}>
                                <TextField id="outlined-basic" label="Password" variant="outlined" name="password" value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} fullWidth error={formik.touched.password && formik.errors.password ? true : false} />
                            </Box>
                            <Box sx={{ width: '100%' }} >
                                <TextField id="outlined-basic" type="date" label="Date of birth" variant="outlined" name="dob" value={formik.values.dob} onBlur={formik.handleBlur} onChange={formik.handleChange} fullWidth error={formik.touched.dob && formik.errors.dob ? true : false}/>
                            </Box>
                        </Grid>
                    </Box>
                    <Button variant="contained" type="submit">Signup</Button>
                </form>
                <p>Don't have any account? <Link to={"/login"}>Login here</Link></p>

            </div>
        </Container>
    )
}

export default Signup
