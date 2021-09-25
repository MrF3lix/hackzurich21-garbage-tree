import Head from 'next/head';
import { Chip } from '../../components/chip';
import { useEffect, useRef, useState } from 'react';

const Detail = ({ data }) => {
    const [tabIndex, setTabIndex] = useState(0);
    const styleContainer = useRef();
    const contentContainer = useRef();

    const insertAnchor = (str, phrase, id) => {
        const re = new RegExp(`(<[^<>\/]+>[^<>\/]*${phrase}[^<>\/]*<\/[^<>\/]+>)`, 'g');

        return str.replace(re, `<a id="${id}"></a>$1`);
    };

    useEffect(() => {
        if (!data.loading && data && tabIndex == 1) {
            data.content = insertAnchor(data.content, 'chtigkeit', 'driving'); // Fahrtüchtigkeit -> ü does not work...
            data.content = insertAnchor(data.content, 'Zusammensetzung', 'ingredients');

            styleContainer.current.innerHTML = data.style;
            contentContainer.current.innerHTML = data.content;
        }
    }, [data, tabIndex]);

    const [scrollTo, setScrollTo] = useState(null);
    useEffect(() => {
        if (tabIndex == 1 && scrollTo && document.getElementById(scrollTo)) {
            document.getElementById(scrollTo).scrollIntoView({behavior: 'smooth'});
            setScrollTo(null);
        }
    }, [scrollTo, tabIndex]);

    return (
        <div className="inner">
            <Head>
                <title>
                    Saaro&amp;Saaro - {data.loading ? 'Loading...' : data?.name}
                </title>
            </Head>
            <div className="breadcrumbs">
                <ul>
                    <li>Home</li>
                    <li>Find</li>
                    <li>{data.loading ? 'Loading...' : data?.name}</li>
                </ul>
            </div>
            {data.loading || !data ? (
                <h1>Loading...</h1>
            ) : (
                <>
                    <h1 className="detail__title">
                        {data?.name} <span>{data?.substance}</span>
                        <Chip type={data?.status_type}>{data?.status}</Chip>
                    </h1>
                    <p>
                        {data?.authHolder}, ATC: {data?.atcCode}, Last Update:{' '}
                        {new Date(data?.last_update).toDateString()}
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
                                    <div onClick={() => {
                                        setTabIndex(1);
                                        setScrollTo('driving');
                                    }}>
                                        <h4>Fahrtüchtigkeit</h4>
                                    </div>
                                    <div onClick={() => {
                                        setTabIndex(1);
                                        setScrollTo('ingredients');
                                    }}>
                                        <h4>Zusammensetzung</h4>
                                    </div>
                                </div>
                            )}

                            {tabIndex === 1 && (
                                <div>
                                    <h3>Leaflet</h3>
                                    <br />
                                    <style ref={styleContainer}></style>
                                    <div ref={contentContainer}></div>
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
                </>
            )}

            <br />
            {/* <code>{JSON.stringify(data)}</code> */}
        </div>
    );
};
export default Detail;

export const getServerSideProps = async (context) => {
    const response = await fetch(`https://garbage-tree-api.azurewebsites.net/api/GetInformation?act=${context.query.id}`);
    const payload = await response.json();

    context.res.setHeader(
        'Cache-Control',
        'public, s-maxage=10, stale-while-revalidate=59'
    );

    return {
        props: {
            data: { ...payload, loading: false },
        },
    };
};
