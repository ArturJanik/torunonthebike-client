import { useEffect } from 'react';
import { Button } from '../../components/UI/Button/Button';
import { pages } from './content/content';
import { setTitle } from 'utilities/setSeoTitle';
import styles from './Document.module.css';

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
      <Button onClick={() => window.history.back()} className={ styles.button }><span>Wstecz</span></Button>
    </section>
  );
};
