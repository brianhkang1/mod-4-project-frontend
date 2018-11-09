import React from 'react'
import {Grid, Segment, Image, Icon, Label, Header} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

class RecipeDetails extends React.Component{

  findRecipeCreator = () => {
    let username = this.props.userList.find(user => user.id === this.props.recipe.user_id).username
    return username
  }

  arrayOfIngredients = () => {
    return this.props.recipe.ingredients.split(",; ")
  }

  arrayOfInstructions = () => {
    return this.props.recipe.instructions.split(",; ")
  }

  render(){
    return(
      <Segment>
        <Link to="/recipes"><Icon name="window close outline" size="big"/></Link>
        <Grid>
          <Grid.Column width={7}>
            <Image wrapped size="huge" src="https://images.unsplash.com/photo-1509912760195-4f6cfd8cce2c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=a621517c7a9bc90c857dc0bced1dcca3&auto=format&fit=crop&w=1050&q=80" />
          </Grid.Column>
          <Grid.Column width={9}>
            <Header id="header-recipeDetail-name">{this.props.recipe.name}</Header>
            <h3></h3>
            <div className="recipeDetails-summary">
              <p>{this.props.recipe.summary}</p>
            </div>
            <h3></h3>
            <div className="recipeDetails-ingredients">
              <p><strong>Ingredients: </strong></p>
              <ul>{this.arrayOfIngredients().map(ing => {
                return <li key={this.arrayOfIngredients().indexOf(ing)}>{ing}</li>
              })}</ul>
            </div>
            <div className="recipeDetails-instructions">
            <p><strong>Instructions: </strong></p>
            <ol>{this.arrayOfInstructions().map(ins => {
              return <li key={this.arrayOfInstructions().indexOf(ins)}>{ins}</li>
            })}</ol>
            </div>
          </Grid.Column>
        </Grid>

      </Segment>
    )
  }
}

export default RecipeDetails
