import { getUserPins } from '@/actions/pin.actions'
import Layout from '@/components/Layout';
import React from 'react'

async function Created() {
    const data: any = await getUserPins();
    if (!data.success) return;
    return (
        <section className='px-[8vw]'>
            {
                data.success ? <Layout data={data.data} /> : <h1> Seems like no pins around here. Let's Create One. </h1>
            }
        </section>
    )
}

export default Created