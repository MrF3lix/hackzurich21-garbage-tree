import Head from 'next/head';
import Link from 'next/link';

const Find = () => {
    return (
        <div className="inner">
            <Head>
                <title>Saaro&Saaro - Find Information</title>
            </Head>
            <h1>Find Information</h1>

            <div className="input__container">
                <label>
                    <span></span>
                </label>
            </div>

            <div>
                <ul>
                    <li>
                        <Link href="/detail/afalgan-500mg">
                            <a>Afalgan 500mg</a>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Find;
