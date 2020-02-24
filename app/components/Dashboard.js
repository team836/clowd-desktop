// @flow
import React, { useState, useEffect, useRef } from 'react';
import Granim from 'granim';
import anime from 'animejs';
import Modal from './Modal';
import Icon from '../../resources/icons/Setting.svg';
import styles from './Dashboard.css';

const { ipcRenderer } = window.require('electron');

const initFolder = { usage: 0, setting: 0, percent: 0 };
const initFiles = { count: 0 };
const initLimit = { current: 0, min: 0, max: 0, percent: 0 };

export default function Dashboard() {
  const [folder, setFolder] = useState(initFolder);
  const [files, setFiles] = useState(initFiles);
  const [limit, setLimit] = useState(initLimit);
  const [modalToggle, setModalToggle] = useState(false);
  const [signToggle, setSignToggle] = useState(false);
  const fileCountRef = useRef();

  const updateData = res => {
    setFolder(res.folder);
    setLimit(res.limit);
    anime({
      targets: files,
      count: res.file.count,
      duration: 2000,
      easing: 'easeInOutSine',
      round: 1,
      update: () => {
        fileCountRef.current.innerHTML = files.count;
        setFiles(res.file);
      }
    });
  };
  const updateSignal = () => {
    ipcRenderer
      .invoke('data-update-signal')
      .then(res => {
        updateData(res);
        return res;
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    ipcRenderer.on('file-update', (event, res) => {
      updateData(res);
    });
  }, []);

  useEffect(() => {
    ipcRenderer.send('dashboard-setup');
  }, []);

  useEffect(() => {
    updateSignal();
    setInterval(() => {
      updateSignal();
    }, 20000);
  }, []);

  useEffect(() => {
    ipcRenderer.on('send-signal', () => {
      setSignToggle(true);
      setTimeout(() => {
        setSignToggle(false);
      }, 1800);
    });
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
          limit={limit}
          updateData={updateData}
          folder={folder}
        />
      )}

      <canvas id="clowd-desktop-background" className={styles.canvasStyle} />
      {signToggle && <div className={styles.border} />}
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
            style={{ width: `${folder.percent}%` }}
          />
        </div>
      </h1>
    </div>
  );
}
