// @flow
import React, { useState, useEffect } from 'react';
import styles from './Modal.css';

const { ipcRenderer } = window.require('electron');

// eslint-disable-next-line react/prop-types
export default function Modal({ setModalToggle, localSystem, setLocalSystem }) {
  // eslint-disable-next-line react/prop-types
  const [value, setValue] = useState(localSystem.settingSize);
  const [isLoaded, setIsLoaded] = useState(false);
  const [fillWidthPercent, setFillWidthPercent] = useState(
    // eslint-disable-next-line react/prop-types
    localSystem.settingPercent
  );

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleKeyDown = ev => {
    if (ev.keyCode === 13) {
      console.log('123');
    }
  };

  return (
    <div
      className={isLoaded ? styles.modelWrapperLoaded : styles.modelWrapper}
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onClick={() => {
        const receive = ipcRenderer.sendSync(
          'data-settingSize',
          parseInt(value, 10)
        );
        setLocalSystem(receive);
        setIsLoaded(false);
        setTimeout(() => {
          setModalToggle(false);
        }, 200);
      }}
    >
      <div
        className={isLoaded ? styles.model : styles.model}
        role="button"
        tabIndex={0}
        onClick={e => {
          e.stopPropagation();
        }}
        onKeyDown={handleKeyDown}
      >
        <div className={styles.modalText}>Set the limit(GB)</div>
        <div className="slider-wrapper">
          <div className="slider-background" />
          <div
            className="slider-fill"
            style={{
              width: `${fillWidthPercent}%`
            }}
          />
          <input
            type="range"
            min="1"
            max="100"
            step="1"
            value={value}
            className="slider"
            id="myRange"
            onChange={e => {
              setValue(e.target.value);
              const percent = e.target.value;
              setFillWidthPercent(percent);
            }}
          />
        </div>
        <div className="label-wrapper">
          <div
            className="current-label"
            style={{
              // left: `${fillWidthPercent}%`
              left: `calc(${26 /
                10}px + ${fillWidthPercent}% - ${fillWidthPercent /
                100} * ${26}px)`
            }}
          >
            {value}
          </div>
        </div>
      </div>
    </div>
  );
}
