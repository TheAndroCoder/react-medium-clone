import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import './index.css';
import App from './App';
import Home from './components/Home'
import Post from './components/Post'
import Search from './components/Search'
import ReadPost from './components/ReadPost'
import WritePost from './components/WritePost'

ReactDOM.render(
  <Router>
    <div>
      <Switch>
        <Route path="/" exact component={App}/>
        <Route path="/home" component={Home}/>
        <Route path="/search" component={Search}/>
        <Route path="/post/:id" component={ReadPost}/>
        <Route path="/write" component={WritePost}/>
      </Switch>
    </div>
  </Router>,
  document.getElementById('root')
);
