import React, { useState } from 'react'
import authService from '../appwrite/auth'
import { login } from '../store/authSlice'
import { Input, Logo, Button } from './index'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

function Signup() {

    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();


    const signUp = async (data) => {
        setError("");

        try {
            const account = await authService.createAccount(data);

            if (account) {
                const userData = await authService.getCurrentUser();

                if (userData) {
                    const clearUser = {
                        $id: userData.$id,
                        status: userData.status,
                        email: userData.email,
                        name: userData.name,
                    }
                    dispatch(login(clearUser))
                }

                navigate("/");
            }

        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <div className="flex items-center justify-center w-full px-4">
            <div className='mx-auto w-full max-w-md bg-white rounded-xl p-8 border border-slate-200 shadow-sm'>
                <div className="mb-4 flex justify-center">
                    <span className="inline-block w-full max-w-20">
                        <Logo width="100%" />
                    </span>
                </div>

                <h2 className="text-center text-xl font-semibold text-slate-900">
                    Sign up to create account
                </h2>
                <p className="mt-2 text-center text-sm text-slate-500">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-slate-900 hover:underline underline-offset-2"
                    >
                        Sign In
                    </Link>
                </p>

                {error && (
                    <p className="text-red-600 text-sm bg-red-50 border border-red-100 rounded-md px-3 py-2 mt-6 text-center">
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit(signUp)} className='mt-6'>
                    <div className='space-y-4'>
                        <Input
                            label='Full Name'
                            placeholder='Enter your full name'
                            {...register('name', {
                                required: true
                            })}
                        />

                        <Input
                            label='Email'
                            placeholder='Enter your email'
                            {...register('email', {
                                required: true,
                                validate: {
                                    matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                }
                            })}
                        />

                        <Input
                            label="Password"
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: true
                            })}
                        />

                        <Button type="submit" classname="w-full mt-2">
                            Create Account
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup