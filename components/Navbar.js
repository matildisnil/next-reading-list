import React from 'react'
import styles from '../styles/Navbar.module.css';
import LoggedInStatus from './LoggedInStatus';


const Navbar = () => {
    return (
        <div className={styles.navbar}>
            <h2 className={styles.text}>Please-Read-Me</h2>
            <LoggedInStatus />
        </div>
    )
}

export default Navbar