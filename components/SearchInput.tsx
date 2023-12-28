'use client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

function SearchInput() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  return (
    <input type="text" className='bg-gray-100 py-2 border p-4 rounded-full hidden md:block'
      onChange={(e) => {
        setSearch(e.target.value)
      }}
      placeholder='Search Pins'
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          router.push(`/search?q=${search}`)
        }
      }}
    />
  )
}

export default SearchInput