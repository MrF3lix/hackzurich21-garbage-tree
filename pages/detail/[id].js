import { useRouter } from 'next/router';
import Head from 'next/head';
import { useAsync } from 'react-use';
import { Chip } from '../../components/chip';
import { useEffect, useRef } from 'react';

const Detail = () => {
    const style = useRef();
    const html = useRef();

    const router = useRouter();
    const { id } = router.query;
    const data = useAsync(async () => {
        if (!id) return;
        const response = await fetch(`/api/detail/${id}`);
        return await response.json();
    }, [id]);

    useEffect(() => {
        if (!data.loading) {
            style.current.innerHTML = data.value.style;
            html.current.innerHTML = data.value.content;
        }
    }, [data]);

    return (
        <div className="inner">
            <Head>
                <title>
                    Saaro&amp;Saaro -{' '}
                    {data.loading ? 'Loading...' : data.value?.name}
                </title>
            </Head>
            <div className="breadcrumbs">
                <ul>
                    <li>Home</li>
                    <li>Find</li>
                    <li>{data.loading ? 'Loading...' : data.value?.name}</li>
                </ul>
            </div>
            {(data.loading || !data.value) ? (
                <h1>Loading...</h1>
            ) : (
                <>
                    <h1 className="detail__title">
                        {data.value?.name} <span>{data.value?.substance}</span>
                        <Chip type={data.value?.status_type}>
                            {data.value?.status}
                        </Chip>
                    </h1>
                    <p>
                        {data.value?.authHolder}, ATC: {data.value?.atcCode},
                        Last Update:{' '}
                        {new Date(data.value?.last_update).toDateString()}
                    </p>
                    <style ref={style}></style>
                    <div ref={html}></div>
                </>
            )}

            <br />
            {/* <code>{JSON.stringify(data.value)}</code> */}
        </div>
    );
};
export default Detail;
