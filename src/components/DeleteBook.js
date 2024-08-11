import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
 import { fetchAuthSession } from 'aws-amplify/auth';
// import { Auth } from 'aws-amplify';
// import { withAuthenticator } from '@aws-amplify/ui-react';

const DeleteBook = () => {
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
       const authToken = (await fetchAuthSession()).tokens?.idToken?.toString();
      
      const response = await axios.delete(`https://zm5hn00d66.execute-api.us-east-1.amazonaws.com/stage1/book/${id}`, {
        headers: {
          'Content-Type':'application/json',
        'Authorization': authToken
      }
      });
      console.log(response.data)
      navigate('/');
    } catch (error) {
      setError('Failed to delete book. Please try again.');
      console.error('Error deleting book:', error);
    }
  };

  return (
    <div>
      <h2>Delete Book</h2>
      {error && <p style={{color: 'red'}}>{error}</p>}
      <p>Are you sure you want to delete this book?</p>
      <button onClick={handleDelete}>Yes, Delete</button>
      <button onClick={() => navigate('/')}>Cancel</button>
    </div>
  );
};

export default DeleteBook;