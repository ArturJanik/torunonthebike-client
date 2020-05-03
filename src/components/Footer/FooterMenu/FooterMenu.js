import React from 'react';
import { Link } from 'react-router-dom';

import styles from './FooterMenu.module.css';

const FooterMenu = () => (
  <ul className={ styles.menu }>
    <li className={ styles.menuItem }><Link to="/o-projekcie">O projekcie</Link></li>
    <li className={ styles.menuItem }><Link to="/polityka-prywatnosci">Polityka Prywatności</Link></li>
  </ul>
);

export default FooterMenu;
