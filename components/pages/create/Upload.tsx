'use client'
import React from 'react'
import { UploadButton } from "@/utils/uploadthing"
import toast from "react-hot-toast"
import { useRouter } from 'next/navigation';
function Upload({ styles }: { styles?: string }) {
    const router = useRouter();
    return (
        <UploadButton
            appearance={{
                button: `bg-red-600 hover:opacity-80 ${styles}`,
                allowedContent: 'hidden'
            }}
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
                toast.success("Image Uploaded");
                router.replace(`/create?image=${res?.[0].url}`)
            }}
            onUploadError={() => {
                toast.error("An error occured while uploading image");
            }}
        />
    )
}

export default Upload