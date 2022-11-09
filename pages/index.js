import React, { useState } from 'react';
import BooksList from '../components/BooksList';
import Link from 'next/link';
import { MdAdd } from 'react-icons/md';
import styles from '../styles/Home.module.css'

const UnReadBooks = () => {
  const [readBoolean, setReadBoolean] = useState(false)

  const toggleReadBoolean = () => {
    setReadBoolean(prev => !prev)
  }

  return (
    <div className={styles.extraContainer}>
      <div className={styles.container}>
        <div className={styles.topContainer}>
          <Link href="/addbook" className={styles.addBooks}>
            <MdAdd className={styles.addIcon} />
            <p className={styles.addBooksText}>Add some books to your reading list!</p>
          </Link>
          <div className={styles.buttonContainer}>
            <button onClick={toggleReadBoolean} className={styles.toggleReadButton}>{readBoolean ? 'View list of unread books' : 'View list of finished books'}</button>
          </div>
        </div>
        <BooksList readBoolean={readBoolean} />
      </div>
    </div>
  )
}

export default UnReadBooks
