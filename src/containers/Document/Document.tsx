import { useEffect } from 'react';
import styles from './Document.module.css';
import { pages } from './content/content';
import { setTitle } from '../../utilities/setSeoTitle';

interface DocumentProps {
  show: 'privacy' | 'about';
}

export const Document = ({ show }: DocumentProps): JSX.Element => {
  const title = pages[show].title;
  const content = pages[show].content;

  useEffect(() => {
    setTitle(title);
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
