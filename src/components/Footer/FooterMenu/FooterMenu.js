import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import styles from './FooterMenu.module.css';

class FooterMenu extends Component {
  render() {
    return (
      <div className={styles['menu--footer']}>
        <ul className={styles['menu-items']}>
          <li className={styles['menu-item']}><NavLink exact to="/o-projekcie">O projekcie</NavLink></li>
          <li className={styles['menu-item']}><NavLink exact to="/polityka-prywatnosci">Polityka Prywatności</NavLink></li>
        </ul>
      </div>
    );
  }
}

export default FooterMenu;