import React from 'react';
import BooksList from '../components/BooksList';
import { MdAdd } from 'react-icons/md';
import styles from '../styles/Home.module.css'
import { useSelector, useDispatch } from 'react-redux';
import { selectReadOrUnread, toggleReadOrUnread } from '../redux/readOrUnread/slices';
import { useRouter } from 'next/router';

const Home = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const readBoolean = useSelector(selectReadOrUnread);

  const toggleReadBoolean = () => {
    dispatch(toggleReadOrUnread());
  }

  const handleNavigate = () => {
    router.push("/books/add");
    if (readBoolean === true) {
      dispatch(toggleReadOrUnread());
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.topContainer}>
        <div onClick={handleNavigate} className={styles.addBooks}>
          <MdAdd className={styles.addIcon} />
          <p className={styles.addBooksText}>Add some books to your reading list!</p>
        </div>
        <div className={styles.buttonContainer}>
          <button onClick={toggleReadBoolean} className={styles.toggleReadButton}>{readBoolean ? 'View list of unread books' : 'View list of finished books'}</button>
        </div>
      </div>
      <BooksList readBoolean={readBoolean} />
    </div>
  )
}

export default Home
