import '../styles/app.scss';

const App = ({ Component, pageProps }) => {
    return (
        <>
            <header>header</header>
            <main>
                <Component {...pageProps} />
            </main>
            <footer>footer</footer>
        </>
    );
};

export default App;
