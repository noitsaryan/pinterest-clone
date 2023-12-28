'use client'
import { register } from '@/actions/user.actions'
import { useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'

function SignUp() {
    const router = useRouter();
    const registerUser = async (e: FormData) => {
        const name = e.get("name")?.toString()
        const username = e.get("username")?.toString()
        const email = e.get("email")?.toString()
        const password = e.get("password")?.toString();
        const response = name && email && password && username && await register({ name, email, username, password });
        if (!response) toast.error("Enter complete details")
        if (response.success) {
            if (!response) return;
            toast.success(response.message);
            router.replace("/sign-in")
        } else {
            if (!response) return;
            toast.error(response.message);
        }
    }
    return (
        <form action={registerUser} className='py-5 flex flex-col gap-4'>
            <input type="text" name="name" placeholder='Enter Name' className='signUpInputs' />
            <input type="text" name="email" placeholder='Enter Email' className='signUpInputs' />
            <input type="text" name="username" placeholder='Enter Username' className='signUpInputs' />
            <input type="text" name="password" placeholder='Enter Password' className='signUpInputs' />
            <button type="submit" className='bg-red-600 text-white font-regular rounded-full py-[8px]'>Sign Up</button>
        </form>

    )
}

export default SignUp