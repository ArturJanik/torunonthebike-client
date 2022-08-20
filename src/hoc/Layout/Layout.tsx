import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import CookiePrompt from '../../components/CookiePrompt/CookiePrompt';

interface LayoutProps {
  children: JSX.Element[] | JSX.Element;
}

const Layout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <>
      <Header/>
      { children }
      <Footer />
      <CookiePrompt />
    </>
  );
};

export default Layout;
