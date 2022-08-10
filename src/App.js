import React from "react"
import { Route } from "react-router"
import "./App.css"
import HeaderContainer from "./components/Header/HeaderContainer"
import Music from "./components/Music/Music"
import Navbar from "./components/Navbar/Navbar"
import Settings from "./components/Settings/Settings"
import News from "./components/News/News"
import UsersContainer from "./components/Users/UsersContainer"
import LoginPage from "./components/Login/Login"
import { connect } from "react-redux"
import { initializeApp } from "../src/redux/app-reducer"
import { Redirect, Switch, withRouter } from "react-router-dom"
import { compose } from "redux"
import Preloader from "./components/common/Preloader/Preloader"
import store from "./redux/redux-store"
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import { withSuspense } from "./hoc/withSuspense"

// import DialogsContainer from './components/Dialogs/DialogsContainer';
// import ProfileContainer from './components/Profile/ProfileContainer';
const DialogsContainer = React.lazy(() =>
  import("./components/Dialogs/DialogsContainer")
)
const ProfileContainer = React.lazy(() =>
  import("./components/Profile/ProfileContainer")
)

class App extends React.Component {
  componentDidMount() {
    this.props.initializeApp()
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />
    }

    return (
      <div className="app-wrapper">
        <HeaderContainer></HeaderContainer>
        <Navbar></Navbar>
        <div className="app-wrapper-content">
          <Switch>
            <Route
              exact
              path="/"
              render={() => <Redirect to={"/profile"}></Redirect>}
            ></Route>
            <Route
              path="/dialogs"
              render={withSuspense(DialogsContainer)}
            ></Route>
            <Route
              path="/profile/:userId?"
              render={withSuspense(ProfileContainer)}
            ></Route>
            <Route
              path="/users"
              render={() => <UsersContainer pageTitle={"Самураи"} />}
            />
            <Route path="/login" render={() => <LoginPage></LoginPage>}></Route>
            <Route path="*" render={() => <div>404 NOT FOUND</div>}></Route>
            <Route path="/news" component={News}></Route>
            <Route path="/music" component={Music}></Route>
            <Route path="/settings" component={Settings}></Route>
          </Switch>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized,
})

let AppContainer = compose(
  withRouter,
  connect(mapStateToProps, { initializeApp })
)(App)

const SamuraiJSApp = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </BrowserRouter>
  )
}

export default SamuraiJSApp
// Route следит за URL и в зависимости от изменений URL, выполняет нужную компоненту.
// За изменение URL в браузере отвечает Navlink
// Route и Navlink не зависят друг от друга
