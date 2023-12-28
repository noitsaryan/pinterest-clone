import { fetchPinById } from '@/actions/pin.actions';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

async function page({ params }: { params: { [key: string]: string } }) {
    const data = await fetchPinById(params.id);
    const Url = data.data.image && new URL(data.data.image);
    return (
        data && <section className='px-8 py-8 space-y-5 md:flex md:justify-center md:gap-8 '>
            <div className='relative hover-main '>
                <Image alt='pinImage' width={500} height={500} src={data.data.image} className='rounded-xl hover:brightness-50' />
                {
                    data.data.image &&
                    <Link href={data.data.image} className='bg-white rounded-full shadow-lg px-2 py-1 absolute bottom-3 left-3 hover-items font-semibold' > Visit Image </Link>
                }
            </div>
            <div className='space-y-5'>
            <h1 className='text-2xl font-semibold '> {data.data.title} </h1>
            <p> {data.data.description} </p>
            <div className='flex flex-wrap gap-3 '>
                {
                    data.data && data.data.tags.map((e: any, i: number) => (
                        <div key={i} className='bg-red-500 text-white px-3 py-1 rounded-full text-sm'>
                            {e}
                        </div>
                    ))
                }
            </div>
            </div>
        </section>
    )
}

export default page