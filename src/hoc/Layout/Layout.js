import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import CookiePrompt from '../../components/CookiePrompt/CookiePrompt';

class Layout extends Component {
  render() {
    return (
      <>
        <Header/>
        {this.props.children}
        <Footer />
        <CookiePrompt />
      </>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default Layout;
