import React from 'react';
import styles from './MessageButton.module.css';
import btnBg from '../../../assets/msgbtn.png';

const MessageButton = (props) => <div className={styles['message__button']} onClick={props.clicked}><img src={btnBg} alt="Zgłoś uwagi" /></div>;

export default MessageButton;