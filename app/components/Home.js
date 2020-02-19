// @flow
import React, { useRef } from 'react';
// import { Link } from 'react-router-dom';
// import routes from '../constants/routes.json';
import styles from './Home.css';
import SignIn from '../../resources/google-signIn.jpg';

const { ipcRenderer } = window.require('electron');

export default function Home() {
  const buttonFocus = useRef();

  ipcRenderer.on('sign-in', (event, arg) => {
    console.log(arg);
  });

  const handleClick = () => {
    ipcRenderer.send('google-signIn', 'sign-in');
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
      {/* <Link to={routes.COUNTER}>to Counter</Link> */}
    </div>
  );
}
