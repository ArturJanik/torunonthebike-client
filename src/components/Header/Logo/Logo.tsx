import { Link } from 'react-router-dom';
import styles from './Logo.module.css';
import logoSrc from './logo.png';

const Logo = (): JSX.Element => (
    <Link to="/" className={ styles.logo }>
        <img src={ logoSrc } className={ styles.image } alt="torun.onthe.bike" />
    </Link>
);

export default Logo;
