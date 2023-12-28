import { getPins } from '@/actions/pin.actions'
import Layout from '@/components/Layout'
import React from 'react'

async function page() {
  const response = await getPins();
  let data: any = response.data
  return (
    <section className='mx-5'>
      <Layout data={data} />
    </section>
  )
}

export default page