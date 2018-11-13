import React from 'react'
import {Grid, Segment, Image, Icon, Label, Button, Header} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

const URL = "http://localhost:3000"

class RecipeDetails extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      savedRecipes: [],
      selectedRecipe: null
    }
  }

  componentDidMount(){
    fetch(`http://localhost:3000/api/v1/saved_recipes`,{
      headers: {"Authorization": `Bearer ${localStorage.getItem("token")}`}
    }).then(res => res.json()).then(data => this.setState({savedRecipes: data}))

    fetch(`http://localhost:3000/api/v1/recipes/${this.props.recipeId}`,{
      headers: {"Authorization": `Bearer ${localStorage.getItem("token")}`}
    }).then(res => res.json()).then(data => this.setState({selectedRecipe: data}))
  }

  findRecipeCreator = () => {
    let username = this.props.userList.find(user => user.id === this.state.selectedRecipe.user_id).username
    return username
  }

  arrayOfIngredients = () => {
    return this.state.selectedRecipe.ingredients.split("&&")
  }

  arrayOfInstructions = () => {
    return this.state.selectedRecipe.instructions.split("&&")
  }

  handleSaveRecipe = (event) => {
    event.preventDefault()

    if(!this.state.selectedRecipe.saved_recipes.find(recipe => recipe.user_id === this.props.signedInUser.id)){
      let body = {
        user_id:  this.props.signedInUser.id,
        recipe_id: this.state.selectedRecipe.id
      }

      fetch(`http://localhost:3000/api/v1/saved_recipes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(body)
      }).then(res => res.json()).then(json => {
        fetch(`http://localhost:3000/api/v1/recipes/${json.recipe_id}`,{
          headers: {"Authorization": `Bearer ${localStorage.getItem("token")}`}
        }).then(res => res.json()).then(data => this.setState({selectedRecipe: data}))
      })
    }
  }


  render(){
    return(
      <React.Fragment>
      {(!this.state.selectedRecipe || this.props.userList.length === 0) ? null :
      <div className="form">
      <Segment>
        <Link to="/recipes"><Icon name="window close outline" size="big"/></Link>
        <Grid>
        <Label attached='bottom right'>courtesy of {this.findRecipeCreator()}</Label>
        <Grid.Row>
          <Grid.Column width={7}>
            <Image wrapped size="massive" src={URL+this.state.selectedRecipe.image.url} />
          </Grid.Column>
          <Grid.Column width={9}>
            <Header id="header-recipeDetail-name">{this.state.selectedRecipe.name}</Header>
            <div className="recipeDetails-summary">
              <p><strong>Quick tidbit:</strong> {this.state.selectedRecipe.summary}</p>
            </div>
            <h3></h3>
            <div className="recipeDetails-ingredients">
              <p><strong>Ingredients: </strong></p>
              <ul>{this.arrayOfIngredients().map(ing => {
                return <li key={this.arrayOfIngredients().indexOf(ing)}>{ing}</li>
              })}</ul>
            </div>
            <h3></h3>
            <div className="recipeDetails-instructions">
            <p><strong>Instructions: </strong></p>
            <ol>{this.arrayOfInstructions().map(ins => {
              return <li key={this.arrayOfInstructions().indexOf(ins)}>{ins}</li>
            })}</ol>
            </div>
            <h3></h3>
            {this.props.signedInUser ?
              !this.state.selectedRecipe.saved_recipes.find(recipe => recipe.user_id === this.props.signedInUser.id) ?
                <div id="save-recipe-button">
                <Button size="massive" onClick={this.handleSaveRecipe}>Save recipe</Button>
                </div>
                :
                <div id="save-recipe-button">
                <Button size="massive" >Recipe already saved</Button>
                </div>
                : null
            }
          </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
      </div>
    }
    </React.Fragment>
    )
  }
}

export default RecipeDetails
