import React from 'react'
import RecipeCard from '../components/RecipeCard'
import {Container} from 'semantic-ui-react'

class AllRecipes extends React.Component{
  render(){
    return(
      this.props.recipeList ?
      <Container>
        {this.props.recipeList.map(recipe => {
          return <RecipeCard key={recipe.id} recipe={recipe} userList={this.props.userList} />
        })}
      </Container>
      :
      null
    )
  }
}

export default AllRecipes
