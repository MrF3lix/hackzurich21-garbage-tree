import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import Consumer from '../assets/general/consumer.svg';
import ScanQr from '../assets/help/scan-qr.svg';
import Info from '../assets/help/info.svg';
import SearchSolid from '../assets/help/search-solid.svg';
import Questions from '../assets/help/questions.svg';

const Help = () => {
    const QRRef = useRef();
    const LinkRef = useRef();

    function handleQRClick() {
        QRRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    function handleLinkClick() {
        LinkRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <div className="inner">
            <Head>
                <title>Saaro&amp;Saaro - Getting started</title>
                <meta property="og:site_name" content="Getting started"></meta>
                <meta name="title" content="Getting started"></meta>
                <meta name="description" content="We provide the tools to access, understand, and see where medical information comes from and how it changes over time."></meta>
                <meta property="og:title" content="Getting started"/>
                <meta property="og:image" content="https://sns.saaro.ch/logo.png" />
                <meta property="og:type" content="website" />
            </Head>
            <div className="container container--help">
                <div className="container__left">
                    <h1>Getting started</h1>
                    <p className="subtitle">
                        Choose how you want to find Information. You can either
                        scan a QR code and go directly to the product
                        information page or use the website to search for any
                        medication.
                    </p>
                    <div className="button__container">
                        <button
                            onClick={handleQRClick}
                            className="button button--secondary"
                        >
                            I have a QR code
                        </button>
                        <button
                            onClick={handleLinkClick}
                            className="button button--secondary"
                        >
                            I want to search on the website
                        </button>
                    </div>
                </div>
            </div>
            <br />
            <div className="container container--help">
                <h2 ref={QRRef}>Find the medication using the QR Code</h2>
                <div className="step__list">
                    <div className="step bg-light-gray QR">
                        <h3>
                            <span className="in-cicle">1</span>
                            Scan the QR code
                        </h3>
                        <p className="subtitle">
                            On the back of the package there is a qr code, which
                            represents a link to the homepage containing the
                            information about your medicine.
                        </p>
                        <Image src={ScanQr} height={200} alt="SnS" />
                    </div>

                    <div className="step bg-gray QR">
                        <h3>
                            <span className="in-cicle">2</span>
                            Choose the level of information you want to see.
                        </h3>
                        <p className="subtitle">
                            To see the information for your medicine select
                            weather you are a consumer, a professional or an
                            expert. The data will be displayed to you based on
                            your level of knowledge.
                        </p>
                        <Image src={Info} height={200} alt="SnS" />
                    </div>
                </div>
                <br />
                <div>
                    <h2 ref={LinkRef}>
                        Find the medication using the searchbar
                    </h2>
                    <div className="step__list">
                        <div className="step bg-light-gray link">
                            <h3>
                                <span className="in-cicle">1</span>
                                Go to the searchbar and type in the name of your
                                medication.
                            </h3>
                            <p className="subtitle">
                                On your package you can see the name of you
                                medication. To find the medication on the
                                website go to the top left corner and type the
                                name in to the search bar. Select the correct
                                medication from the results and check if the
                                information you see is about the medication you
                                are searching for. To see the information for
                                your medicine select weather you are a consumer,
                                a professional or an expert. The data will be
                                displayed to you based on your level of
                                knowledge.
                            </p>
                            <div className="button__container">
                                <Link href="/find">
                                    <button className="button button--primary">
                                        Go to search
                                    </button>
                                </Link>
                            </div>
                            <Image src={SearchSolid} height={200} alt="SnS" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Help;
