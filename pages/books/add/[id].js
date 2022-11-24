import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { selectSearchResultOneBookState, toggleAddedToTrue } from '../../../redux/searchResultBooks/slices';
import { selectUser } from '../../../redux/login/slices';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '../../../styles/SearchBooksId.module.css'
import { MdArrowBack } from 'react-icons/md'
import BookDetails from '../../../components/BookDetails';
import { handleAddBook } from '../../../library';

const SearchBook = () => {
  const [fallbackBook, setFallbackBook] = useState(null);
  const router = useRouter();
  const book = useSelector(state => selectSearchResultOneBookState(state, router.query.id));

  const fetchFallbackBook = async () => {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${router.query.id}`);
    const parsedResponse = await response.json();
    const newBook = {
      title: parsedResponse.volumeInfo.title,
      author: parsedResponse.volumeInfo.authors?.join(', ') || '',
      pages: parsedResponse.volumeInfo.pageCount || '',
      published: parsedResponse.volumeInfo.publishedDate || '',
      description: parsedResponse.volumeInfo?.description || '',
      smallThumbnailLink: parsedResponse.volumeInfo?.imageLinks?.smallThumbnail || '',
      thumbnailLink: parsedResponse.volumeInfo?.imageLinks?.thumbnail || '',
      googlebooks_id: parsedResponse.id,
      added: false,
    }
    setFallbackBook(newBook);
  }

  useEffect(() => {
    if (!book) {
      fetchFallbackBook();
    }
  }, [])

  const dispatch = useDispatch();
  const userUid = useSelector(selectUser)?.uid;

  const addBook = e => {
    handleAddBook(e, book || fallbackBook, dispatch, userUid);
    if (book) {
      dispatch(toggleAddedToTrue(router.query.id));
    } else {
      setFallbackBook(prev => {
        return { ...prev, added: true }
      }
      )
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.detailsContainer}>
        {(book || fallbackBook) && <BookDetails book={book || fallbackBook} />}
        <div className={styles.clickablesContainer}>
          <Link className={styles.backLink} href="/books/add"><MdArrowBack className="backIcon" /></Link>
          {(book?.added || fallbackBook?.added) ? <div>Book added</div> : <button className={styles.addBookButton} onClick={addBook}>Add book</button>}
        </div>
      </div>
    </div>
  )
}

export default SearchBook