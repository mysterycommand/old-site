import './main.scss';

if (process.env.NODE_ENV !== 'production') {
    const cb = window.webpackHotUpdate;

    window.webpackHotUpdate = (...args) => {
        const links = document.querySelectorAll('link[rel=stylesheet]');

        for (let link of links) {
            let { href } = link;
            link.href = 'about:blank';
            link.href = href;
        }

        return cb(...args);
    }
}
