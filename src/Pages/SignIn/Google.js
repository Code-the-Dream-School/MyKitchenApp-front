import React from 'react'
import { useNavigate } from 'react-router-dom';

const withRouter = (Component) => {
  const Wrapper = (props) => {
    const navigate = useNavigate();
    
    return (
      <Component
        navigate={navigate}
        {...props}
        />
    );
  };
  
  return Wrapper;
};

class Google extends React.Component {

  constructor(props) {
    super(props)
    window.customCallback = this.customCallback.bind(this)
    this.customCallback=this.customCallback.bind(this);
  }
  
  customCallback(response) {
    localStorage.setItem("token", response.credential)
    this.props.navigate('/dashboard')
  }
  
    componentDidMount(){
        const script = document.createElement('script');
        script.id = 'google-script'
        script.src = "https://accounts.google.com/gsi/client" ;
        script.async = true;
        script.defer = true;
      
        document.body.appendChild(script);
    }

    componentWillUnmount(){
        const googleScript = document.getElementById('google-script')
        document.body.removeChild(googleScript)
    }
 
  

  render() {
    return (
      <div>
        <div>click here to sign in with google!!!!!</div>
            
      <div
        id='g_id_onload'
        data-client_id="791096127622-ua9vefrs6j9bnrembfbmsam2sq5e0t7j.apps.googleusercontent.com"
        data-callback='customCallback'
        data-auto_prompt="false"
      />
      <div 
        className="g_id_signin"
        data-type="standard"
        data-size="large"
        data-theme="outline"
        data-text="sign_in_with"
        data-shape="rectangular"
        data-logo_alignment="left">
      </div>
      </div>
    )
  }
}
export default withRouter(Google)


