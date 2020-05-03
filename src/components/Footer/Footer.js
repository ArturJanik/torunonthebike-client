import React from 'react';
import styles from './Footer.module.css';

import Copyright from './Copyright/Copyright';
import FooterMenu from './FooterMenu/FooterMenu';

const Footer = () => <footer className={ styles.footer }><FooterMenu /><Copyright /></footer>;

export default Footer;
