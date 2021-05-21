import React from 'react';
import { Route } from 'react-router';
import './App.css';
import Dialogs from './components/Dialogs/Dialogs';
import Header from './components/Header/Header';
import Music from './components/Music/Music';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import Settings from './components/Settings/Settings';
import News from './components/News/News';

const App = (props) => {
  return (
    <div className='app-wrapper'>
      <Header></Header>
      <Navbar></Navbar>
      <div className='app-wrapper-content'>
        <Route path='/dialogs' render={() => <Dialogs state={props.state.dialogsPage} dispatch={props.dispatch}></Dialogs>}></Route>
        <Route path='/profile' render={() => <Profile profilePage={props.state.profilePage} dispatch={props.dispatch}></Profile>}></Route>
        <Route path='/news' component={News}></Route>
        <Route path='/music' component={Music}></Route>
        <Route path='/settings' component={Settings}></Route>
      </div>
    </div>
  );
}

export default App;

// Route следит за URL и в зависимости от изменений URL, выполняет нужную компоненту.
// За изменение URL в браузере отвечает Navlink
// Route и Navlink не зависят друг от друга