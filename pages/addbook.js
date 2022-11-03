import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { addBook } from '../redux/books/slices';
import { db } from '../firebase';
import styles from '../styles/AddBook.module.css'
import SearchResultBook from '../components/SearchResultBook';
import { handleAddBook } from '../library';
import { addSearchResultBooks } from '../redux/searchResultBooks/slices';
import { MdArrowBack } from 'react-icons/md'
import Link from 'next/link';

const AddBook = () => {
    const dispatch = useDispatch();
    // const [title, setTitle] = useState('');
    // const [author, setAuthor] = useState('');
    const userUid = useSelector((state) => state)?.user?.user?.uid;
    // const [searchResults, setSearchResults] = useState(null);
    const searchResults = useSelector((state) => state)?.searchResultBooks;
    const [manualAddIsActive, setManualAddIsActive] = useState(false);
    const [bookAdded, setBookAdded] = useState(false);

    const [newBookState, setNewBookState] = useState({
        title: '',
        author: '',
        pages: '',
        published: '',
        description: '',
    });
    const [searchValue, setSearchValue] = useState('');

    const handleChange = e => {
        setNewBookState(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }


    // const handleAddBook = async () => {
    //     try {
    //         const newBook = {
    //             title: newBookState.title,
    //             author: newBookState.author,
    //             read: false,
    //             review: '',
    //             rating: '',
    //             createdBy: userUid,
    //             // createdAt: serverTimestamp(),
    //         }
    //         const docRef = await addDoc(collection(db, "Books"), newBook);
    //         // alert("Document written with ID: " + docRef.id);
    //         dispatch(addBook({ ...newBook, id: docRef.id }));
    //         setNewBookState({
    //             title: '',
    //             author: '',
    //         })

    //     } catch (err) {
    //         alert(err);
    //     }
    // }

    const handleSearch = async (e) => {
        setSearchValue(e.target.value);
    }

    const submitSearch = async () => {
        console.log('am i getting here?')
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchValue}`)
        console.log('am i getting here too?')
        const parsedResponse = await response.json();
    

        // setSearchResults(parsedResponse.items);
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
            }
        })
        dispatch(addSearchResultBooks(formattedBooks));
    }

    const toggleManualAddIsActive = () => {
        setManualAddIsActive(prev => !prev);
    }

    return (
        <div className={styles.container}>
            <Link href="/"><MdArrowBack className="backIcon" /></Link>

            <div className={styles.activeContainer}>
                <h2>Add book</h2>
                <input
                    onChange={handleSearch}
                    type="text"
                    value={searchValue}
                    placeholder="Search"
                    name="search"
                    className={styles.inputElement}
                />
                <button onClick={submitSearch} type="button" className={styles.button}>
                    Search google books
                </button>
                <p>Didn&apos;t find what you were looking for?</p><button onClick={toggleManualAddIsActive}>Add manually</button>
                {manualAddIsActive && (<div>
                    <input
                        onChange={handleChange}
                        type="text"
                        value={newBookState.title}
                        placeholder="Title"
                        name="title"
                        className={styles.inputElement}
                        required
                    />
                    <input
                        onChange={handleChange}
                        type="text"
                        value={newBookState.author}
                        placeholder="Author"
                        name="author"
                        className={styles.inputElement}
                        required
                    />
                    <input
                        onChange={handleChange}
                        type="text"
                        value={newBookState.pages}
                        placeholder="Pages"
                        name="pages"
                        className={styles.inputElement}
                    />
                    <input
                        onChange={handleChange}
                        type="text"
                        value={newBookState.published}
                        placeholder="Published"
                        name="published"
                        className={styles.inputElement}
                    />
                    <input
                        onChange={handleChange}
                        type="text"
                        value={newBookState.description}
                        placeholder="description"
                        name="description"
                        className={styles.inputElement}
                    />

                    <button onClick={(e) => handleAddBook(e, newBookState, dispatch, userUid, setBookAdded)} className={styles.button}>
                        Add book
                    </button>
                </div>)}
                {searchResults.length !== 0 && searchResults.map(book => <SearchResultBook key={book.googlebooks_id} bookId={book.googlebooks_id} />)}
            </div>
        </div>

    )
}

export default AddBook
