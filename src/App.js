import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import Episode from './pages/Episode';
import NavBar from './components/NavBar';
import Season from './pages/Season';
import Character from './pages/Character';
import Search from './pages/Search';
import NotFound from './pages/NotFound';





function App() {

    return (
      <div >
        <Router>
        <NavBar/>
        <Switch>
          <Route exact path='/' component={Home} />
          {/* <Route exact path='/breakingbad' component={BreakingBad} />
          <Route exact path='/bettercallsaul' component={BetterCall} /> */}
          <Route path='/breakingbad/season/:id' component={Season} />
          <Route path='/bettercallsaul/season/:id' component={Season} />
          <Route path='/episodes/:id' component={Episode} />
          <Route path='/characters/:id' component={Character} />
          <Route path='/search' component={Search} />
          <Route component={NotFound} />

        </Switch>
        <ToastContainer />

        </Router>
      </div>
    );

}

export default App;
