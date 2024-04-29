import * as Yup from "yup";

export const loginSchema = Yup.object({
    email: Yup.string().email().required("All fields are required*"),
    password: Yup.string().min(8).max(20).required("All fields are required*"),
});

export const signupSchema = Yup.object({
    firstName: Yup.string().nonNullable().required("All fields are required*"),
    lastName: Yup.string().nonNullable().required("All fields are required*"),
    email: Yup.string().email().required("All fields are required*"),
    password: Yup.string().min(8).max(20).required("All fields are required*"),
});