import { useRouter } from 'next/router';
import { useAsync } from 'react-use';
import { Chip, CHIP_TYPE_GOOD } from '../../components/chip';

const Detail = () => {
    const router = useRouter();
    const { id } = router.query;
    const data = useAsync(async () => {
        if (!id) return { loading: true };
        const response = await fetch(`/api/detail/${id}`);
        return await response.json();
    }, [id]);

    return (
        <div className="inner">
            <div className="breadcrumbs">
                <ul>
                    <li>Home</li>
                    <li>Medical</li>
                    <li>Painkiller</li>
                    <li>Parabetamol</li>
                </ul>
            </div>
            {data.loading ? (
                <h1>Loading...</h1>
            ) : (
                <>
                    <h1 className="detail__title">
                        {data.value?.name} <span>{data.value?.substance}</span>
                        <Chip type={data.value?.status_type}>{data.value?.status}</Chip>
                    </h1>
                    <p>{data.value?.authHolder}, ATC: {data.value?.atcCode}, Last Update: {new Date(data.value?.last_update).toDateString()}</p>
                    <div>

                    </div>
                </>
            )}
{/* 
            <br />
            <code>{JSON.stringify(data.value)}</code> */}
        </div>
    );
};
export default Detail;
