import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchAuthSession } from 'aws-amplify/auth';
// import { Auth } from 'aws-amplify';
// import { withAuthenticator } from '@aws-amplify/ui-react';

const UpdateBook = () => {
  const [book, setBook] = useState({ id: '', title: '', author: '', year: '' });
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      try {
         const authToken = (await fetchAuthSession()).tokens?.idToken?.toString();
        // const session = await Auth.currentSession();
        //   const authToken = session.getIdToken().getJwtToken();

        const response = await axios.get(`https://zm5hn00d66.execute-api.us-east-1.amazonaws.com/stage1/book/${id}`, {
          headers: { 'Authorization': authToken }
        });
        
        const parsedBook = JSON.parse(response.data.body)
   //console.log(parsedBook)
       setBook(parsedBook);
      } catch (error) {
        setError('Failed to fetch book data. Please try again.');
        console.error('Error fetching book:', error);
      }
    };

    fetchBook();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook(prevBook => ({ ...prevBook, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       const authToken = (await fetchAuthSession()).tokens?.idToken?.toString();
      // const session = await Auth.currentSession();
      //     const authToken = session.getIdToken().getJwtToken();
      console.log('Sending update request with data:', {
        id: book.id,
        title: book.title,
        author: book.author,
        year: book.year
      });
      const bodyData = {
        id: book.id,
        title: book.title,
        author: book.author,
        year: book.year
      };
      const response = await axios.put(
        'https://zm5hn00d66.execute-api.us-east-1.amazonaws.com/stage1/books',
        bodyData,
        {
          headers: {
            'Authorization': authToken,
            'Content-Type': 'application/json'
          }
        }
      );
      
      console.log(response.data);
      navigate('/');
    } catch (error) {
      setError('Failed to update book. Please try again.');
      console.error('Error updating book:', error);
    }
  };

  return (
    <div>
      <h2>Update Book</h2>
      {error && <p style={{color: 'red'}}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={book.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            name="author"
            value={book.author}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="year">Year:</label>
          <input
            type="text"
            id="year"
            name="year"
            value={book.year}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Update Book</button>
        <button type="button" onClick={() => navigate('/')}>Cancel</button>
      </form>
    </div>
  );
};

export default UpdateBook;