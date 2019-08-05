import React, { Component } from 'react';
import styles from './Document.module.css';
import privacy from './content/privacy.content';
import about from './content/about.content';

class Document extends Component {
  state = {
    loaded: false,
    title: 'Ładowanie...'
  }

  componentDidMount(){
    this.updateTitle(this.props.show);
  }

  componentDidUpdate(prevProps){
    if(prevProps.show !== this.props.show) this.updateTitle(this.props.show);
  }

  updateTitle = (doc) => {
    switch (doc) {
      case 'privacy':
        this.setState({ title: 'Polityka prywatności i cookies', loaded: true })
        document.title = 'Polityka prywatności i cookies - Toruń.onthe.bike';
        break;
      case 'about':
        this.setState({ title: 'O projekcie', loaded: true })
        document.title = 'O projekcie - Toruń.onthe.bike';
        break;
      default:
        break;
    }
  }

  showContent = () => {
    switch (this.props.show) {
      case 'privacy':
        return(privacy);
      case 'about':
        return(about);
      default:
        break;
    }
  }

  render() {
    return(
      <section className={styles['doc__container']}>
        <h1 className={styles['doc__title']}>{this.state.title}</h1>
        {this.state.loaded ? (
          <div className={styles['doc__content']}>
            { this.showContent() }
          </div>
        ) : null }
      </section>
    )
  }
}

export default Document;