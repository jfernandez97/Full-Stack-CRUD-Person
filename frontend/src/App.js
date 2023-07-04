
import './App.css';
import AddUpdatePersonComponent from './components/AddUpdatePersonComponent';
import FooterComponent from './components/FooterComponent';
import HeaderComponent from './components/HeaderComponent';
import ListPersonComponent from './components/ListPersonComponent';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Router>
        <HeaderComponent />
        <div className='container'>
          <Routes>
            <Route path='/' exact Component={ListPersonComponent}></Route>
            <Route path='/persons' Component={ListPersonComponent}></Route>
            <Route path='/add-person' Component={AddUpdatePersonComponent}></Route>
            <Route path='/update-person/:id' Component={AddUpdatePersonComponent}></Route>
          </Routes>
        </div>
        <FooterComponent />
      </Router>
    </div>
  );
}

export default App;
