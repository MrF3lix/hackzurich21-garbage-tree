import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
    return (
        <>
            <header>header</header>
            <main>
                <Component {...pageProps} />
            </main>
            <footer>footer</footer>
        </>
    );
}

export default MyApp;
