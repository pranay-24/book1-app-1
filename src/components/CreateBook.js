import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { fetchAuthSession } from 'aws-amplify/auth';
// import { Auth } from 'aws-amplify';
// import { withAuthenticator } from '@aws-amplify/ui-react';

const CreateBook = () => {
  const [book, setBook] = useState({ title: '', author: '', year: '' });
  const [error, setError] = useState(null);
  const [image, setImage] = useState(null);

  const navigate = useNavigate();
  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result.split(',')[1]);  // Get the base64 part
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     const authToken = (await fetchAuthSession()).tokens?.idToken?.toString();
      // const session = await Auth.currentSession();
      //     const authToken = session.getIdToken().getJwtToken();
      const response = await axios.post('https://zm5hn00d66.execute-api.us-east-1.amazonaws.com/stage1/books', 
        { ...book, image },
        {
          headers: {
            'Authorization': authToken
          }
        }
      );
      console.log(response.data)
      navigate('/'); // Redirect to book list 
    } catch (error) {
      setError('Failed to create book. Please try again.');
      console.error('Error creating book:', error);
    }
  };

  return (
    <div>
      <h2>Create New Book</h2>
      {error && <p style={{color: 'red'}}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" name="title" value={book.title} onChange={handleChange} required />
        </div>
        <div>
          <label>Author:</label>
          <input type="text" name="author" value={book.author} onChange={handleChange} required />
        </div>
        <div>
          <label>Year:</label>
          <input type="text" name="year" value={book.year} onChange={handleChange} required />
        </div>
        <div>
        <label>Image:</label>
        <input type="file" onChange={handleImageChange} accept="image/*" />
        </div>
        
        <button type="submit">Create Book</button>
      </form>
    </div>
  );
};

export default CreateBook;