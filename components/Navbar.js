import React from 'react'
import styles from '../styles/Navbar.module.css';
import LoggedIn from './LoggedIn';


const Navbar = () => {
    return (
        <div className={styles.navbar}>
            <LoggedIn />
        </div>
    )
}

export default Navbar