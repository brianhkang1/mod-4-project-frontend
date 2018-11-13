import React from 'react'
import {Segment, Form, Button} from 'semantic-ui-react'


class Signup extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      username: "",
      password: "",
      password_confirm: "",
      fav_food: "",
      worst_food: ""
    }
  }

  handleChange = (event, data) => {
    this.setState({
      [event.target.name]: data.value
    })
  }

  handleSubmit = (event, routerProps) => {
    event.preventDefault()

    if (this.state.password !== this.state.password_confirm) {
      alert("Password and Password Confirmation do not match")
    } else {
      this.postNewUser()
    }
  }

  postNewUser = () => {
    let body = {
      user: {
        username: this.state.username,
        password: this.state.password,
        fav_food: this.state.fav_food,
        worst_food: this.state.worst_food
      }
    }

    fetch(`http://localhost:3000/api/v1/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(body)
    }).then(res => res.json())
      .then(json => {
        localStorage.setItem("token", json.jwt)
        this.props.fetchAllUsers()
        this.props.signInUser(json.user, this.props.router)
      })
    }

  render(){
    return(
      <div className="centered">
      <Segment>
        <Form size='large' onSubmit={(event) => this.handleSubmit(event, this.props.router)}>
          <Form.Input required icon='user' iconPosition='left' label="username" name="username" placeholder='username' onChange={this.handleChange} />
          <Form.Input required icon='lock' iconPosition='left'label="password" name="password" placeholder='password' type='password' onChange={this.handleChange} />
          <Form.Input required icon='lock' iconPosition='left' label="password confirmation" name="password_confirm" placeholder='password confirmation' type='password' onChange={this.handleChange} />
          <Form.Input required icon='thumbs up' iconPosition='left' label="If you had to eat one thing for the rest of your life..." name="fav_food" placeholder="favorite food" onChange={this.handleChange} />
          <Form.Input required icon='thumbs down' iconPosition='left' label="If you could eradicate one food from this world..." name="worst_food" placeholder="worst food ever" onChange={this.handleChange} />

          <Button color="teal" fluid size='large'>Signup</Button>
        </Form>
      </Segment>
      </div>
    )
  }
}

export default Signup
