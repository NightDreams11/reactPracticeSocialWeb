import React from 'react';
import { Route } from 'react-router';
import './App.css';
import HeaderContainer from './components/Header/HeaderContainer';
import Music from './components/Music/Music';
import Navbar from './components/Navbar/Navbar';
import ProfileContainer from './components/Profile/ProfileContainer';
import Settings from './components/Settings/Settings';
import News from './components/News/News';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/Users/UsersContainer';
import LoginPage from './components/Login/Login';
import { connect } from 'react-redux';
import { initializeApp } from '../src/redux/app-reducer';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import Preloader from './components/common/Preloader/Preloader';

class App extends React.Component {

  componentDidMount() {
    this.props.initializeApp();
  }

  render() {

    if (!this.props.initialized) {
      return <Preloader></Preloader>
    }

    return (
          <div className='app-wrapper' >
            <HeaderContainer></HeaderContainer>
            <Navbar></Navbar>
            <div className='app-wrapper-content'>
              <Route path='/dialogs' render={() => <DialogsContainer></DialogsContainer>}></Route>
              <Route path='/profile/:userId?' render={() => <ProfileContainer></ProfileContainer>}></Route>
              <Route path='/users' render={() => <UsersContainer></UsersContainer>}></Route>
              <Route path='/login' render={() => <LoginPage></LoginPage>}></Route>
              <Route path='/news' component={News}></Route>
              <Route path='/music' component={Music}></Route>
              <Route path='/settings' component={Settings}></Route>
            </div>
          </div>

    )
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized
})

export default compose(
  withRouter,
  connect(mapStateToProps, { initializeApp }))(App);

// Route следит за URL и в зависимости от изменений URL, выполняет нужную компоненту.
// За изменение URL в браузере отвечает Navlink
// Route и Navlink не зависят друг от друга