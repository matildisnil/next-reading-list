import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { addBook } from '../redux/books/slices';
import { db } from '../firebase';
import styles from '../styles/AddBook.module.css'

const AddBook = () => {
    const dispatch = useDispatch();
    const [isActive, setIsActive] = useState(false);
    // const [title, setTitle] = useState('');
    // const [author, setAuthor] = useState('');
    const userUid = useSelector((state) => state)?.user?.user?.uid;

    const [newBookState, setNewBookState] = useState({
        title: '',
        author: '',
    });

    const handleChange = e => {
        setNewBookState(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }


    const handleSubmit = async () => {

        try {
            const newBook = {
                title: newBookState.title,
                author: newBookState.author,
                read: false,
                createdBy: userUid,
                // createdAt: serverTimestamp(),
            }
            const docRef = await addDoc(collection(db, "Books"), newBook);
            // alert("Document written with ID: " + docRef.id);
            dispatch(addBook({ ...newBook, id: docRef.id }));
            setTitle('');
            setAuthor('');
        } catch (err) {
            alert(err);
        }
    }

    const toggleIsActive = () => {
        setIsActive(prev => !prev);
    }

    return (
        <div className={styles.container}>
            {isActive ?
                <div className={styles.activeContainer}>
                    <h2>Add book</h2>
                    <input
                        onChange={handleChange}
                        type="text"
                        value={newBookState.title}
                        placeholder="Title"
                        name="title"
                        className={styles.inputElement}
                    />
                    <input
                        onChange={handleChange}
                        type="text"
                        value={newBookState.author}
                        placeholder="Author"
                        name="author"
                        className={styles.inputElement}
                    />
                    <button onClick={handleSubmit} className={styles.button}>
                        Add book
                    </button>
                </div>
                :
                <div style={styles.passiveContainer}>
                    <button onClick={toggleIsActive}>Add a book to the list</button>
                </div>
            }
        </div>

    )
}

export default AddBook
