import { getUserData } from "@/actions/cookies.actions"
import Created from "@/components/pages/account/Created";
import Saved from "@/components/pages/account/Saved";
import Image from "next/image"
import Link from "next/link";

async function page({ searchParams }: { searchParams: { [key: string]: string } }) {
  const data = await getUserData();
  const url = data.data.website && new URL(data.data?.website)

  return (
    <section className="py-[8vw]">
      <div className="flexCenter flex-col gap-2 ">
        <Image src={data.data.profileImage || "/brands/pintrest.png"}  className='rounded-full aspect-square object-cover' alt="profileImageUser" width={160} height={160} />
        <h1 className='text-3xl font-semibold'> {data.data.name} </h1>
        <p className="flexCenter gap-2">
          <Image src="/brands/pintrest.png" alt="logo " width={20} height={20} className="grayscale" />
          {
            data.data.username
          }
        </p>
        <p className='max-w-sm text-center'> <Link href={data.data && data.data?.website || "/"} className='font-semibold' target="_blank"> {url && url.hostname} </Link>  {data.data?.about} </p>
        <Link href="/profile/edit" className="bg-red-600 hover:opacity-80 px-4 py-2 text-white rounded-full "> Edit Profile </Link>
        <div className='flex items-center gap-5 my-7'>
          <Link href={`/profile?topic=created`} className={` px-2 py-1 rounded-full ${searchParams.topic === 'created' ? 'bg-red-600 text-white '  : 'border border-red-500 text-red-500'}`} >Created</Link>
          <Link href={`/profile?topic=saved`} className={` px-2 py-1 rounded-full  ${searchParams.topic === 'saved' ? 'bg-red-600 text-white'  : 'border text-red-500 border-red-500'}`} >Saved</Link>
        </div>
        <div>
          {
            searchParams.topic === 'created' ? <Created /> : (
              searchParams.topic === "saved" ? <Saved /> : <Created />
            )
          }
        </div>
      </div>
    </section>
  )
}

export default page