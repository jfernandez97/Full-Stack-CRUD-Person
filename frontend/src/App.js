
import './App.css';
import FooterComponent from './components/FooterComponent';
import HeaderComponent from './components/HeaderComponent';
import ListPersonComponent from './components/ListPersonComponent';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Router>
        <HeaderComponent/>
        <div className='container'>
          <Routes>
            <Route path='/' exact Component={ListPersonComponent}></Route>
            <Route path='/persons' Component={ListPersonComponent}></Route>
          </Routes>
        </div>
        <FooterComponent/>
      </Router>
    </div>
  );
}

export default App;
