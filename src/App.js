import React, { useState, useEffect } from 'react';
import { Link , Navigate, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Amplify } from 'aws-amplify';
import { Auth } from '@aws-amplify/auth';
import { withAuthenticator } from '@aws-amplify/ui-react';
import BookList from './components/BookList';
import BookDetail from './components/BookDetail';
import Navbar from './components/Navbar';
import CreateBook from './components/CreateBook'
import UpdateBook from './components/UpdateBook'
import DeleteBook from './components/DeleteBook'

import config from './aws-exports'
Amplify.configure(config);

const App = ({ signOut, user }) => {
  //console.log("App user:", user);
  return (
    <Router>
      <div className="App">
       
        <Navbar appName="MyBookApp" onSignOut={signOut}/>
        {user && <h4>Hello {user.username}</h4>}
        <Link to="/addbook">
      <button>Add Book</button>
    </Link>
        <Routes>
          
          <Route path="/" element={ <BookList user={user} />}  />
          <Route path="/book/:id" element={<BookDetail />} />
          <Route path="/addbook" element={ <CreateBook user={user} />}  />
          <Route path="/updatebook/:id" element={ <UpdateBook user={user} />}  />
          <Route path="/deletebook/:id" element={<DeleteBook  user={user} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default withAuthenticator(App);
