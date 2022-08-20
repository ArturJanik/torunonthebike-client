
import privacy from './privacy.content';
import about from './about.content';

interface Page {
    title: string;
    content: JSX.Element;
}

interface Pages {
    [key: string]: Page;
}

export const pages: Pages = {
  'privacy': {
    title: 'Polityka prywatności i cookies',
    content: privacy,
  },
  'about': {
    title: 'O projekcie',
    content: about,
  },
};
