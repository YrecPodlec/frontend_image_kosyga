import React from 'react';
import styles from './footer.module.scss'
const Footer = () => {
    return (
        <footer className={styles.footer}>
            <button className={styles.startBtn}>
                <img src="https://win98icons.alexmeub.com/icons/png/windows-0.png" alt="win" />
                <span>About Project</span>
            </button>
        </footer>
    );
};

export default Footer;