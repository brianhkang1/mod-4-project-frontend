import React from 'react'

class MySavedRecipes extends React.Component{
  render(){
    return(
      this.props.signedInUser.saved_recipes.map(savedRecipe => {

      })

    )
  }
}

export default MySavedRecipes
