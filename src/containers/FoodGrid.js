import React from 'react'
import RecipeImage from '../components/RecipeImage'
import {Grid} from 'semantic-ui-react'


class FoodGrid extends React.Component {

  render(){
    return(
      (this.props.userList.length === 0 || this.props.recipeList.length === 0) ? null :
      <Grid id="food-grid" columns={3}>
          {this.props.recipeList.map(recipe => {
            return <Grid.Column><RecipeImage key={recipe.id} recipe={recipe} recipeList={this.props.recipeList} userList={this.props.userList}/></Grid.Column>
          })}
      </Grid>
    )
  }
}

export default FoodGrid
