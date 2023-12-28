'use client'
import { login } from '@/actions/user.actions'
import { useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'

function SignIn() {
    const router = useRouter();
    const loginUser = async (e: FormData) => {
        const identity = e.get("identity")?.toString()
        const password = e.get("password")?.toString();
        const response = identity && password && await login({ identity, password });

        if (!response) toast.error("Enter complete details")

        if (response && response.success) {
            if (!response) return;
            toast.success(response.message);
            router.replace("/profile")
        } else {
            if (!response) return;
            toast.error(response.message);
        }
    }
    return (
        <form action={loginUser} className='py-5 flex flex-col gap-4'>
            <input type="text" name="identity" placeholder='Enter Email or Username' className='signUpInputs' />
            <input type="text" name="password" placeholder='Enter Password' className='signUpInputs' />
            <button type="submit" className='bg-red-600 text-white font-regular rounded-full py-[8px]'>Sign In</button>
        </form>

    )
}

export default SignIn