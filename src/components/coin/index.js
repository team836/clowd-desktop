import React from 'react';
import './style.css';

const { ipcRenderer } = window.require('electron')

ipcRenderer.on('asynchronous-reply', (event, arg) => {
    console.log(arg) // "pong"이 출력됩니다.
})


const Coin = () => {

    const ping = () => {
        console.log("clicked")
        ipcRenderer.send('asynchronous-message', 'ping')
    }


    return (
        <div className="coin">
            coin
        <button className="dialog-open" onClick={ping}>open</button>
        </div>
    );
}

export default Coin;