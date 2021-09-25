import { useRouter } from 'next/router';
import { useAsync } from 'react-use';

const Detail = () => {
    const router = useRouter();
    const { id } = router.query;
    const data = useAsync(async () => {
        if (!id) return { loading: true };
        const response = await fetch(`/api/detail/${id}`);
        return await response.json();
    }, [id]);

    return (
        <>
            {data.loading ? (
                <h1>Loading...</h1>
            ) : (
                <h1>Detail: {data.value?.name}</h1>
            )}

            <br />
            <code>{JSON.stringify(data.value)}</code>

            <div className="button__container">
                <button className="button button--secondary">
                    View Details
                </button>
            </div>
        </>
    );
};
export default Detail;
