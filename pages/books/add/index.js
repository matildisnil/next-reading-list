import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { selectSearchResultBooksState } from '../../../redux/searchResultBooks/slices';
import styles from '../../../styles/AddBook.module.css'
import SearchResultBook from '../../../components/SearchResultBook';
import { addSearchResultBooks } from '../../../redux/searchResultBooks/slices';
import { MdArrowBack } from 'react-icons/md'
import Link from 'next/link';
import ManualAdd from '../../../components/ManualAdd';

const AddBook = () => {
  const dispatch = useDispatch();
  const searchResults = useSelector(selectSearchResultBooksState);
  const [manualAddIsActive, setManualAddIsActive] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = async (e) => {
    setSearchValue(e.target.value);
  }

  const submitSearch = async e => {
    e.preventDefault();

    if (!searchValue) {
      alert('Please supply a search value');
      return
    }

    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchValue}`)
    const parsedResponse = await response.json();

    const formattedBooks = parsedResponse.items.map(book => {
      return {
        title: book.volumeInfo.title,
        author: book.volumeInfo.authors?.join(', ') || '',
        pages: book.volumeInfo.pageCount || '',
        published: book.volumeInfo.publishedDate || '',
        description: book.volumeInfo?.description || '',
        smallThumbnailLink: book.volumeInfo?.imageLinks?.smallThumbnail || '',
        thumbnailLink: book.volumeInfo?.imageLinks?.thumbnail || '',
        googlebooks_id: book.id,
        added: false,
      }
    })

    dispatch(addSearchResultBooks(formattedBooks));
  }

  const toggleManualAddIsActive = () => {
    setManualAddIsActive(prev => !prev);
  }

  return (
    <div className={styles.container}>
      <div className={styles.topContainer}>
        {!manualAddIsActive &&
          <form className={styles.googleSearchContainer} onSubmit={submitSearch}>
            <h2 className={styles.heading}>Add a book</h2>
            <input
              onChange={handleSearch}
              type="text"
              value={searchValue}
              placeholder="Search"
              name="search"
              className={styles.inputElement}
            />
            <button type="submit" className={styles.googleBooksButton} >Search on Google books</button>
            <p className={styles.notFoundText}>Didn&apos;t find what you were looking for?</p>
          </form>}
        {manualAddIsActive && <ManualAdd />}
        <button onClick={toggleManualAddIsActive} className={styles.manualAddButton}>
          {manualAddIsActive ? 'Add with Google books' : 'Add manually'}
        </button>
        <Link className={styles.backIconContainer} href="/">
          <MdArrowBack className="backIcon" />
          <p>Reading list</p>
        </Link>
      </div>
      <div className={styles.booklistContainer}>
        {searchResults.length !== 0 && searchResults.map(book => <SearchResultBook key={book.googlebooks_id} book={book} />)}
      </div>
    </div>
  )
}

export default AddBook
