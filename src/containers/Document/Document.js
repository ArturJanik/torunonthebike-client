import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Document.module.css';
import privacy from './content/privacy.content';
import about from './content/about.content';

class Document extends Component {
  state = {
    loaded: false,
    title: 'Ładowanie...'
  }

  componentDidMount(){
    this.updateTitle();
  }

  componentDidUpdate(prevProps){
    if(prevProps.show !== this.props.show) this.updateTitle();
  }

  updateTitle() {
    switch (this.props.show) {
      case 'privacy':
        this.setState({ title: 'Polityka prywatności i cookies', loaded: true })
        document.title = 'Polityka prywatności i cookies - Toruń.onthe.bike';
        break;
      case 'about':
      default:
        this.setState({ title: 'O projekcie', loaded: true })
        document.title = 'O projekcie - Toruń.onthe.bike';
        break;
    }
  }

  showContent() {
    switch (this.props.show) {
      case 'privacy':
        return(privacy);
      case 'about':
      default:
        return(about);
    }
  }

  render() {
    return(
      <section className={ styles.document }>
        <h1 className={ styles.title }>{ this.state.title }</h1>
        { this.state.loaded && (
          <div className={ styles.content }>
            {this.showContent()}
          </div>
        ) }
      </section>
    )
  }
}

Document.propTypes = {
  show: PropTypes.string
};

export default Document;
