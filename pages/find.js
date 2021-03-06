import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { useAsync } from 'react-use';

const Find = () => {
    const [query, setQuery] = useState();

    const data = useAsync(async () => {
        if (!query || query.length < 2) return undefined;
        const response = await fetch(`/api/search/${query}`);
        return await response.json();
    }, [query]);

    return (
        <div className="inner inner--find">
            <Head>
                <title>Saaro&amp;Saaro - Find Information</title>
                <meta property="og:site_name" content="Find Information"></meta>
                <meta name="title" content="Find Information"></meta>
                <meta name="description" content="We provide the tools to access, understand, and see where medical information comes from and how it changes over time."></meta>
                <meta property="og:title" content="Find Information"/>
                <meta property="og:image" content="https://sns.saaro.ch/logo.png" />
                <meta property="og:type" content="website" />
            </Head>
            <div className="container">
                <div className="container__left">
                    <h2>Find Information</h2>
                    <p>
                        Use the search from to find any medication that is
                        approved by Swissmedic. You can search by name, ATC code
                        or substance.
                    </p>
                    <div className="input__container">
                        <label>
                            <span>Search Medication</span>
                            <input
                                type="text"
                                placeholder="Name, ATC, Substance, etc."
                                onChange={(e) => setQuery(e.target.value)}
                            />
                        </label>
                    </div>
                </div>
                <div className="container__left">
                    <ul className="search__results">
                        {!data.loading && data.value?.length > 0 && (
                            <p>Found {data.value.length} Search Results.</p>
                        )}
                        {data.loading ? (
                            <span>Loading...</span>
                        ) : (
                            data.value?.map((item, i) => (
                                <li key={i}>
                                    <Link href={`/detail/${item.id}`}>
                                        <a>
                                            <span className="item--name">{item.name} <span className="item--atc">{item.atc}</span></span> 
                                            <span className="item--substance">{item.substance}</span>
                                        </a>
                                    </Link>
                                </li>
                            ))
                        )}
                        {data.value?.length === 0 && (
                            <p>
                                Could not find anything, try searching with the
                                ACT code.
                            </p>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Find;
