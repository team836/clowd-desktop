/* eslint-disable react/prop-types */
// @flow
import React, { useState, useEffect } from 'react';
import styles from './Modal.css';
import { changeUnitDown, changeUnitUpper } from '../utils/fileUnit';

const { ipcRenderer } = window.require('electron');

export default function Modal({ setModalToggle, limit, updateData, folder }) {
  // eslint-disable-next-line react/prop-types
  const [value, setValue] = useState(changeUnitDown(limit.current, 2));
  const [isLoaded, setIsLoaded] = useState(false);
  const [fillWidthPercent, setFillWidthPercent] = useState(
    // eslint-disable-next-line react/prop-types
    limit.percent
  );
  const [isOver, setIsOver] = useState(
    changeUnitDown(folder.usage, 2) >= value
  );
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const clickWarpper = () => {
    if (isOver) {
      return;
    }
    ipcRenderer
      .invoke('data-settingSize', changeUnitUpper(value, 2))
      .then(res => {
        updateData(res);
        return res;
      })
      .catch(err => {
        console.log(err);
      });
    setIsLoaded(false);
    setTimeout(() => {
      setModalToggle(false);
    }, 200);
  };

  const inputChange = e => {
    setValue(e.target.value);
    const percent = Math.ceil(
      // (e.target.value / (limit.max / 1024 ** 2 - limit.min / 1024 ** 2)) * 100
      (e.target.value /
        (changeUnitDown(limit.max, 2) - changeUnitDown(limit.min, 2))) *
        100
    );
    setFillWidthPercent(percent);
    setIsOver(changeUnitDown(folder.usage, 2) >= e.target.value);
  };

  const handleKeyDown = ev => {
    if (ev.keyCode === 13) {
      console.log('keyDown');
      clickWarpper();
    }
  };

  return (
    <div
      className={isLoaded ? styles.modelWrapperLoaded : styles.modelWrapper}
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onClick={clickWarpper}
    >
      <div
        className={isLoaded ? styles.modalLoaded : styles.modal}
        role="button"
        tabIndex={0}
        onClick={e => {
          e.stopPropagation();
        }}
        onKeyDown={handleKeyDown}
      >
        <div className={styles.modalText}>Set the limit(MB)</div>
        <div className={styles.sliderWrapper}>
          <div className={styles.sliderBackground} />
          <div
            className={styles.sliderFill}
            style={
              isOver
                ? {
                    width: `${fillWidthPercent}%`,
                    background: 'red'
                  }
                : {
                    width: `${fillWidthPercent}%`
                  }
            }
          />
          <input
            type="range"
            min={changeUnitDown(limit.min, 2)}
            max={changeUnitDown(limit.max, 2)}
            step="1"
            value={value}
            className={styles.slider}
            id="myRange"
            onChange={inputChange}
          />
        </div>
        <div className={styles.labelWrapper}>
          <div
            className={styles.currentLabel}
            style={
              isOver
                ? {
                    left: `calc(${26 /
                      10}px + ${fillWidthPercent}% - ${fillWidthPercent /
                      100} * ${30}px)`,
                    color: 'red'
                  }
                : {
                    left: `calc(${26 /
                      10}px + ${fillWidthPercent}% - ${fillWidthPercent /
                      100} * ${30}px)`
                  }
            }
          >
            {value}
          </div>
        </div>
      </div>
    </div>
  );
}
