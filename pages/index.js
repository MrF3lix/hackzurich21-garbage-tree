import Image from 'next/image';
import Link from 'next/link';
import Expert from '../assets/general/expert.svg';

const Home = () => {
    return (
        <div className="inner">
            <div className="container container--home">
                <div className="container__left">
                    <h1>Access and understand proven medical information </h1>
                    <p>
                        We provide the tools to access, understand, and see
                        where medical information comes from and how it changes
                        over time.
                    </p>
                    <div className="button__container">
                        <button className="button button--primary">
                            Find information
                        </button>
                        <Link href="/help" passHref={true}>
                            <button className="button button--secondary">
                                See how it works
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="container__right">
                    <Image src={Expert} alt="Expert " />
                </div>
            </div>
        </div>
    );
};

export default Home;
