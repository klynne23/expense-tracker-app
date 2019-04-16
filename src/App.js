import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from "./components/Nav";
import NoMatch from './pages/NoMatch';
import Main from './pages/Main';

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path='/' component={Main} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  )
}

export default App;