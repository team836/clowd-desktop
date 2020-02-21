// @flow
import React, { useState, useEffect, useRef } from 'react';
import Granim from 'granim';
import Modal from './Modal';
import Icon from '../../resources/icons/Setting.svg';
import styles from './Dashboard.css';
import anime from 'animejs';

const { ipcRenderer } = window.require('electron');

export default function Dashboard() {
  const [localSystem, setLocalSystem] = useState({
    folderUsage: 0,
    settingSize: 0,
    fileCount: 0,
    folderPercent: 0,
    settingPercent: 0
  });
  const [modalToggle, setModalToggle] = useState(false);
  const [files, setFiles] = useState({
    count: 0
  });
  const fileCountRef = useRef();

  useEffect(() => {
    ipcRenderer.on('file-update', (event, arg) => {
      setLocalSystem({
        ...arg
      });
      if (process.platform === 'darwin') {
        arg.fileCount -= 1;
        if (arg.fileCount < 0) {
          arg.fileCount = 0;
        }
      }
      anime({
        targets: files,
        count: arg.fileCount,
        duration: 2000,
        easing: 'easeInOutSine',
        round: 1,
        update: function() {
          fileCountRef.current.innerHTML = files.count;
          setFiles(files);
        }
      });
    });
  }, []);

  const updateSignal = () => {
    ipcRenderer
      .invoke('data-update-signal')
      .then(res => {
        setLocalSystem({
          ...res
        });
        if (process.platform === 'darwin') {
          res.fileCount -= 1;
          if (res.fileCount < 0) {
            res.fileCount = 0;
          }
        }
        anime({
          targets: files,
          count: res.fileCount,
          duration: 2000,
          easing: 'easeInOutSine',
          round: 1,
          update: function() {
            fileCountRef.current.innerHTML = files.count;
            setFiles(files);
          }
        });
        return res;
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    ipcRenderer.send('socket-setup');
  }, []);

  useEffect(() => {
    updateSignal();
    setInterval(() => {
      updateSignal();
    }, 20000);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    const granimInstance = new Granim({
      element: '#clowd-desktop-background',
      name: 'granim',
      opacity: [1, 1],
      states: {
        'default-state': {
          gradients: [
            ['#FEB16D', '#E33981'],
            ['#FFE324', '#FFB553'],
            ['#1CD8D2', '#93EDC7'],
            ['#1CA7EC', '#1F2F98'],
            ['#834D9B', '#D04ED6']
          ]
        }
      }
    });
  }, []);

  return (
    <div className={styles.dashboard}>
      {modalToggle && (
        <Modal
          setModalToggle={setModalToggle}
          localSystem={localSystem}
          setLocalSystem={setLocalSystem}
        />
      )}

      <canvas id="clowd-desktop-background" className={styles.canvasStyle} />
      <h1 className={styles.header}>
        <button
          type="button"
          className={styles.iconWrapper}
          onClick={() => {
            setModalToggle(!modalToggle);
          }}
        >
          <img src={Icon} className={styles.settingIcon} alt="setting icon" />
        </button>

        <div className={styles.text}>
          <span className={styles.amount} ref={fileCountRef} />
          <span className={styles.unit}>Files</span>
        </div>
        <div className={styles.barBackground}>
          <div
            className={styles.barFill}
            style={{ width: `${localSystem.folderPercent}%` }}
          />
        </div>
      </h1>
    </div>
  );
}
