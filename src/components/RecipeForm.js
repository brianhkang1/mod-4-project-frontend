import React from 'react'
import {Segment, Form, Button, Icon} from 'semantic-ui-react'
// import FormAddIngredient from './FormAddIngredient'


class RecipeForm extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      name: "",
      time: "",
      cost: "",
      summary: "",
      ingredient_count: [1],
      ingredients: [],
      instruction_count: [1],
      instructions: [],
      image: ""
    }
  }

  handleChange = (event, data) => {
    this.setState({
      [event.target.name]: data.value
    })
  }

  handleAddIngredient = () => {
    let arr = [...this.state.ingredient_count]
    arr.push(parseInt(arr.slice(-1).join()) + 1)
    this.setState({ingredient_count: arr})
  }

  handleIngredientChange = (index, newValue) => {
    const updatedArray = [...this.state.ingredients];
    updatedArray[index] = newValue;
    this.setState({ingredients: updatedArray});
    }

  handleAddInstruction = () => {
    let arr = [...this.state.instruction_count]
    arr.push(parseInt(arr.slice(-1).join()) + 1)
    this.setState({instruction_count: arr})
  }

  handleInstructionChange = (index, newValue) => {
    const updatedArray = [...this.state.instructions];
    updatedArray[index] = newValue;
    this.setState({instructions: updatedArray});
  }

  handleSubmit = (event, routerProps) => {
    event.preventDefault()

    let formData = new FormData()
    formData.append("name", this.state.name)
    formData.append("time", this.state.time)
    formData.append("cost", this.state.cost)
    formData.append("summary", this.state.summary)
    formData.append("ingredients", this.state.ingredients.join("&&"))
    formData.append("instructions", this.state.instructions.join("&&"))
    formData.append("user_id", this.props.signedInUser.id)
    formData.append("image", this.state.image, this.state.image.name)

    fetch(`http://localhost:3000/api/v1/recipes`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: formData
    }).then(res => res.json()).then(json => routerProps.history.push(`/recipes/${json.id}`))
    }

  handleImageUpload = (event) => {
    this.setState({[event.target.name]: event.target.files[0]})
  }

  render(){
    return(
      <div className="form">
      {this.props.signedInUser ?
        <Form id="recipe-form" size={"huge"} onSubmit={(event) => this.handleSubmit(event, this.props.router)}>
        <Segment>
          <Form.Group widths="equal">
            <Form.Input fluid required icon='spoon' iconPosition='left' label="Name your recipe" name="name" placeholder='recipe name' onChange={this.handleChange} />
            <Form.Input fluid required icon='stopwatch' iconPosition='left' label="Estimated cook time" name="time" placeholder='cook time' onChange={this.handleChange} />
            <Form.Input fluid required icon='dollar' iconPosition='left' label="Cost" name="cost" type="number" min="0" step="0.01" placeholder='0.00' onChange={this.handleChange} />
          </Form.Group>
          <Form.TextArea required label="Describe your recipe" name="summary" onChange={this.handleChange} />
          <Form.Group>
            <Form.Field width={5}>
              <label><Icon circular id="add-button" onClick={this.handleAddIngredient} name="plus"/>List Ingredients</label>
              {this.state.ingredient_count.map((ing, index) => <input type="text" key={ing} placeholder="ingredient" onChange={e => this.handleIngredientChange(index, e.target.value)}/>)}
            </Form.Field>
            <Form.Field width={11}>
              <label><Icon circular id="add-button" onClick={this.handleAddInstruction} name="plus"/>List Instructions</label>
              {this.state.instruction_count.map((instruction, index) => <input type="text" key={instruction} placeholder="instruction" onChange={e => this.handleInstructionChange(index, e.target.value)}/>)}
            </Form.Field>
          </Form.Group>
          <Form.Input fluid label="Upload an image of your meal" id="upload-image" type="file" name="image" accept="image/*" onChange={this.handleImageUpload}/>
          <Button fluid >Share</Button>
          </Segment>
        </Form>
      : <Segment><p className="normal-text">You must be signed in to create a recipe.</p></Segment>
      }
      </div>
    )
  }
}

export default RecipeForm
