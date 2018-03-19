import React, {Component} from 'react'
import GoogleLogin from 'react-google-login';


class LoginGoogle extends Component {
  
  responseGoogle = (response) => {
    //console.log('goooooogle: ',response);
  }

  render(){
    return(
      <GoogleLogin
      clientId="178848131764-l6f61h1flr9rkqsilspj2ipc0bp00f1t.apps.googleusercontent.com"
      buttonText="Login"
      onSuccess={this.responseGoogle}
      onFailure={this.responseGoogle}
    />
    )
  }
}

export default LoginGoogle