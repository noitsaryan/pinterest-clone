import SignUp from '@/components/forms/SignUp'
import Link from 'next/link'
import React from 'react'

function page() {
  return (
    <section className='p-8 space-y-6 max-w-screen-sm mx-auto '>
      <h1 className='font-bold text-xl lg:text-2xl lg:text-red-700 '> Sign up with Pintrest </h1>
      <SignUp />
      <div className='flex items-center gap-3 '>
        <hr className='w-full' />
        <p>OR</p>
        <hr className='w-full' />
      </div>
      <p className='text-sm lg:text-[16px] text-center'> Already a user? <Link href="/sign-in" className="underline"> Sign In </Link> </p>
    </section>
  )
}

export default page