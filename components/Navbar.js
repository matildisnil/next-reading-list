import React from 'react'
import styles from '../styles/Navbar.module.css';
import LoggedInStatus from './LoggedInStatus';
import { useSelector } from 'react-redux';
import { selectReadOrUnread } from '../redux/readOrUnread/slices';
import { selectUser } from '../redux/login/slices';
import Image from 'next/image';



const Navbar = () => {
    const user = useSelector(selectUser);


    const readOrUnread = useSelector(selectReadOrUnread);
    return (
        <div className={styles.navbar}>
            {user?.photoURL && <Image src={user.photoURL} width="48" height="48" className={styles.photo} />}
            <h2 className={styles.text}>{readOrUnread ? "Thank-you-for-reading-me" : "Please-Read-Me"}</h2>
            <LoggedInStatus />
        </div>
    )
}

export default Navbar