import React from 'react'

function Chip({ name }: { name: string }) {
    return (
        <span id="badge-dismiss-dark" className="inline-flex items-center px-2 py-1 me-2 text-sm font-medium  bg-red-500 text-white rounded-full dark:text-gray-300 hover:opacity-50 cursor-pointer my-1">
            {name}
        </span>
    )
}

export default Chip