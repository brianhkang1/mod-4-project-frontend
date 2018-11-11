import React, { Component } from 'react';
import {Route} from 'react-router-dom'
import MainHeader from './MainHeader'
import Home from '../components/Home'
import About from '../components/About'
import AllRecipes from './AllRecipes'
import AllSavedRecipes from './AllSavedRecipes'
import RecipeForm from '../components/RecipeForm'
import RecipeDetails from '../components/RecipeDetails'
import Login from '../components/Login'
import Signup from '../components/Signup'

class App extends Component {
  constructor(){
    super()
    this.state = {
      recipeList: [],
      userList: [],
      signedInUser: null
    }
  }

  fetchAllUsers = () => {
    return fetch(`http://localhost:3000/api/v1/users`)
      .then(res => res.json())
      .then(data => this.setState({
        userList: data
      }))
  }

  fetchAllRecipes = () => {
    fetch(`http://localhost:3000/api/v1/recipes`)
    .then(res => res.json())
    .then(data => this.setState({
      recipeList: data
    }))
  }

  componentDidMount(){
    this.fetchAllRecipes()
    this.fetchAllUsers()

    let token = localStorage.getItem('token')
    if(token){
      fetch(`http://localhost:3000/api/v1/profile`, {
        headers: {
          "Authorization" : `Bearer ${token}`
        }
      }).then(res => res.json())
      .then(json => {
        this.setState({
          signedInUser: json.user
        })
      })
    }

  }

  signInUser = (userInfo, routerProps) => {
    if(userInfo){
      this.setState({
        signedInUser: userInfo
      }, routerProps.history.push('/recipes'))
    } else {
      alert("Incorrect username or password")
    }
  }

  logout = (routerProps) => {
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
        <Route exact path="/recipes" render={() => <AllRecipes recipeList={this.state.recipeList} userList={this.state.userList}/>}  />
        <Route exact path="/saved_recipes" render={() => <AllSavedRecipes />} />
        <Route exact path="/recipes_form" render={(props) => <RecipeForm signedInUser={this.state.signedInUser} router={props}/>} />
        <Route exact path="/recipes/:id" render={(props) => {
          let recipeId = props.match.params.id
          let recipe = this.state.recipeList.find(recipe => parseInt(recipe.id) === parseInt(recipeId))
          return <RecipeDetails recipe={recipe} userList={this.state.userList} />}} />
        <Route exact path="/login" render={(props) => <Login signInUser={this.signInUser} router={props}/>} />
        <Route exact path="/signup" render={(props) => <Signup signInUser={this.signInUser} router={props}/>} />
      </React.Fragment>
    );
  }
}

export default App;
