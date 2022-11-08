import React from 'react'
import Image from 'next/image'
import styles from '../styles/BookDetails.module.css'

const BookDetails = ({ book }) => {

  return (
    <div className={styles.detailsContainer}>
      <div className={styles.bookPage__upperDetails}>
        {book?.thumbnailLink &&
          <Image src={book.thumbnailLink} width={128} height={200} alt={`The book ${book.title}`} />

        }

        <div className={styles.bookPage__detailsShortText}>
          <h2>{book.title}</h2>
          <p>Author: {book.author}</p>
          <p>Pages: {book.pages}</p>
          <p>Published: {book.published}</p>
        </div>
      </div>
      <p className={styles.description}>{book.description}</p>
    </div>
  )
}

export default BookDetails