import React, { Component } from 'react'
import { Menu, Button } from 'semantic-ui-react'
import {NavLink} from 'react-router-dom'

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
            name='saved recipes'
            active={activeItem === 'saved recipes'}
            onClick={this.handleItemClick}
          />
          <Menu.Item as={NavLink} to="/recipes_form"
            name='make a recipe'
            active={activeItem === 'make a recipe'}
            onClick={this.handleItemClick}
          />
          <Menu.Item position='right'>
            <Button as={NavLink} to="/login" inverted >
              Log in
            </Button>
            <Button as={NavLink} to="/signup" style={{ marginLeft: '0.5em' }} inverted >
              Sign Up
            </Button>
          </Menu.Item>
        </Menu>
    )
  }
}
