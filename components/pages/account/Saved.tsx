import { getUserSaved } from '@/actions/save.action'
import Card from '@/components/Card';
import React from 'react'

async function Saved() {
  const data: any = await getUserSaved();
  if (!data.success) return <>
    <div className='px-5 py-8 text-xl font-semibold text-gray-600'>
      <h1> No saved pins. </h1>
    </div>
  </>;
  return (
    <section className='p-[8vw] columns-2 lg:columns-4 md:coloumns-3 space-y-5'>
      {
        data && data.data.map((e: any, i: number) => (
          <Card data={e.pinId} key={i} />
        ))
      }
    </section>
  )
}

export default Saved