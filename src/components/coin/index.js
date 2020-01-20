import React from 'react';
import './style.css';
import Icon from '../../assets/images/coin.jpg';


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
            <img className="coin-image" src={Icon} />
            <button className="dialog-open" onClick={ping}>open</button>
        </div>
    );
}

export default Coin;