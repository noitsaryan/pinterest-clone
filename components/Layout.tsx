import React from 'react'
import Card from './Card'

function Layout({ data }: {
    data: {
        title: string,
        description: string,
        link: string,
        tags: string[],
        image: string,
        userId: string,
        _id: string,
    }[]
}) {
    return (
        <section className='columns-2 md:columns-3 lg:columns-4 lg:max-w-screen-xl mx-auto space-y-5  py-8 '>
            {
                data && data.map((e, i) => (
                    <Card data={e} key={i} />
                ))
            }
        </section>
    )
}

export default Layout