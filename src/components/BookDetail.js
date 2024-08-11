import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { fetchAuthSession } from 'aws-amplify/auth';
//import { Auth, Storage } from 'aws-amplify';

const BookDetail = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [error, setError] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                if (id) {
                    const authToken = (await fetchAuthSession()).tokens?.idToken?.toString();
                    const response = await axios.get(`https://zm5hn00d66.execute-api.us-east-1.amazonaws.com/stage1/book/${id}`, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': authToken
                        }
                    });
                     // this code is valid for Auth
                    // const session = await Auth.currentSession();
                    // const authToken = session.getIdToken().getJwtToken();
                    // const response = await axios.get(`https://zm5hn00d66.execute-api.us-east-1.amazonaws.com/stage1/book/${id}`, {
                    //     headers: {
                    //         'Content-Type': 'application/json',
                    //         'Authorization': authToken
                    //     }
                    // });
                    const parsedBook = JSON.parse(response.data.body);
                    setBook(parsedBook);
                    setImageUrl(parsedBook.imageUrl)
                    // if (parsedBook.imageUrl) {
                    //   try {
                    //     const signedURL = await Storage.get(parsedBook.imageUrl, { expires: 60 });
                    //     setImageUrl(signedURL);
                    // } catch (imageError) {
                    //     console.error("Error fetching image URL:", imageError);
                    //     setError("Failed to load book image.");
                    // }
                    // }
                }
            } catch (error) {
                console.error("There was an error fetching the book!", error);
                setError("Failed to load book. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        
        fetchBook();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <p>Error: {error}</p>;
    if (!book) return <div>No book found</div>;

    return (
        <div>
            <h2>{book.title}</h2>
            <p>Author: {book.author}</p>
            <p>Year: {book.year}</p>
            {book.imageUrl && (
                <div>
                    <h3>Book Cover:</h3>
                    <img 
                        src={imageUrl} 
                        alt={`Cover of ${book.title}`}
                        style={{ maxWidth: '300px', height: 'auto' }}
                        
                    />
                </div>
            )}
        </div>
    );
};

export default BookDetail;