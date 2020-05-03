import React from 'react';
import { Link } from 'react-router-dom';

import styles from './FooterMenu.module.css';

const FooterMenu = () => (
  <ul className={ styles.menu__footer }>
    <li className={ styles.menu__item }><Link to="/o-projekcie">O projekcie</Link></li>
    <li className={ styles.menu__item }><Link to="/polityka-prywatnosci">Polityka Prywatności</Link></li>
  </ul>
);

export default FooterMenu;
