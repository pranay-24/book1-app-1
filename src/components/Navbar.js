import React from 'react';
import { Link , Navigate, BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const Navbar = ({ appName, onSignOut }) => {
  return (
    <nav style={styles.navbar}>
      <Link to="/">
      <div style={styles.appName}>{appName}</div>
      </Link>
      
      <button style={styles.signOutButton} onClick={onSignOut}>
        Sign Out
      </button>
    </nav>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',

    color: 'black',
  },
  appName: {
    fontSize: '24px',
    fontWeight: 'bold',
  },
  signOutButton: {
    padding: '10px 20px',
    backgroundColor: '#f00',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default Navbar;
