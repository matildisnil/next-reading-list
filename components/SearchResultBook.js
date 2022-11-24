import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../redux/login/slices';
import { toggleAddedToTrue } from '../redux/searchResultBooks/slices';
import styles from '../styles/SearchResultBook.module.css'
import Image from 'next/image';
import { handleAddBook } from '../library';
import { useRouter } from 'next/router';
import { GiBookCover } from 'react-icons/gi'

const SearchResultBook = ({ book }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const userUid = useSelector(selectUser)?.uid;

  const handleNavigate = (e) => {
    e.stopPropagation();
    router.push(`/books/add/${book.googlebooks_id}`);
  }

  const addBook = e => {
    handleAddBook(e, book, dispatch, userUid);
    dispatch(toggleAddedToTrue(book.googlebooks_id));
  }

  return (
    <>
      {book && <div className={styles.bookContainer} onClick={handleNavigate}>
        {book.smallThumbnailLink ?
          <Image src={book.smallThumbnailLink} width="128" height="200" alt={`The book ${book.title}`} className={styles.image} />
          :
          <div className={styles.imageReplacer}>
            <GiBookCover className={styles.bookIcon} />
          </div>
        }
        <div className={styles.textAndButtonContainer}>
          <div className={styles.textContainer}>
            <p className={styles.titleText}>{book.title}</p>
            <p className={styles.authorText}>{book.author}</p>
            {book.description && <p className={styles.descriptionText}>{book.description}</p>}
          </div>
          {book.added ? <div className={styles.addedText}>Book added</div> : <button onClick={(e) => addBook(e)} className={styles.addBookButton}>Add book</button>}
        </div>
      </div>}
    </>
  )
}

export default SearchResultBook