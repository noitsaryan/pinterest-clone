'use client'
import React, { useState } from 'react';
import Chip from '../pages/create/Chip';
import { createPin } from '@/actions/pin.actions';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

function Create({ imageLink }: { imageLink: string }) {
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [link, setLink] = useState<string>('');
    const [array, setArray] = useState<string[]>([]);
    const router = useRouter()
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        switch (name) {
            case 'title':
                setTitle(value);
                break;
            case 'description':
                setDescription(value);
                break;
            case 'link':
                setLink(value);
                break;
            default:
                break;
        }
    };

    const handleSubmit = async () => {
        const response = await createPin({
            title,
            description,
            link,
            tags: array,
            image: imageLink
        });
        if(response.success) {
            toast.success(response.message)
            router.replace("/profile")
        }else{
            toast.error(response.message)
        }
    };

    return (
        <div className="flex flex-col w-full max-w-sm mx-4 gap-4 my-4">
            <input
                type="text"
                name="title"
                value={title}
                placeholder="Enter Title"
                disabled={imageLink && imageLink.length > 0 ? false : true}
                className="px-8 py-2 rounded-full border"
                onChange={handleChange}
            />
            <textarea
                name="description"
                value={description}
                placeholder="Enter Description"
                disabled={imageLink && imageLink.length > 0 ? false : true}
                className="px-8 py-2 rounded-full border"
                onChange={handleChange}
            />
            <input
                type="url"
                name="link"
                value={link}
                placeholder="Enter Link"
                disabled={imageLink && imageLink.length > 0 ? false : true}
                className="px-8 py-2 rounded-full border"
                onChange={handleChange}
            />
            <div className={`${array.length ? 'block' : 'hidden'}`}>
                {array.map((e, i) => (
                    <span key={i} onClick={() => setArray((prev) => prev.filter((item) => item !== e))}>
                        <Chip name={e} />
                    </span>
                ))}
            </div>
            <input
                type="text"
                placeholder="Enter Tags (Enter for every tag)"
                disabled={imageLink && imageLink.length > 0 ? false : true}
                className="px-8 py-2 rounded-full border"
                onKeyDown={(e: any) => {
                    if (e.key === ' ') {
                        const trimmedValue = e.target.value.trim();
                        if (trimmedValue !== '') {
                            setArray((prev) => [...prev, trimmedValue]);
                            e.target.value = '';
                        }
                        e.preventDefault();
                    }
                }}
            />
            <button className="bg-red-600 hover:brightness-75 text-white py-2 rounded-full" onClick={handleSubmit}>
                Create
            </button>
        </div>
    );
}

export default Create;
