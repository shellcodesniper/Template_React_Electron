import React from 'react';

function LoginForm (props) {
  console.log(props);

  return (
    <div className="container">
      <form>
        <label>
          NAME : 
          <input type="text" name="name" onChange={props.handleChange} />
        </label>
      </form>
    </div>
  )
}

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: ''
    } 
    this.LoginForm = LoginForm.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);

  }

  handleFormChange(event) {
    
    if(event.currentTarget.getAttribute('name') === 'name') {
      this.setState(
        {
          username : event.currentTarget.value
        }
      )
    }
  }

  render () {
    return (
      <LoginForm handleChange={this.handleFormChange}/>
    );
  }
}

export default Login;