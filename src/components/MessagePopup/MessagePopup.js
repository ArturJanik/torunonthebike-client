import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import axios from 'axios';
import styles from './MessagePopup.module.css';
import './MessagePopup.animation.css';

import MessageButton from './MessageButton/MessageButton';

class MessagePopup extends Component {
  state = {
    isVisible: false,
    showPopup: false,
    error: false,
    formText: '',
    success: false
  }

  handleEntered = () => this.setState({ showPopup: true });

  handleExit = () => this.setState({ showPopup: false });

  handleExited = () => {
    this.setState({
      showPopup: false,
      error: false,
      formText: '',
      success: false
    });

    if(this.successTimeout) clearTimeout(this.successTimeout);
  }

  showPopup = () => this.setState({ isVisible: true });
  hidePopup = () => this.setState({ isVisible: false });

  showError = () => <p className={ styles.popup__error }>{ this.state.error }</p>
  showSuccess = () => <p className={ styles.popup__success }>Wiadomość wysłana pomyślnie! Dzięki!</p>

  showForm = () => (
    <>
      <p className={ styles.popup__title }>Zgłoś uwagi i pomóż w tworzeniu mapy</p>
      <p className={ styles.popup__description }>Jeśli zauważycie jakieś nieścisłości, błędy czy braki, lub jeśli macie jakieś propozycje co do mapy itp. - proszę o wypełnienie anonimowego formularza. Postaram się w miarę regularnie aktualizować mapę.</p>
      <textarea placeholder="Twoje uwagi" className={ styles.popup__textarea } onChange={ this.handleTextareaChange }></textarea>
      { this.state.error && this.showError() }
      <div className={ styles.popup__button } onClick={ this.sendForm }>Wyślij</div>
    </>
  )

  sendForm = async () => {
    await this.validateTextarea();
    if(!this.state.error){
      const url = (process.env.NODE_ENV === 'development') ? 'http://localhost:3001/api/feedback' : 'https://api.onthe.bike/api/feedback';
      axios.post(url, { message: this.state.formText })
      .then(res => {
        this.setState({ error: false, success: true });
        this.successTimeout = setTimeout(() => this.hidePopup(), 3000);
      }).catch(error => {
        this.setState({ error: 'Błąd serwera. Spróbuj ponownie później.' })
      });
    }
  }

  handleTextareaChange = (e) => this.setState({ formText: e.target.value }, () => this.validateTextarea());

  validateTextarea = () => {
    let error = false;
    if(this.state.formText.trim() === ''){
      error = 'Błąd: Formularz nie może być pusty.';
    }
    this.setState({ error });
  }

  render(){
    return(
      <>
        <CSSTransition 
          in={ this.state.isVisible } 
          timeout={ 300 } 
          classNames="overlay" 
          mountOnEnter unmountOnExit 
          onEntered={ this.handleEntered } 
          onExit={ this.handleExit }
          onExited={ this.handleExited }
        >
          <div className={ styles.popup__overlay } onClick={ this.hidePopup }>
            <CSSTransition 
              in={ this.state.showPopup } 
              timeout={ 300 } 
              classNames="popup" 
              mountOnEnter unmountOnExit
            >
              <div className={ styles.popup__container } onClick={ (e) => e.stopPropagation() }>
                {this.state.success ? this.showSuccess() : this.showForm()}
              </div>
            </CSSTransition>
          </div>
        </CSSTransition>
        <MessageButton clicked={ this.showPopup } />
      </>
    )
  }
}

export default MessagePopup;
