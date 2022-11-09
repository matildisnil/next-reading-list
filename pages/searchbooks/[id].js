import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../../styles/SearchBooksId.module.css'
import { MdArrowBack } from 'react-icons/md'
import BookDetails from '../../components/BookDetails';
import { handleAddBook } from '../../library';


const SearchBook = () => {
  const books = useSelector(state => state).searchResultBooks;
  const router = useRouter();
  const book = books.find(b => b.googlebooks_id === router.query.id);

  const dispatch = useDispatch();
  const userUid = useSelector((state) => state)?.user?.user?.uid;
  const [bookAdded, setBookAdded] = useState(false);

  const addBook = e => {
    handleAddBook(e, book, dispatch, userUid);
    setBookAdded(true);
  }

  return (
    <div className={styles.container}>
      <div className={styles.detailsContainer}>
        {book && <BookDetails book={book} />}
        <div className={styles.clickablesContainer}>
          <Link className={styles.backLink} href="/addbook"><MdArrowBack className="backIcon" /></Link>
          {bookAdded ? <div>Book added</div> : <button className={styles.addBookButton} onClick={addBook}>Add book</button>}
        </div>
      </div>
    </div>
  )
}



export default SearchBook