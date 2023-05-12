import React, { useContext, useEffect, useState } from 'react'
import img from '../assets/main.png';
import {motion} from 'framer-motion';
import Header from './Header';
import {auth,provider} from '../config/Firebase';
import {signInWithPopup} from 'firebase/auth';
import {AppContext} from '../App';
import { useNavigate } from 'react-router-dom';


const Main = () => {
  const {isUserSignedIn,setIsUserSignedIn}=useContext(AppContext);
  const navigator=useNavigate();

  const [winS,setWinS]=useState(window.innerWidth);

  useEffect(()=>{
    if(winS<1000){
      // document.querySelector("body").style.display="none";
      window.alert("This experimental app in only working & accessible in desktop!")
    }
    // else document.querySelector("body").style.display="";
  },[winS])

  const SignInUser=async()=>{
    try{
      await signInWithPopup(auth,provider);
      console.log(auth?.currentUser?.email)
      setIsUserSignedIn(true);
      localStorage.setItem("userId",JSON.stringify(auth.currentUser.uid));
      navigator("/desume");
    }
    catch(e){
      console.log(e);
    }
  }

  const myVariant={
    hidden:{
      x:-1000,
      scale:0,
      rotateY:'90deg',
    },
    visible:{
      x:0,
      scale:1,
      rotateY:'0deg',
      transition:{
        ease:"easeInOut",
        duration:0.1,
      }
    },
    exit:{
      x:-1000,
      transition:{
        ease:"easeInOut",
        duration:2,
      }
    }
  }

  // useEffect(()=>{
  //   if(parseInt(window.innerWidth)<1100){
  //     document.querySelector("body").style.display="hidden";
  //   }
  //   else document.querySelector("body").style.display="";
  // },[])

  useEffect(()=>{
    window.addEventListener("resize",(e)=>{
    setWinS(window.innerWidth);
  })
  },[])

  return (
    <motion.main variants={myVariant} initial="hidden" animate="visible" exit="hidden" >
      <Header/>
      <div className='main--heading'>
        <h1>CREATE YOUR RESUME LIKE NEVER BEFORE</h1>
        <button onClick={(e)=>{
         if(!isUserSignedIn)SignInUser();
         else navigator("/desume");
        }} > Start Creating </button>
      </div>
      <div className='flip--card' >
      <motion.div className='main--img' >
        <img src={img} alt='preview' />
      </motion.div>
     </div>
      
    </motion.main>
  )
}

export default Main;