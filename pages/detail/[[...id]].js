import Head from 'next/head';
import Link from 'next/link';
import { Chip } from '../../components/chip';
import { useEffect, useRef, useState } from 'react';
import { Tooltip } from '../../components/tooltip';
import { useRouter } from 'next/dist/client/router';

const Detail = ({ data }) => {
    const styleContainer = useRef();
    const contentContainer = useRef();
    const router = useRouter();
    const [tabIndex, setTabIndex] = useState(0);
    const [slideIndex, setSlideIndex] = useState(0);

    useEffect(() => {
        setTabIndex(parseInt(router.query.tabIndex || 0));
    }, [router.query]);

    const insertAnchor = (str, phrase, id) => {
        const re = new RegExp(
            `(<[^<>/]+>[^<>/]*${phrase}[^<>/]*</[^<>/]+>)`,
            'g'
        );

        return str.replace(re, `<a id="${id}"></a>$1`);
    };

    useEffect(() => {
        if (!data.loading && data && tabIndex == 1) {
            data.content = insertAnchor(data.content, 'chtigkeit', 'driving'); // Fahrtüchtigkeit -> ü does not work...
            data.content = insertAnchor(
                data.content,
                'Zusammensetzung',
                'ingredients'
            );
            data.content = insertAnchor(
                data.content,
                'Schwangerschaft',
                'pregnancy'
            );
            data.content = insertAnchor(
                data.content,
                'maximale Tagesdosis',
                'maxDose'
            );
            data.content = insertAnchor(
                data.content,
                'Lagerungshinweise',
                'storage'
            );
            data.content = insertAnchor(
                data.content,
                'Kontraindikationen',
                'contraindications'
            );

            data.content = insertAnchor(
                data.content,
                'nschte Wirkungen',
                'sideEffects'
            );
            data.content = insertAnchor(
                data.content,
                'Warnhinweise',
                'warnings'
            );
            data.content = insertAnchor(
                data.content,
                'Interaktionen',
                'substances'
            );

            data.content = insertAnchor(
                data.content,
                'Zulassungsnummer',
                'regulatoryInformation'
            );

            // styleContainer.current.innerHTML = data.style;
            // contentContainer.current.innerHTML = data.content;
        }
    }, [data, tabIndex]);

    useEffect(() => {
        if(!data) {
            return;
        }

        if(styleContainer.current && contentContainer.current) {
            styleContainer.current.innerHTML = data.style;
            contentContainer.current.innerHTML = data.content;
        }

    }, [styleContainer, contentContainer, data, tabIndex]);

    const [scrollTo, setScrollTo] = useState(null);
    useEffect(() => {
        if (tabIndex == 1 && scrollTo && document.getElementById(scrollTo)) {
            document
                .getElementById(scrollTo)
                .scrollIntoView({ behavior: 'smooth' });
            setScrollTo(null);
        }
    }, [scrollTo, tabIndex]);

    const goToSection = (name, index) => {
        if(name) {
            setScrollTo(name);
        }
        router.push({
            pathname: `/detail/${router.query.id}`,
            query: {tabIndex: index}
        });
    };

    return (
        <div className="inner">
            <Head>
                <title>Saaro&amp;Saaro - {data.name}</title>
                <meta
                    property="og:site_name"
                    content={`Saaro&amp;Saaro - ${data.name}`}
                ></meta>
                <meta
                    name="title"
                    content={`Saaro&amp;Saaro - ${data.name}`}
                ></meta>
                <meta
                    name="description"
                    content={`${data.name} - ${data.substance}`}
                ></meta>
                <meta
                    property="og:title"
                    content={`Saaro&amp;Saaro - ${data.name}`}
                />
                <meta
                    property="og:image"
                    content="https://sns.saaro.ch/logo.png"
                />
                <meta property="og:type" content="website" />
            </Head>
            <div className="breadcrumbs">
                <ul>
                    <li>
                        <Link href="/">
                            <a>Home</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/find">
                            <a>Find</a>
                        </Link>
                    </li>
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
                                    onClick={() => goToSection(null, 0)}
                                    className={
                                        tabIndex === 0
                                            ? 'tab tab--active'
                                            : 'tab'
                                    }
                                >
                                    Overview
                                </li>
                                <li
                                    onClick={() => goToSection(null, 1)}
                                    className={
                                        tabIndex === 1
                                            ? 'tab tab--active'
                                            : 'tab'
                                    }
                                >
                                    Leaflet
                                </li>
                                <li
                                    onClick={() => goToSection(null, 2)}
                                    className={
                                        tabIndex === 2
                                            ? 'tab tab--active'
                                            : 'tab'
                                    }
                                >
                                    Versions
                                </li>
                                <li
                                    onClick={() => goToSection(null, 3)}
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
                                    <div className="slides">
                                        <div
                                            className={
                                                slideIndex == 0
                                                    ? 'slide slide--active'
                                                    : 'slide'
                                            }
                                        >
                                            <div
                                                className="slide__header"
                                                onClick={() => setSlideIndex(0)}
                                            >
                                                Consumer
                                            </div>
                                            <div className="slide__content">
                                                <h4>Basic Information</h4>
                                                <ul className="linkList">
                                                    <li
                                                        onClick={() =>
                                                            goToSection(
                                                                'driving',
                                                                1
                                                            )
                                                        }
                                                    >
                                                        Driving
                                                    </li>
                                                    <li
                                                        onClick={() =>
                                                            goToSection(
                                                                'ingredients',
                                                                1
                                                            )
                                                        }
                                                    >
                                                        Ingredients
                                                    </li>
                                                    <li
                                                        onClick={() =>
                                                            goToSection(
                                                                'pregnancy',
                                                                1
                                                            )
                                                        }
                                                    >
                                                        Pregnancy
                                                    </li>
                                                    <li
                                                        onClick={() =>
                                                            goToSection(
                                                                'maxDose',
                                                                1
                                                            )
                                                        }
                                                    >
                                                        Max. Dose
                                                    </li>
                                                    <li
                                                        onClick={() =>
                                                            goToSection(
                                                                'storage',
                                                                1
                                                            )
                                                        }
                                                    >
                                                        Storage
                                                    </li>
                                                </ul>
                                                <h4>
                                                    Contraindications{' '}
                                                    <Tooltip tooltipText="Contraindications are conditions that serve as a reason not to take this medical treatment." />
                                                </h4>
                                                <ul className="linkList">
                                                    <li
                                                        onClick={() =>
                                                            goToSection(
                                                                'contraindications',
                                                                1
                                                            )
                                                        }
                                                    >
                                                        List of
                                                        contraindications
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div
                                            className={
                                                slideIndex == 1
                                                    ? 'slide slide--active'
                                                    : 'slide'
                                            }
                                        >
                                            <div
                                                className="slide__header"
                                                onClick={() => setSlideIndex(1)}
                                            >
                                                Professional
                                            </div>
                                            <div className="slide__content">
                                                <h4>Links</h4>
                                                <ul className="linkList">
                                                    <li
                                                        onClick={() =>
                                                            goToSection(
                                                                'sideEffects',
                                                                1
                                                            )
                                                        }
                                                    >
                                                        Side Effects
                                                    </li>
                                                    <li
                                                        onClick={() =>
                                                            goToSection(
                                                                'warnings',
                                                                1
                                                            )
                                                        }
                                                    >
                                                        Warnings
                                                    </li>
                                                    <li
                                                        onClick={() =>
                                                            goToSection(
                                                                'substances',
                                                                1
                                                            )
                                                        }
                                                    >
                                                        Substances
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div
                                            className={
                                                slideIndex == 2
                                                    ? 'slide slide--active'
                                                    : 'slide'
                                            }
                                        >
                                            <div
                                                className="slide__header"
                                                onClick={() => setSlideIndex(2)}
                                            >
                                                Expert
                                            </div>
                                            <div className="slide__content">
                                                <h4>Links</h4>
                                                <ul className="linkList">
                                                    <li
                                                        onClick={() =>
                                                            goToSection(
                                                                'regulatoryInformation',
                                                                1
                                                            )
                                                        }
                                                    >
                                                        Regulatory Information
                                                    </li>
                                                    <li
                                                        onClick={() =>
                                                            goToSection(null, 2)
                                                        }
                                                    >
                                                        Versions
                                                    </li>
                                                    <li
                                                        onClick={() =>
                                                            goToSection(null, 3)
                                                        }
                                                    >
                                                        Dependencies
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
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
    const response = await fetch(
        `https://garbage-tree-api.azurewebsites.net/api/GetInformation?act=${context.query.id}`
    );
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
