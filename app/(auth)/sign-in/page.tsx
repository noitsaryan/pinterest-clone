import SignIn from '@/components/forms/SignIn'
import Link from 'next/link'
import React from 'react'

function page() {
    return (
        <section className='p-8 space-y-6 max-w-screen-sm mx-auto'>
            <h1 className='font-bold text-xl  lg:text-2xl lg:text-red-700'> Sign In with Pintrest </h1>
            <SignIn />
            <div className='flex items-center gap-3 '>
                <hr className='w-full' />
                <p>OR</p>
                <hr className='w-full' />
            </div>
            <p className='text-sm text-center lg:text-[16px]'> Not a user? <Link href="/sign-up" className="underline"> Sign Up </Link> </p>
        </section>
    )
}

export default page