import logo from './logo.svg';
import './App.css';
import Header from './component/Header/Header';
import Menubar from './component/Menubar/Menubar';
import HomeContainer from './component/Home-container/Home-container';
import Footer from './component/Footer/Footer';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {NotificationContainer, NotificationManager} from 'react-notifications';
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import CountdownTimer from './component/Count/count';

function App() {
  return (
    <div className='content'>
        <Header/>
        <CountdownTimer/>
        <HomeContainer/>
        <Menubar/>
        <Footer />
        <NotificationContainer/>
    </div>
  );
}

export default App;
