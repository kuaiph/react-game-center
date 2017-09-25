import React, { Component } from 'react';
// import logo from './logo.svg';

import { Router,Route } from 'react-router-dom';

import Header from './components/Header/header';
import Footer from './components/Footer/footer';

import Home from './components/Home/home';
import Billboard from './components/Billboard/billboard';
import Category from './components/Category/category';
import Find from './components/Find/find';
import My from './components/My/my';

import createHistory from 'history/createBrowserHistory';
const history = createHistory();

class App extends Component {
  render() {
    return (
      <div>
        <Router history = {history}>
          <div>
            <Header/>
            <div className="container"> 
              <Route exact path="/" component = { Home }/>
              <Route path="/category" component = { Category }/>
              <Route path="/billboard" component = { Billboard }/>
              <Route path="/find" component = { Find }/>
              <Route path="/my" component = { My }/>
            </div>
            <Footer/>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;


// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <div className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h2>Welcome to React</h2>
//         </div>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//       </div>
//     );
//   }
// }

// export default App;