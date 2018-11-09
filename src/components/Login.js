import React from 'react'
import {Segment, Form, Button} from 'semantic-ui-react'


class Login extends React.Component {
  constructor(){
    super()
    this.state = {
      username: "",
      password: ""
    }
  }

  handleChange = (event, data) => {
    this.setState({
      [event.target.name]: data.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    let body = {
      user: {
        username: this.state.username,
        password: this.state.password
      }
    }

    fetch(`http://localhost:3000/api/v1/login`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(body)
    }).then(res => res.json())
      .then(json => {
        localStorage.setItem("token", json.jwt)
        // this.props.updateUserInfo(json.user_info)
      })
  }

  render(){
    return(
      <div className="centered">
      <Segment stacked>
        <Form size='large' onSubmit={this.handleSubmit}>
          <Form.Input fluid icon='user' iconPosition='left' name="username" placeholder='username' onChange={this.handleChange} />
          <Form.Input fluid icon='lock' iconPosition='left' name="password" placeholder='password' type='password' onChange={this.handleChange} />
          <Button fluid size='large'>Login</Button>
        </Form>
      </Segment>
      </div>
    )
  }
}

export default Login
