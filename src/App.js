import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './pages/Landing.js';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Landing}/>
      </Switch>
    </Router>
  )
}

export default App;
