import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router';
import { login } from '../api/auth';

export default function Login() {
    const initialValues = { email: "", password: "" }

    const [formValues, setFormValues] = useState(initialValues)
    const [formErrors, setFormErrors] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues))
        // console.log(formValues.email)
        // await login(formValues.email)
        await login(formValues.email, formValues.password)
        setIsSubmit(true)
        setFormValues(initialValues)
        navigate('/')
    }

    const changeHandler = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value })
    };

    const validate = (values) => {
        const errors = {}
        const emailRegex = new RegExp('^[A-Za-z0-9]{1,64}@(.+)$')

        if (!values.email) {
            errors.email = "Email is a Required Field"
        } else if (!emailRegex.test(values.email)) {
            errors.email = "Invalid Email Address"
        }
        if (!values.password) {
            errors.password = "Password is a Required Field"
        }
        return errors
    }

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log("Successful Login")
        } else {
            console.log(formErrors)
        }
    }, [formErrors, isSubmit]);

    return (
        <div class="flex items-center justify-center min-h-screen bg-gray-100">
            <div class="px-8 py-6 mt-4 text-left bg-white shadow-lg">
                <h3 class="text-2xl text-[#2F313D] font-bold text-center">Login</h3>
                <form onSubmit={handleSubmit}>
                    <div class="mt-4">
                        <div>
                            <label class="block text-[#2F313D]" for="email">Email</label>
                            <input onChange={changeHandler} type="text" placeholder="Email" name="email" value={formValues.email}
                                class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
                            <p data-cy="email-error" class="text-red-500 text-xs italic">{formErrors.email}</p>
                        </div>
                        <div class="mt-4">
                            <label class="block text-[#2F313D]">Password</label>
                            <input onChange={changeHandler} type="password" placeholder="Password" name="password" value={formValues.password}
                                class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
                            <p data-cy="password-error" class="text-red-500 text-xs italic">{formErrors.password}</p>
                        </div>
                        <div class="flex items-baseline justify-between">
                            <button data-cy="login-button" type='submit' class="px-6 py-2 mt-4 text-white bg-[#00D05A] rounded-lg hover:bg-blue-900">Login</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}