import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import authService from '../appwrite/auth'
import { login as authLogin } from '../store/authSlice'
import { Button, Logo, Input } from './index'
import { useForm } from "react-hook-form"


function Login() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("");

    const login = async (data) => {
        setError("");

        try {
            const session = await authService.login(data);
            if (session) {
                const userData = await authService.getCurrentUser();

                if (userData) {
                    const clearUser = {
                        $id: userData.$id,
                        status: userData.status,
                        email: userData.email,
                        name: userData.name,
                    }
                    dispatch(authLogin({ userData: clearUser }));
                }

                navigate("/");
            }

        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className='flex items-center justify-center w-full px-4'>

            <div className='mx-auto w-full max-w-md bg-white rounded-xl p-8 border border-slate-200 shadow-sm'>
                <div className="mb-4 flex justify-center">
                    <span className="inline-block w-full max-w-20">
                        <Logo width="100%" />
                    </span>
                </div>

                <h2 className="text-center text-xl font-semibold text-slate-900">
                    Sign in to your account
                </h2>
                <p className="mt-2 text-center text-sm text-slate-500">
                    Don&apos;t have an account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-slate-900 hover:underline underline-offset-2"
                    >
                        Sign Up
                    </Link>
                </p>

                {error && (
                    <p className="text-red-600 text-sm bg-red-50 border border-red-100 rounded-md px-3 py-2 mt-6 text-center">
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit(login)} className='mt-6'>
                    <div className='space-y-4'>
                        <Input
                            label="Email"
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                }
                            })}
                        />

                        <Input
                            label="Password"
                            placeholder="Enter your password"
                            type="password"
                            {...register("password", {
                                required: true
                            })}
                        />

                        <Button
                            type='submit'
                            classname='w-full mt-2'>
                            Sign In
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login