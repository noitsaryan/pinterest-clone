import SearchResults from '@/components/pages/search/SearchResults';
import React from 'react'

async function page({searchParams}: {searchParams: {[key:string]: string}}) {
  return (
    <section>
      <SearchResults query={searchParams.q} />
    </section>
  )
}

export default page