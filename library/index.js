import { db } from '../firebase';
import { addDoc, collection } from 'firebase/firestore'
import { addBook } from '../redux/books/slices';

// kanske ta bort några argument som kan hämtas här
const handleAddBook = async (e, newBookState, dispatch, userUid) => {
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
    const newBook = {
      ...newBookState,
      read: false,
      review: '',
      rating: '',
      createdBy: userUid,
      createdAt: new Date(),
    }
    const docRef = await addDoc(collection(db, "Books"), newBook);
    // alert("Document written with ID: " + docRef.id);
    dispatch(addBook({ ...newBook, createdAt: newBook.createdAt.toString() ,id: docRef.id }));
    // setNewBookState({
    //     title: '',
    //     author: '',
    // })

  } catch (err) {
    alert(err);
  }
}

export { handleAddBook }