import React from 'react'
import {Grid, Segment, Image, Label} from 'semantic-ui-react'
import {NavLink} from 'react-router-dom'

const URL = "http://localhost:3000"


class RecipeCard extends React.Component{

  findRecipeCreator = () => {
    let username = this.props.userList.find(user => user.id === this.props.recipe.user_id).username
    return username
  }

  sanitizeIngredients = () => {
    return this.props.recipe.ingredients.split("&&").join(", ")
  }

  render(){
    return(
      <React.Fragment>
      {this.props.userList.length === 0 ? null :
      <Segment>
        <Grid as={NavLink} to={`/recipes/${this.props.recipe.id}`}>
          <Grid.Row>
          <Label attached='bottom right'>courtesy of {this.findRecipeCreator()}</Label>
            <Grid.Column width={5}>
              <Image src={URL + this.props.recipe.image.url}/>
            </Grid.Column>
            <Grid.Column width={11}>
              <h1>{this.props.recipe.name}</h1>
              <p>{this.props.recipe.summary}</p>
              <p>Ingredients: {this.sanitizeIngredients()}</p>
            </Grid.Column>
            </Grid.Row>
        </Grid>
      </Segment>}
      </React.Fragment>
    )
  }
}

export default RecipeCard
