import { fetchUserByID } from '@/actions/user.actions'
import Layout from '@/components/Layout';
import Saved from '@/components/pages/account/Saved';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

async function page({ params, searchParams }: { params: { [key: string]: string }, searchParams: { [key: string]: string } }) {
    const data = params.user && await fetchUserByID(params.user);
    return (
        data.success ? <section className='flex flex-col items-center gap-2'>
            <Image src={data.data.profileImage} className='rounded-full aspect-square object-cover' alt="profileImageUser" width={200} height={200} />
            <h1 className='text-3xl font-semibold'> {data.data.name} </h1>
            <p className="flexCenter gap-2">
                <Image src="/brands/pintrest.png" alt="logo " width={20} height={20} className="grayscale" />
                {
                    data.data.username
                }
            </p>
            <p className='max-w-sm text-center'> <Link href={data.data && data.data?.website || ""} className='font-semibold'> {data.data?.website} </Link>  {data.data?.about} </p>
            <div className='flex items-center gap-5 '>
                <Link href={`/${params.user}?topic=created`} className='border-b border-b-red-500' >Created</Link>
                <Link href={`/${params.user}?topic=saved`} className='border-b border-b-red-500' >Saved</Link>
            </div>
            <div className='w-full'>
                {
                    searchParams.topic === 'created' ? <Layout data={data.pins} /> : (
                        searchParams.topic === "saved" ? <Saved /> : <Layout data={data.pins} />
                    )
                }
            </div>
        </section> : <p>Not Found User</p>
    )
}

export default page