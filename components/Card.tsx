import Image from 'next/image'
import React from 'react'
import SaveButton from './SaveButton'
import Link from 'next/link'

function Card({ data }: {
    data: {
        title: string,
        description: string,
        link: string,
        tags: string[],
        image: string,
        userId: string,
        _id: string,
    }
}) {
    let Url = data.link && new URL(data.link).hostname;
    return (
        <div className='relative hover-main' >
            <Link href={`/pin/${data._id}`} >
                <Image src={data.image} alt='pin-image' width={400} height={400} className='rounded-xl hover:brightness-50 cursor-pointer ' />
            </Link>
            <SaveButton postId={data._id.toString()} />
            <div className='absolute bottom-4 left-2 ' >
                {data.link && <Link className='bg-white px-2 py-1 rounded-full truncate border hover:brightness-90 text-sm hover-items' href={data.link}  > {Url} </Link>}
            </div>
        </div>
    )
}

export default Card