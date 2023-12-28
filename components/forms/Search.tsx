'use client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

function Search() {
    const router = useRouter();
    const [search, setSearch] = useState('');
    return (
        <input type="search" className="px-6 py-3 w-full max-w-xl rounded-full" placeholder="Search Pins" name="search" onKeyDown={(e) => {
            if (e.key === "Enter") {
                router.replace(`/search?q=${search}`)
            }
        }} onChange={(e) => {
            setSearch(e.target.value)
        }} />
    )
}

export default Search