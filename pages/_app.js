import '../styles/app.scss';

const App = ({ Component, pageProps }) => {
    return (
        <div className="theme theme--light">
            <header>header</header>
            <main>
                <Component {...pageProps} />
            </main>
            <footer>footer</footer>
        </div>
    );
};

export default App;
