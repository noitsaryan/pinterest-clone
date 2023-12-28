"use client"
import { updateProfile } from '@/actions/user.actions';
import Image from 'next/image';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

import { UploadButton } from '@/utils/uploadthing';

function Edit({ data }: { data: { [key: string]: string } }) {
    if(!data) return;
    const [image, setImage] = useState(data.profileImage);
    const [formData, setFormData] = useState({
        name: data.name || '',
        username: data.username || '',
        email: data.email || '',
        about: data.about || '',
        birthday: data.birthday || '',
        gender: data.gender || '',
        website: data.website || ''
    });
    let birthday = data.birthday && new Date(data.birthday).toLocaleDateString("en-GB")
    const handleSubmit = async () => {
        const object = {
            name: formData.name,
            username: formData.username,
            email: formData.email,
            about: formData.about,
            birthday: formData.birthday,
            gender: formData.gender,
            website: formData.website,
            image
        };
        const data = await updateProfile(object);
        if (data.success) {
            toast.success(data.message);
        } else {
            toast.error(data.message);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        data &&
        <form action={handleSubmit} className='flex flex-col styleInput gap-2 w-full px-8 mx-auto '>
            <div className='flexCenter gap-4' >
                <Image alt='profile-image' className='rounded-full aspect-square object-cover' src={data.profileImage} width={150} height={150} />
                <div>
                    <p className='text-gray-500 text-sm'>Upload New Image</p>
                    <UploadButton
                        appearance={{
                            button: `bg-red-600 hover:opacity-80`,
                            allowedContent: 'hidden'
                        }}
                        endpoint="imageUploader"
                        onClientUploadComplete={(res: {
                            url: string
                        }[]) => {
                            toast.success("Profile Uploaded. Click Update to save.");
                            setImage(res?.[0].url);
                        }}
                        onUploadError={() => {
                            toast.error("An error occured while uploading image");
                        }}
                    />
                </div>
            </div>
            <div className='mx-auto space-y-4'>
                <div className='flex gap-2 items-center'>
                    <label className='text-sm'>Name</label>
                    <input className='px-4 py-2 rounded-full border w-full max-w-sm' type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
                </div>
                <div className='flex gap-2 items-center '>
                    <label className='text-sm'>Username</label>
                    <input className='px-4 py-2 rounded-full border w-full max-w-sm' type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" />
                </div>
                <div className='flex gap-2 items-center '>
                    <label className='text-sm'>Email</label>
                    <input className='px-4 py-2 rounded-full border w-full max-w-sm opacity-50' type="text" name="email" disabled value={formData.email} onChange={handleChange} placeholder="Email" />
                </div>
                <div className='flex gap-2 items-center '>
                    <label className='text-sm'>About</label>
                    <textarea className='px-4 py-2 w-full rounded-full max-w-sm border' name="about" value={formData.about} onChange={handleChange} placeholder="About" />
                </div>
                <div className='flex gap-2 items-center '>
                    <label className='text-sm'>DOB</label>
                    <input type="text" value={birthday} className='px-4 py-2 rounded-full border w-full max-w-max ' disabled />
                    <input className='px-4 py-2 rounded-full border w-full max-w-min' type="date" name="birthday" onChange={handleChange} placeholder="DOB" />
                </div>
                <div className='flex gap-2 items-center '>
                    <label className='text-sm'>Gender</label>
                    <select className='border rounded-full px-2  py-2' name="gender" value={formData.gender} onChange={handleChange}>
                        <option value="">{formData.gender}</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="ratherNotSay">Rather Not Say</option>
                    </select>
                </div>
                <div className='flex gap-2 items-center '>
                    <label className='text-sm'>Website</label>
                    <input className='px-4 py-2 rounded-full border w-full max-w-sm' type="url" name="website" value={formData.website} onChange={handleChange} placeholder="Website" />
                </div>
                <button type="submit" className='bg-red-700 py-[8px] max-w-[480px] text-white rounded-full w-full mx-auto hover:opacity-80 my-2'>Update</button>
            </div>

        </form>
    );
}

export default Edit;
