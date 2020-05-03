import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Logo.module.css';
import logoSrc from './logo.png';

const Logo = () => <Link to="/" className={ styles.logo }><img src={ logoSrc } alt="torun.onthe.bike" /></Link>;

export default Logo;
