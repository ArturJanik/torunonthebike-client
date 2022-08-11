import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import styles from './Document.module.css';
import privacy from './content/privacy.content';
import about from './content/about.content';

const pages = {
  'privacy': {
    title: 'Polityka prywatności i cookies',
    content: privacy,
  },
  'about': {
    title: 'O projekcie',
    content: about,
  },
};

export const Document = ({ show }) => {
  const [ loaded, setLoaded ] = useState(false);
  const [ title, setTitle ] = useState('Ładowanie...');
  const [ content, setContent ] = useState('');

  useEffect(() => {
    updatePage();
  }, [ show, updatePage ]);

  const updatePage = useCallback(() => {
    setLoaded(true);
    updateTitle();
    setContent(pages[ show ].content);
  }, [ show, updateTitle ]);

  const updateTitle = useCallback(() => {
    const pageTitle = pages[ show ].title;
    setTitle(pageTitle);
    document.title = `${ pageTitle } - Toruń.onthe.bike`;
  }, [ show ]);

  return (
    <section className={ styles.document }>
      { loaded && <h1 className={ styles.title }>{ title }</h1> }
      { loaded && (
        <div className={ styles.content }>
          {content}
        </div>
      ) }
    </section>
  );
};

Document.propTypes = {
  show: PropTypes.string
};

export default Document;
