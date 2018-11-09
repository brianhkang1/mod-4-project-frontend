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
      selectedRecipe: null
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
    this.fetchAllUsers()
    this.fetchAllRecipes()
  }

  render() {
    return (
      <React.Fragment>
        <MainHeader />
        <Route exact path="/" render={() => <Home />} />
        <Route exact path="/about" render={() => <About/>} />
        <Route exact path="/recipes" render={() => <AllRecipes recipeList={this.state.recipeList} userList={this.state.userList}/>}  />
        <Route exact path="/saved_recipes" render={() => <AllSavedRecipes />} />
        <Route exact path="/recipes_form" render={() => <RecipeForm />} />
        <Route exact path="/recipes/:id" render={(props) => {
          let recipeId = props.match.params.id
          let recipe = this.state.recipeList.find(recipe => recipe.id == recipeId)
          return <RecipeDetails recipe={recipe} userList={this.state.userList} />}} />
        <Route exact path="/login" render={() => <Login />} />
        <Route exact path="/signup" render={() => <Signup />} />
      </React.Fragment>
    );
  }
}

export default App;
