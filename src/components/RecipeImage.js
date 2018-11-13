import React from 'react'
import {Image, Label, Icon, Segment} from 'semantic-ui-react'
import {NavLink} from 'react-router-dom'

const URL = "http://localhost:3000"

class RecipeImage extends React.Component {

  findRecipeCreator = () => {
    let username = this.props.userList.find(user => user.id === this.props.recipe.user_id).username
    return username
  }

  render(){
    return(
      (this.props.userList.length === 0 || this.props.recipeList.length === 0) ? null :
      <Segment>
        <Label attached='bottom'>
          <Icon fitted name='user'/> {this.findRecipeCreator()} |
          {" "}<Icon fitted name='time'/> {this.props.recipe.time} |
          {" "}<Icon fitted name="dollar"/> {this.props.recipe.cost}
        </Label>
        <Image as={NavLink} to={`/recipes/${this.props.recipe.id}`} src={URL + this.props.recipe.image.url}/>
      </Segment>
    )
  }
}

export default RecipeImage
