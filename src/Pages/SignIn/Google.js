import React from 'react'
import { useNavigate } from 'react-router-dom';
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";

const Google = () => {
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    const url = "/api/v1/auth/google";
    window  
      .fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        navigate("/dashboard");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={handleGoogleSignIn}
      >
        Sign In with Google
      </Button>
    </Container>
  );
};

export default Google;


// const withRouter = (Component) => {
//   const Wrapper = (props) => {
//     const navigate = useNavigate();
    
//     return (
//       <Component
//         navigate={navigate}
//         {...props}
//         />
//     );
//   };
  
//   return Wrapper;
// };

// class Google extends React.Component {

//   constructor(props) {
//     super(props)
//     window.customCallback = this.customCallback.bind(this)
//     this.customCallback=this.customCallback.bind(this);
//   }
  
//   customCallback(response) {
//     localStorage.setItem("myKitchenAppToken", response.credential)
//     this.props.navigate('/dashboard')
//   }
  
//     componentDidMount(){
//         const script = document.createElement('script');
//         script.id = 'google-script'
//         script.src = "https://accounts.google.com/gsi/client" ;
//         script.async = true;
//         script.defer = true;
      
//         document.body.appendChild(script);
//     }

//     componentWillUnmount(){
//         const googleScript = document.getElementById('google-script')
//         document.body.removeChild(googleScript)
//     }
 
  

//   render() {
//     return (
//       <Container>
//         <Button>Sign in with Google!!!!!</Button>
            
//       <>
//         id='g_id_onload'
//         data-client_id="791096127622-ua9vefrs6j9bnrembfbmsam2sq5e0t7j.apps.googleusercontent.com"
//         data-callback='customCallback'
//         data-auto_prompt="false"
//       </>
//       <div 
//         className="g_id_signin"
//         data-type="standard"
//         data-size="large"
//         data-theme="outline"
//         data-text="sign_in_with"
//         data-shape="rectangular"
//         data-logo_alignment="left">
//       </div>
//       </Container>
//     )
//   }
// }
// export default withRouter(Google)


