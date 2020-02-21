// @flow
import React, { useRef, useState } from 'react';
import { Redirect } from 'react-router-dom';
import routes from '../constants/routes.json';
import styles from './Login.css';
import SignIn from '../../resources/google-signIn.jpg';

const { ipcRenderer } = window.require('electron');

export default function Login() {
  const buttonFocus = useRef();
  const [authSuccess, setAuthSuccess] = useState(false);

  if (authSuccess) {
    return <Redirect to={routes.DASHBOARD} />;
  }
  ipcRenderer.on('sign-in-ok', (event, arg) => {
    console.log(arg); // get token
    setAuthSuccess(true); // go to dashboard
  });

  const handleClick = () => {
    ipcRenderer.send('google-signIn', 'sign-in'); // make auth window
  };
  const handleKeyDown = ev => {
    if (ev.keyCode === 13) {
      handleClick();
    }
  };
  return (
    <div className={styles.loginpage}>
      <div
        className={styles.imageWrapper}
        ref={buttonFocus}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
      >
        <img src={SignIn} className="sign-in" alt="sign-in" />
      </div>
    </div>
  );
}
