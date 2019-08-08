import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import styles from './FooterMenu.module.css';

class FooterMenu extends Component {
  render() {
    return (
      <div className={styles['menu--footer']}>
        <ul className={styles['menu-items']}>
          <li className={styles['menu-item']}><Link to="/o-projekcie">O projekcie</Link></li>
          <li className={styles['menu-item']}><Link to="/polityka-prywatnosci">Polityka Prywatności</Link></li>
        </ul>
      </div>
    );
  }
}

export default FooterMenu;