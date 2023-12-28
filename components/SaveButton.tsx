'use client'
import { savePin } from '@/actions/save.action';
import { usePathname } from 'next/navigation';
import toast from 'react-hot-toast';


function SaveButton({ postId }: { postId: string }) {

  const handleClick = async () => {
    const save: any = await savePin(postId);
    if (save.success) {
      toast.success(save.message)
    } else {
      toast.error(save.message)
    }
  }
  const path = usePathname();
  return (
    <button onClick={handleClick} className='py-2 px-4 text-white bg-red-600 rounded-full hover:brightness-75 absolute top-3 right-3 hover-items'>
      Save
    </button>
  )
}

export default SaveButton