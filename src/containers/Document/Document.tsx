import { useEffect } from 'react';
import styles from './Document.module.css';
import privacy from './content/privacy.content';
import about from './content/about.content';

const pages: {
  [key: string]: {
    title: string;
    content: JSX.Element;
  };
} = {
  'privacy': {
    title: 'Polityka prywatności i cookies',
    content: privacy,
  },
  'about': {
    title: 'O projekcie',
    content: about,
  },
};

interface DocumentProps {
  show: 'privacy' | 'about';
}

export const Document = ({ show }: DocumentProps): JSX.Element => {
  const title = pages[show].title;
  const content = pages[show].content;

  useEffect(() => {
    document.title = `${ title } - Toruń.onthe.bike`;
  }, [show]);

  return (
    <section className={ styles.document }>
      <h1 className={ styles.title }>{ title }</h1>
      <div className={ styles.content }>
        {content}
      </div>
    </section>
  );
};

export default Document;
