import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { selectSearchResultBookState } from '../../../redux/searchResultBooks/slices';
import { selectUser } from '../../../redux/login/slices';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../../../styles/SearchBooksId.module.css'
import { MdArrowBack } from 'react-icons/md'
import BookDetails from '../../../components/BookDetails';
import { handleAddBook } from '../../../library';


const SearchBook = () => {
  // måste hitta ett effektivare sätt att få fram en bok
  const books = useSelector(selectSearchResultBookState);
  const router = useRouter();
  const book = books.find(b => b.googlebooks_id === router.query.id);

  const dispatch = useDispatch();
  const userUid = useSelector(selectUser)?.uid;
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
          <Link className={styles.backLink} href="/books/add"><MdArrowBack className="backIcon" /></Link>
          {bookAdded ? <div>Book added</div> : <button className={styles.addBookButton} onClick={addBook}>Add book</button>}
        </div>
      </div>
    </div>
  )
}



export default SearchBook