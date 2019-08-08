import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import CookiePrompt from '../../components/CookiePrompt/CookiePrompt';

class Layout extends Component {
  render() {
    return (
      <React.Fragment>
        <Header/>
        {this.props.children}
        <Footer />
        <CookiePrompt />
      </React.Fragment>
    );
  }
}

export default Layout;