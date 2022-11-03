import { db } from '../firebase';
import { addDoc, collection } from 'firebase/firestore'
import { addBook } from '../redux/books/slices';

// kanske ta bort några argument som kan hämtas här
const handleAddBook = async (e, newBookState, dispatch, userUid, setBookAdded) => {
  e.stopPropagation();
  try {
    // const newBook = {
    //     title: newBookState.title,
    //     author: newBookState.author,
    //     read: false,
    //     review: '',
    //     rating: '',
    //     createdBy: userUid,
    //     // createdAt: serverTimestamp(),
    // }
    if(newBookState.title === ''){
      alert('Please provide a title.');
      return;
    }
    const newBook = {
      ...newBookState,
      read: false,
      review: '',
      rating: '',
      createdBy: userUid,
    }
    const docRef = await addDoc(collection(db, "Books"), newBook);
    // alert("Document written with ID: " + docRef.id);
    dispatch(addBook({ ...newBook, id: docRef.id }));
    // setNewBookState({
    //     title: '',
    //     author: '',
    // })
    setBookAdded(true);

  } catch (err) {
    alert(err);
  }
}

export { handleAddBook }