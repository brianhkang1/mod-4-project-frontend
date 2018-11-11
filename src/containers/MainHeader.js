import React, { Component } from 'react'
import { Menu, Button} from 'semantic-ui-react'
import {NavLink, Link} from 'react-router-dom'

export default class MainHeader extends Component {
  constructor(){
    super()
    this.state = {
      activeItem: ''
    }
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state
    return (
        <Menu inverted secondary>
          <Menu.Item id="header-title" header as={NavLink} exact to="/"
            name="potluck"
            active={activeItem === 'potluck'}
            onClick={this.handleItemClick}
          />
          <Menu.Item as={NavLink} to="/about"
            name='about'
            active={activeItem === 'about'}
            onClick={this.handleItemClick}
          />
          <Menu.Item as={NavLink} to="/recipes"
            name='see all recipes'
            active={activeItem === 'see all recipes'}
            onClick={this.handleItemClick}
          />
          <Menu.Item as={NavLink} to="/saved_recipes"
            name='My saved recipes'
            active={activeItem === 'saved recipes'}
            onClick={this.handleItemClick}
          />
          <Menu.Item as={NavLink} to="/recipes_form"
            name='make a recipe'
            active={activeItem === 'make a recipe'}
            onClick={this.handleItemClick}
          />
          <Menu.Item position='right'>
            {this.props.signedInUser ?
              <React.Fragment>
                <Button inverted> {this.props.signedInUser.username}'s Cookbook</Button>
                <Button onClick={() => this.props.logout(this.props.router)} style={{ marginLeft: '0.5em' }} inverted>Log out</Button>
              </React.Fragment>
              :
              <Link to="/login"><Button inverted >Log in</Button></Link> }
            {this.props.signedInUser ? null : <Link to="/signup"><Button inverted style={{ marginLeft: '0.5em' }} > Sign Up </Button></Link> }
          </Menu.Item>
        </Menu>
    )
  }
}
