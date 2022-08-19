import styles from './Header.module.css';

import Logo from './Logo/Logo';

const Header = (): JSX.Element => (
    <header className={ styles.header }>
        <Logo />
    </header>
);

export default Header;
