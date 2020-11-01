import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Timeline from './pages/Timeline';

function App() {
  return (
    <Router>
      <Route exact path='/' component={HomePage} />
      <Route exact path='/timeline' component={Timeline} />
    </Router>
  );
}

export default App;
