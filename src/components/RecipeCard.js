import React from 'react'
import {Grid, Segment, Image, Label} from 'semantic-ui-react'
import {NavLink} from 'react-router-dom'

class RecipeCard extends React.Component{

  findRecipeCreator = () => {
    let username = this.props.userList.find(user => user.id === this.props.recipe.user_id).username
    return username
  }

  sanitizeIngredients = () => {
    return this.props.recipe.ingredients.split(",; ").join(", ")
  }

  render(){
    return(
      <Segment>
        <Grid as={NavLink} to={`/recipes/${this.props.recipe.id}`}>
          <Grid.Row>
          <Label attached='bottom right'>courtesy of {this.findRecipeCreator()}</Label>
            <Grid.Column width={5}>
              <Image src="https://images.unsplash.com/photo-1509912760195-4f6cfd8cce2c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=a621517c7a9bc90c857dc0bced1dcca3&auto=format&fit=crop&w=1050&q=80"/>
            </Grid.Column>
            <Grid.Column width={11}>
              <h1>{this.props.recipe.name}</h1>
              <p>{this.props.recipe.summary}</p>
              <p>Ingredients: {this.sanitizeIngredients()}</p>
            </Grid.Column>
            </Grid.Row>
        </Grid>
      </Segment>
    )
  }
}

export default RecipeCard
