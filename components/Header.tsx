import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import SearchInput from './SearchInput'
import { RiSearch2Line } from "react-icons/ri";
import { getUserData, validateUser } from '@/actions/cookies.actions';

async function Header() {
  const isUser = await validateUser();
  const data = await getUserData();
  return (
    <nav className='flexBetween p-5'>
      <div className='flexCenter gap-6'>
        <Link href="/" className='flex items-center'>
          <Image src="/brands/pintrest.png" alt="brand-logo" width={40} height={40} className='hover:bg-gray-200 p-1 rounded-full md:w-[50px]' />
          <h1 className='hidden md:block text-xl mx-2 font-bold text-red-700'>Pinterest</h1>
        </Link>
        {
          isUser.success ? <div className='space-x-5'>
            <Link href="/create" className=' text-black border-b-2 border-red-700   hover:opacity-80'>
              Create
            </Link>
          </div> : null
        }
      </div>
      <div className='flexCenter  gap-6'>
        <SearchInput />
        <Link href="/search?q=#" className='md:hidden block'>
          <RiSearch2Line size={25} className="text-black" />
        </Link>
        {
          isUser.success ? <Link href="/profile" className=' rounded-full'>
            <Image alt='profile-icon' width={35} height={35} className='rounded-full aspect-square object-cover' src={data.data.profileImage} />
          </Link> : <Link href="/sign-up" className='bg-red-700 text-white px-4 py-2 rounded-full hover:opacity-80'>
            Sign Up
          </Link>
        }
      </div>
    </nav>
  )
}

export default Header