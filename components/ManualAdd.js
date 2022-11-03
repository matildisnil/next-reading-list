import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { handleAddBook } from '../library';
import styles from '../styles/ManualAdd.module.css'

const ManualAdd = () => {
  const dispatch = useDispatch();
  const userUid = useSelector((state) => state)?.user?.user?.uid;



  const [bookAdded, setBookAdded] = useState(false);


  const [newBookState, setNewBookState] = useState({
    title: '',
    author: '',
    pages: '',
    published: '',
    description: '',
  });

  const handleChange = e => {
    setNewBookState(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }


  return (
    <div className={styles.container}>
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

      <button onClick={(e) => handleAddBook(e, newBookState, dispatch, userUid, setBookAdded)} className={styles.manualAddButton}>
        Add book
      </button>
    </div>)
}


export default ManualAdd