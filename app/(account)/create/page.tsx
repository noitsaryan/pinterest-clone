import Create from "@/components/forms/Create"
import Upload from "@/components/pages/create/Upload"
import Image from "next/image"


async function page({ searchParams }: { searchParams: { [key: string]: string } }) {
    return (
        <section className="flex flex-col items-center py-8">
            {
                searchParams.image && searchParams.image.length > 0 ?
                    <Image src={searchParams.image} alt="image" width={300} height={300} className="rounded-xl shadow-xl"  priority/>
                    : <div className="flexCenter border-2 border-dashed flex-col gap-4 py-[8vw] max-w-md  px-8 bg-gray-50 rounded-xl mx-auto" >
                        <div className="text-center text-gray-400">
                            <p>Choose file upto 4MB or Video file upto 32MB</p>
                            <p>
                                Recommended Aspect - 9:16
                            </p>
                        </div>
                        <Upload />
                    </div>
            }
            <Create imageLink={searchParams.image} />
        </section>
    )
}

export default page