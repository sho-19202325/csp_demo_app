import React from 'react';
import './App.css';
import IndexPosts from './pages/posts'
import { Helmet } from 'react-helmet-async';

function App() {
  return (
    <>
      <Helmet>
        <meta
          httpEquiv="Content-Security-Policy"
          content="script-src 'self'; img-src 'self'; connect-src http://localhost:3001" />
      </Helmet>
      <div className="App">
        <IndexPosts />
      </div>
    </>
  );
}

export default App;
