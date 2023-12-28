import { fetchUserData } from '@/actions/user.actions'
import Edit from '@/components/forms/Edit';

async function page() {
    const { data } = await fetchUserData();
    return (
        <section>
            <Edit data={data} />
        </section>
    )
}

export default page