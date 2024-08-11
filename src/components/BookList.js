import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
//import { Auth } from 'aws-amplify';

import { fetchAuthSession } from 'aws-amplify/auth'
//import { withAuthenticator } from '@aws-amplify/ui-react';

const BookList =  ({user}) => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  
 // console.log("BookList user:", user);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        
        if (user )
        {
          const authToken = (await fetchAuthSession()).tokens?.idToken?.toString();

         // console.log("Token:", authToken);
        
        const response = await axios.get('https://zm5hn00d66.execute-api.us-east-1.amazonaws.com/stage1/books', {
          headers: {
            
            'Authorization': authToken
          }
        });
        // const session = await Auth.currentSession();
        //   const authToken = session.getIdToken().getJwtToken();

        //   const response = await axios.get('https://zm5hn00d66.execute-api.us-east-1.amazonaws.com/stage1/books', {
        //     headers: {
        //       'Authorization': authToken
        //     }
        //   });

        // console.log(response.data.body)
   const parsedBooks = JSON.parse(response.data.body)
   //console.log(parsedBooks)
       setBooks(parsedBooks);

      }else{
        throw new Error (" user is not authenticated")
      }
      } catch (error) {
        console.error("There was an error fetching the books!", error);
        setError("Failed to load books. Please try again later.");
      }
    };

    fetchBooks();
  }, [user]);

  return (
    <div>
    <h2>Book List</h2>
    <ul>
      {books.map(book => {
        return (
        <li key={book.id}>
          {book.title} - {book.author} - {book.year}
          <Link to={`/book/${book.id}`}>
            <button>Detail</button>
          </Link>
          <Link to={`/updatebook/${book.id}`}>
            <button>Update</button>
          </Link>
          <Link to={`/deletebook/${book.id}`}>
            <button>Delete</button>
          </Link>
        </li>
      )
      })}
    </ul>
  </div>
  );
};

export default BookList;
