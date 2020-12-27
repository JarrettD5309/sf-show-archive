import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Timeline from './pages/Timeline';
import TimelinePage from './pages/TimelinePage';

function App() {
  return (
    <Router>
      <Route exact path='/' component={HomePage} />
      <Route exact path='/timeline' component={Timeline} />
      <Route exact path='/timeline-page' component={TimelinePage} />
    </Router>
  );
}

export default App;
