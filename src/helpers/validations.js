const requiredMsg = "This field is required";
const selectOptionMsg = "Please select one option";
const numberAllowMsg = "Only numbers are allowed";

export const strongPasswordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/;

export const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;

export const numberRegex = /^\d*\.?\d+$/;


export const signupValidate = values => {
    const errors = {};
    if (!values.name?.trim()) {
        errors.name = 'Name field is required';
    }
    if (!values.username?.trim()) {
        errors.username = 'Username field is required';
    }
    if (!values.email?.trim()) {
        errors.email = 'Email Address field is required';
    } else if (!emailRegex.test(values?.email)) {
        errors.email = 'Invalid email address';
    }
    
    if (!values.password?.trim()) {
        errors.password = 'Password field is required';
    } else if (values.password.length < 6) {
        errors.password = 'Password must be at least 6 characters';
    } else if (!strongPasswordRegex?.test(values.password)) {
        errors.password = 'Password must include an uppercase letter, a lowercase letter, a number, and a special character';
    }
    
    return errors;
};

export const loginValidation = values => {
    const errors = {};

    if (!values.email?.trim()) {
        errors.email = 'Email Address field is required';
    } else if (!emailRegex.test(values?.email)) {
        errors.email = 'Invalid email address';
    }

    if (!values.password?.trim()) {
        errors.password = 'Password field is required';
    }

    return errors;
};