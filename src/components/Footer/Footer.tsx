import styles from './Footer.module.css';

import Copyright from './Copyright/Copyright';
import FooterMenu from './FooterMenu/FooterMenu';

const Footer = (): JSX.Element => (
    <footer className={ styles.footer }>
        <FooterMenu />
        <Copyright />
    </footer>
);

export default Footer;
