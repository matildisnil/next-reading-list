import React from 'react'
import styles from '../styles/Navbar.module.css';
import LoggedInStatus from './LoggedInStatus';


const Navbar = () => {
    return (
        <div className={styles.navbar}>
            <LoggedInStatus />
        </div>
    )
}

export default Navbar