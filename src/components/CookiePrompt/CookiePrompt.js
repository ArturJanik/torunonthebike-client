import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './CookiePrompt.module.css';

class CookiePrompt extends Component {
  state = {
    showCookiePrompt: false
  }

  componentDidMount(){
    const userDidConsent = localStorage.getItem('onthebikeCookiesAccepted');
    if(!userDidConsent){
      this.setState({showCookiePrompt: true})
    }
  }

  acceptCookies = () => {
    this.setState({showCookiePrompt: false});
    localStorage.setItem('onthebikeCookiesAccepted', true);
  }

  render(){
    if(!this.state.showCookiePrompt) return '';
    return (
      <div className={styles['cookies__wrapper']}>
        <div className={styles['cookies__text']}>
          <p>Ta strona korzysta z plików cookies, które wykorzystujemy do gromadzenia statystyk na temat ruchu na stronie i usprawniania działania strony.</p>
          <Link to="/polityka-prywatnosci" title="Polityka Prywatności i Cookies" className={styles['cookies__link']}>Dowiedz się więcej o naszej polityce prywatności</Link>
        </div>
        <div className={styles['cookies__btn']} onClick={this.acceptCookies}>Rozumiem i akceptuję</div>
      </div>
    )
  }
}

export default CookiePrompt;