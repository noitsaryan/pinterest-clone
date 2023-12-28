import { searchPinByString } from "@/actions/pin.actions";
import Layout from "@/components/Layout";
import Search from "@/components/forms/Search";

async function SearchResults({ query }: { query: string }) {
    const data: any = await searchPinByString(query)
    return (
        <section>
            <div className="bg-[url('/brands/search-banner.avif')] flexCenter flex-col h-[250px] px-6 "
                style={{ backgroundSize: 'cover' }}
            >
                <h1 className="text-white text-2xl font-semibold ">Search Pinterest </h1>
                <p className="hidden lg:block text-white mb-4 mt-2" > Search over 20+ pins </p>
                <br className="lg:hidden" />
                <Search />
            </div>
            <div className="p-6 ">
                {
                   data ? <Layout data={data} /> : (
                        <div>
                            <h1 className="mb-5  text-center text-md  lg:text-2xl text-gray-400"> Search for awesome pins.</h1>
                        </div>
                    )
                }
            </div>
        </section>
    )
}

export default SearchResults