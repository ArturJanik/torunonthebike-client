import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './CookiePrompt.module.css';

const CookiePrompt = (): JSX.Element => {
  const [cookiePromptVisible, setCookiePromptVisible] = useState(false);

  useEffect(() => {
    const userDidConsent = localStorage.getItem('onthebikeCookiesAccepted');
    if (userDidConsent === null) {
      setCookiePromptVisible(true);
    }
  }, []);

  const acceptCookies = (): void => {
    setCookiePromptVisible(false);
    localStorage.setItem('onthebikeCookiesAccepted', 'true');
  };

  if (!cookiePromptVisible) {
    return <></>;
  }

  return (
    <div className={ styles.wrapper }>
      <div className={ styles.content }>
        <p>Ta strona korzysta z plików cookies, które wykorzystujemy do gromadzenia statystyk na temat ruchu na stronie i usprawniania działania strony.</p>
        <Link to="/polityka-prywatnosci" title="Polityka Prywatności i Cookies" className={ styles.link }>Dowiedz się więcej o naszej polityce prywatności</Link>
      </div>
      <div className={ styles.button } onClick={ acceptCookies }>Rozumiem i akceptuję</div>
    </div>
  )
}

export default CookiePrompt;
