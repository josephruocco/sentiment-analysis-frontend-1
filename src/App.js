import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/NavBar.js';
import Landing from './pages/Landing.js';
import About from './pages/About.js';

function App() {
  return (
    <Router>
      <Navbar/>
      <Switch>
        <Route exact path="/" component={Landing}/>
        <Route exact path="/about" component={About}/>
      </Switch>
    </Router>
  )
}

export default App;
