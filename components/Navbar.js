import React from 'react'
import styles from '../styles/Navbar.module.css';
import LoggedInStatus from './LoggedInStatus';
import { useSelector } from 'react-redux';
import { selectReadOrUnread } from '../redux/readOrUnread/slices';


const Navbar = () => {

    const readOrUnread = useSelector(selectReadOrUnread);
    return (
        <div className={styles.navbar}>
            <h2 className={styles.text}>{readOrUnread ? "Thank-you-for-reading-me" : "Please-Read-Me"}</h2>
            <LoggedInStatus />
        </div>
    )
}

export default Navbar