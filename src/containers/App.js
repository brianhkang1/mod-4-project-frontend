import React, { Component } from 'react';
import {Route} from 'react-router-dom'
import MainHeader from './MainHeader'
import Home from '../components/Home'
import About from '../components/About'
import AllRecipes from './AllRecipes'
import RecipeForm from '../components/RecipeForm'
import RecipeDetails from '../components/RecipeDetails'
import Login from '../components/Login'
import Signup from '../components/Signup'
import FoodGrid from './FoodGrid'

const USERS_URL = `http://localhost:3000/api/v1/users`
const RECIPES_URL = `http://localhost:3000/api/v1/recipes`
const PROFILE_URL = `http://localhost:3000/api/v1/profile`

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      recipeList: [],
      userList: [],
      signedInUser: null
    }
  }

  fetchAllUsers = () => {
    return fetch(USERS_URL)
      .then(res => res.json())
      .then(data => this.setState({
        userList: data
      }))
  }

  fetchAllRecipes = () => {
    fetch(RECIPES_URL)
    .then(res => res.json())
    .then(data => this.setState({
      recipeList: data
    }))
  }

  componentDidMount(){
    this.fetchAllRecipes()
    this.fetchAllUsers()

    //check if token is stored in localStorage to see if there was a previous user signed in
    let token = localStorage.getItem('token')
    if(token){
      this.fetchSignedInUser()
    }
  }

  fetchSignedInUser = () => {
    //if token is present, fetch the signed in user through profile backend API
    fetch(PROFILE_URL, {
      headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}
    }).then(res => res.json())
    .then(json => {this.setState({signedInUser: json.user})})
  }

  signInUser = (userInfo, routerProps) => {
    //when logging in
    if(userInfo){
      this.setState({
        signedInUser: userInfo
      }, routerProps.history.push('/recipes'))
    } else {
      alert("Incorrect username or password")
    }
  }

  logout = (routerProps) => {
    //when logging out 
    localStorage.clear()
    this.setState({signedInUser: null})
    routerProps.history.push('/')
  }

  render() {
    return (
      <React.Fragment>
        <Route path="/" render={(props) => <MainHeader signedInUser={this.state.signedInUser} logout={this.logout} router={props}/>} />
        <Route exact path="/" render={() => <Home />} />
        <Route exact path="/about" render={() => <About/>} />
        <Route exact path="/recipes" render={() => <FoodGrid recipeList={this.state.recipeList} userList={this.state.userList}/>}  />
        {this.state.signedInUser ? <Route exact path="/saved_recipes" render={() => <AllRecipes recipeList={this.state.signedInUser.recipes} userList={this.state.userList}/>}/> : null}
        <Route exact path="/recipes_form" render={(props) => <RecipeForm signedInUser={this.state.signedInUser} fetchAllRecipes={this.fetchAllRecipes} router={props}/>} />
        <Route exact path="/recipes/:id" render={(props) => {
          let recipeId = parseInt(props.match.params.id)
          return <RecipeDetails recipeId={recipeId} userList={this.state.userList} signedInUser={this.state.signedInUser} fetchSignedInUser={this.fetchSignedInUser} router={props}/>}} />
        <Route exact path="/login" render={(props) => <Login signInUser={this.signInUser} router={props}/>} />
        <Route exact path="/signup" render={(props) => <Signup signInUser={this.signInUser} fetchAllUsers={this.fetchAllUsers} router={props}/>} />
      </React.Fragment>
    );
  }
}

export default App;
