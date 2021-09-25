import '../styles/app.scss';
import Image from 'next/image';
import Logo from '../assets/ci/logo-sns.svg';

const App = ({ Component, pageProps }) => {
    return (
        <>
            <header>
                <Image src={Logo} height={200} width={500} alt="SnS" />
            </header>
            <main>
                <Component {...pageProps} />
            </main>
            <footer>footer</footer>
        </>
    );
};

export default App;
