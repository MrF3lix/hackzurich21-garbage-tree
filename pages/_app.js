import '../styles/app.scss';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '../assets/ci/logo-sns.svg';

const App = ({ Component, pageProps }) => {
    return (
        <div className="root theme theme--light">
            <div className="banner banner--danger">The content on this page does not provide any reliable medical information. This is for entertainment purposes only.</div>
            <header>
                <Link href="/">
                    <a>
                        <Image src={Logo} height={200} width={500} alt="SnS" />
                    </a>
                </Link>
            </header>
            <main>
                <Component {...pageProps} />
            </main>
            <footer>{/* <div className="inner">Footer</div> */}</footer>
        </div>
    );
};

export default App;
