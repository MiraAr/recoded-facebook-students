import React,{useState} from "react";
import db from "./firebase";
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Image from "react-bootstrap/Image"
import image from './google-signin.png'
import * as firebase from 'firebase';
import 'firebase/auth';




const SignUpPage = () => {

  const [city, setCity] = useState('');
  const [name, setName] = useState('');
  const [userId, setUserId] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [profile, setProfile] = useState('');

  const handleGoogleLogin= () =>{
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    firebase.auth().signInWithPopup(provider).then(function(result) {
    var token = result.credential.accessToken;
    var user = result.user;
    setName(user.displayName)
    setImageUrl(user.photoURL)
    setUserId(user.uid)
  
    console.log(user)
    }).catch(error=> console.log("ERROR!!!",error));
  
  }

  
  const handleSubmit=()=>{
      db.collection('profiles').doc(userId).set({
        city: city,
        name: name,
        userId: userId,
        imageUrl:imageUrl,
        profile:profile
    })

  }
  return(

    
    <Form onSubmit={handleSubmit}>
      <Image src={image} onClick={handleGoogleLogin}/>
      <Form.Group>
      <Form.Label>City </Form.Label>
      <Form.Control type="text" placeholder="Enter your City" onChange={e=>setCity(e.target.value)}/>
    </Form.Group>
    <Form.Group>
      <Form.Label>profile</Form.Label>
      <Form.Control type="text" placeholder="what else?" onChange={e=>setProfile(e.target.value)}/>
    </Form.Group>
    <Button variant="primary" type="submit">
      Submit
    </Button>
  </Form>

  );
};

export default SignUpPage;
