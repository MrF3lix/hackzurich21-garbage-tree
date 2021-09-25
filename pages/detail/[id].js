import { useRouter } from 'next/router';
import Head from 'next/head';
import { useAsync } from 'react-use';
import { Chip } from '../../components/chip';
import { useEffect, useRef, useState } from 'react';

const Detail = () => {
    const [tabIndex, setTabIndex] = useState(0);
    const styleContainer = useRef();
    const contentContainer = useRef();

    const router = useRouter();
    const { id } = router.query;
    const data = useAsync(async () => {
        if (!id) return;
        const response = await fetch(`/api/detail/${id}`);
        return await response.json();
    }, [id]);

    useEffect(() => {
        if (!data.loading && data.value) {
            styleContainer.current.innerHTML = data.value.style;
            contentContainer.current.innerHTML = data.value.content;
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
            {data.loading || !data.value ? (
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
                        <div>
                            <ul className="tab__list">
                                <li
                                    onClick={() => setTabIndex(0)}
                                    className={
                                        tabIndex === 0
                                            ? 'tab tab--active'
                                            : 'tab'
                                    }
                                >
                                    Overview
                                </li>
                                <li
                                    onClick={() => setTabIndex(1)}
                                    className={
                                        tabIndex === 1
                                            ? 'tab tab--active'
                                            : 'tab'
                                    }
                                >
                                    Leaflet
                                </li>
                                <li
                                    onClick={() => setTabIndex(2)}
                                    className={
                                        tabIndex === 2
                                            ? 'tab tab--active'
                                            : 'tab'
                                    }
                                >
                                    Versions
                                </li>
                                <li
                                    onClick={() => setTabIndex(3)}
                                    className={
                                        tabIndex === 3
                                            ? 'tab tab--active'
                                            : 'tab'
                                    }
                                >
                                    Dependencies
                                </li>
                            </ul>

                            {tabIndex === 0 && (
                                <div>
                                    <h3>Overview</h3>
                                </div>
                            )}

                            {tabIndex === 1 && (
                                <div>
                                    <h3>Leaflet</h3>
                                    {/* <div dangerouslySetInnerHTML={data.value.content}></div> */}
                                </div>
                            )}

                            {tabIndex === 2 && (
                                <div>
                                    <h3>Versions</h3>
                                </div>
                            )}

                            {tabIndex === 3 && (
                                <div>
                                    <h3>Dependencies</h3>
                                </div>
                            )}
                        </div>
                    </p>
                    <style ref={styleContainer}></style>
                    <div ref={contentContainer}></div>
                </>
            )}

            <br />
            {/* <code>{JSON.stringify(data.value)}</code> */}
        </div>
    );
};
export default Detail;
