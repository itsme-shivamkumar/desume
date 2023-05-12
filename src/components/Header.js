import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.gif';
import '../App.css';
import {motion} from 'framer-motion';
import {auth,provider} from '../config/Firebase';
import {signInWithPopup,signOut} from 'firebase/auth'
import { AppContext } from '../App';

const Header = () => {
    const navigator=useNavigate();
    const {isUserSignedIn,setIsUserSignedIn}=useContext(AppContext);

    const signInUser=async()=>{
        try{
            await signInWithPopup(auth,provider);
            setIsUserSignedIn(true);
            localStorage.setItem("userId",JSON.stringify(auth.currentUser.uid));
        }
        catch(e){
            console.log(e);
        }
    }

    const signOutUser=async()=>{
        try{
            await signOut(auth);
            setIsUserSignedIn(false);
            localStorage.removeItem("userId");
        }
        catch(e){
            console.log(e);
        }
    }

  return (
    <header>
        <div className='nav--left' >
        <Link to="/">
            <div className='logo--header' >
            <img id='globe' alt='globe--logo' src={logo} width={35}  />
            <motion.svg
            initial={{pathLength:0}}
            animate={{pathLength:1}}
            transition={{duration:2}}
            id='logo' version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="97.91px" height="21.14px" fill='white' viewBox="0 0 97.91 21.14"><path d="M4.82,17.89C3.17,19.16,1.97,19.8,1.2,19.8c-0.4,0-0.75-0.24-0.91-0.6C0.1,18.79,0,18.35,0,17.89c0.14-1.39,0.52-2.74,1.13-4C1.89,12.1,2.61,11.2,3.3,11.2c0.36,0,0.66,0.7,0.91,2.1c0.16,1.04,0.42,2.07,0.77,3.06c1.27-1.33,3.11-3.57,5.52-6.72c3.02-4,5.02-6.18,6-6.53c0.32-0.12,0.66-0.19,1-0.19c0.31-0.01,0.61,0.06,0.88,0.22c0.21,0.11,0.34,0.32,0.35,0.56c0,0.32-0.27,0.5-0.81,0.56c-1.11,0.73-2.11,1.6-3,2.58c-1.19,1.13-2.27,2.36-3.24,3.69c-1.76,2.52-3.83,4.8-6.16,6.8c1.11,1.59,2.98,2.48,4.92,2.33c0.25,0,0.61,0,1.1-0.06c5.19-0.48,8.85-2.73,11-6.75c0.84-1.45,1.29-3.09,1.31-4.76c-0.01-1.57-0.61-3.08-1.7-4.22c-0.77-0.94-1.82-1.61-3-1.91c-1.08-0.24-2.18-0.36-3.29-0.36c-2.78-0.02-5.51,0.67-7.95,2C5.35,5,4.08,6.6,4.08,8.3C4.06,8.72,4.19,9.13,4.45,9.45c0.15,0.19,0.32,0.36,0.52,0.5H4.8C4.33,9.85,3.9,9.6,3.58,9.23C3.19,8.81,2.97,8.27,2.96,7.69c0-1.86,1.17-3.47,3.51-4.81c2.52-1.38,5.37-2.08,8.25-2c1.51,0.01,3.01,0.18,4.48,0.51c1.6,0.37,3.05,1.2,4.17,2.4c1.37,1.33,2.15,3.16,2.16,5.07c-0.03,1.53-0.46,3.02-1.23,4.34c-1.4,2.56-3.65,4.56-6.36,5.66c-2.34,0.95-4.84,1.42-7.36,1.37C7.99,20.23,6.07,19.45,4.82,17.89z M1.01,17.78c-0.01,0.52,0.1,1.04,0.33,1.51c1.09-0.56,2.08-1.31,2.92-2.21c-0.42-0.66-0.76-1.37-1-2.11c-0.16-0.66-0.25-1.33-0.29-2C1.85,14.35,1.17,16.02,1.01,17.78z M5.01,9.94c0.02,0.01,0.04,0.01,0.06,0V10L5.01,9.94z M28.01,18.94c-0.19,0-0.38-0.03-0.56-0.09c-1.19-0.33-1.79-1-1.79-2c0-1.33,0.82-2.85,2.46-4.54c1.65-1.72,3.12-2.57,4.43-2.57c0.36-0.01,0.72,0.12,1,0.35c0.26,0.21,0.41,0.52,0.4,0.85c0,1.05-0.78,2-2.36,3c-1.14,0.8-2.47,1.29-3.85,1.42c-0.13,0.01-0.26-0.01-0.39-0.05c-0.28,0.48-0.42,1.03-0.42,1.59c0,1,0.46,1.46,1.38,1.46s2.13-0.63,3.6-1.88c1.08-0.85,2.06-1.83,2.91-2.91c0.17-0.22,0.32-0.33,0.44-0.33s0.18,0.05,0.18,0.16c-0.03,0.18-0.11,0.34-0.23,0.48c-1.03,1.35-2.26,2.54-3.64,3.53c-1,0.86-2.23,1.4-3.54,1.55L28.01,18.94z M33.3,10.87c0-0.22-0.23-0.33-0.71-0.33c-0.76,0.15-1.46,0.53-2,1.09c-1.07,0.84-2,1.86-2.74,3c0.12,0.04,0.24,0.06,0.36,0.06c1.03-0.12,2.01-0.51,2.84-1.14c1-0.54,1.79-1.42,2.23-2.47c0.02-0.06,0.04-0.13,0.04-0.19L33.3,10.87z M42.61,7.57c0.53-0.01,1.04,0.19,1.42,0.56c0.42,0.41,0.63,0.99,0.59,1.57c0,1.47-1.22,3.32-3.67,5.54c-1.43,1.45-3.13,2.61-5,3.42c-0.3-0.04-0.58-0.15-0.81-0.34c-0.34-0.22-0.5-0.43-0.5-0.61c0.3-1.44,0.75-2.84,1.34-4.18c0.9-2.37,1.51-3.69,1.85-4c0.1-0.09,0.23-0.13,0.36-0.11c0.2,0.01,0.4,0.11,0.53,0.26c0.18,0.17,0.29,0.39,0.31,0.63c0,0-0.46,1.1-1.38,3.25c-0.63,1.2-1.08,2.5-1.31,3.84c1.58-0.75,3.03-1.74,4.3-2.94c2.06-1.72,3.1-3.26,3.1-4.62c0.01-0.8-0.48-1.53-1.24-1.8c-0.11-0.03-0.19-0.13-0.19-0.25c0.01-0.12,0.11-0.2,0.32-0.2L42.61,7.57z M59.47,11.57l2.87,0.08h0.24c0.45,0,0.67,0,0.67,0.2s-0.36,0.39-1.09,0.39l-2.42-0.01c-0.3,0.01-0.59,0.05-0.87,0.14c-0.78,1-1.84,2.38-3.16,4.22s-2,2.93-2,3.29c0,0.15,0.17,0.11,0.5-0.12c0.21,0,0.31,0,0.31,0.09s-0.21,0.23-0.62,0.42l-0.78,0.42c-0.34,0.3-0.77,0.46-1.22,0.45c-0.46,0-0.67-0.12-0.63-0.34c0-0.45,0.68-1.58,2-3.4c1.32-1.82,2.66-3.55,4.06-5.2c-1.01,0.21-2.04,0.34-3.08,0.37c-0.07,0-0.11-0.08-0.11-0.18s0.11-0.25,0.33-0.44c0.2-0.17,0.46-0.27,0.72-0.28h1.22h1.42c0.67-0.85,2.08-2.82,4.23-5.93c0.75-0.91,1.22-2.02,1.35-3.19c0-1.31-1-2-2.92-2c-1.84,0.07-3.65,0.5-5.33,1.26c-2.05,0.84-3.95,1.99-5.64,3.42c-1.14,0.92-2.12,2.03-2.89,3.28c-0.62,0.92-0.98,2-1.05,3.11c0,1.48,0.88,2.21,2.63,2.21h0.48c1.29-0.19,2.46-0.89,3.23-1.95c0.83-0.8,1.37-1.86,1.53-3c0.01-0.08,0.01-0.17,0-0.25c0.44,0.04,0.77,0.42,0.73,0.86c0,0,0,0,0,0.01c-0.19,1.07-0.75,2.04-1.6,2.73c-1.26,1.4-3.05,2.2-4.93,2.21c-0.88,0.05-1.74-0.24-2.41-0.81c-0.59-0.58-0.9-1.39-0.86-2.22c0-2.2,1.33-4.42,4-6.66c1.86-1.51,3.95-2.7,6.2-3.52c1.81-0.74,3.74-1.15,5.69-1.22c1.25-0.07,2.49,0.17,3.62,0.7c0.75,0.38,1.21,1.16,1.19,2c-0.07,1.03-0.46,2.01-1.1,2.81c-0.42,0.63-1.92,2.65-4.49,6.05H59.47z M70.92,12.66c0,0.65-0.62,1.74-1.87,3.27c-1.48,1.81-2.74,2.72-3.78,2.72h-0.45c-0.5-0.01-0.95-0.3-1.15-0.76c-0.22-0.35-0.33-0.76-0.33-1.17c0-1.12,0.81-2.69,2.45-4.72s3-3,4-3s1.43,0.51,1.43,1.51c-0.01,0.34-0.06,0.67-0.14,1c0,0.06,0.19,0.09,0.53,0.09c0.55-0.07,1.07-0.25,1.54-0.54c0,0.32-0.76,0.78-2.21,1.38c0,0.07,0,0.15,0,0.22H70.92z M69.12,11.23c-0.63,0-1.53,0.75-2.7,2.24s-1.75,2.6-1.75,3.31s0.23,1.06,0.67,1.06c0.81,0,1.82-0.73,3.06-2.18s1.84-2.51,1.84-3.14C69.78,12.18,69.4,11.74,69.12,11.23z M74.76,18.06c0.87-0.1,1.7-0.45,2.38-1c1.07-0.74,2.02-1.64,2.82-2.66c0.23-0.29,0.41-0.44,0.54-0.44s0.19,0.05,0.19,0.16c-0.3,0.53-0.67,1.02-1.11,1.45c-1.86,2.05-3.42,3.07-4.67,3.08c-0.57,0.03-1.13-0.12-1.61-0.42c-0.44-0.31-0.68-0.82-0.64-1.35c0.02-0.73,0.18-1.44,0.47-2.11c0.75-1.66,1.62-3.26,2.61-4.79c2.18-3.55,3.73-5.32,4.64-5.32c0.21,0.01,0.41,0.08,0.58,0.21c0.17,0.1,0.28,0.27,0.32,0.46L78.8,8.66c-1.22,1.64-2.07,2.82-2.53,3.57s-0.82,1.25-1,1.61s-0.41,0.63-0.52,0.82s-0.24,0.45-0.39,0.77c-0.32,0.55-0.5,1.17-0.53,1.8c0,0.53,0.31,0.8,0.93,0.8V18.06z M87.65,7.44c0.23,0.13,0.38,0.37,0.38,0.63c-0.01,0.26-0.14,0.49-0.35,0.63c-0.22,0.17-0.49,0.26-0.77,0.26c-0.29,0-0.56-0.11-0.77-0.31c-0.22-0.17-0.35-0.43-0.35-0.7c0-0.52,0.36-0.78,1.07-0.78C87.15,7.18,87.42,7.27,87.65,7.44z M81.79,18.9c-0.95,0-1.43-0.61-1.43-1.85c0.19-1.51,0.76-2.95,1.65-4.18c1.1-1.78,2-2.69,2.66-2.7c0.23,0.01,0.45,0.09,0.63,0.22c0.24,0.15,0.35,0.3,0.35,0.45s-0.2,0.27-0.33,0.43l-0.42,0.52c-0.15,0.19-0.36,0.45-0.62,0.8l-0.76,1c-1.4,1.81-2.1,3.06-2.1,3.74s0.24,1,0.7,1c0.58-0.07,1.13-0.29,1.6-0.64c1.42-0.84,2.67-1.92,3.72-3.19c0.34-0.43,0.57-0.65,0.69-0.65s0.18,0.08,0.18,0.23s-0.21,0.44-0.64,0.89l-1,1.07l-0.52,0.51l-0.52,0.48c-0.18,0.17-0.37,0.34-0.57,0.49l-0.56,0.42c-0.2,0.16-0.42,0.3-0.65,0.41l-0.64,0.29c-0.44,0.18-0.92,0.26-1.4,0.25L81.79,18.9z M95.65,12.66c0,0.65-0.62,1.74-1.87,3.27c-1.48,1.81-2.74,2.72-3.78,2.72h-0.42c-0.5-0.01-0.95-0.3-1.15-0.76c-0.22-0.35-0.33-0.76-0.33-1.17c0-1.12,0.81-2.69,2.45-4.72s3-3,4-3s1.43,0.51,1.43,1.51c-0.01,0.34-0.06,0.67-0.14,1c0,0.06,0.19,0.09,0.53,0.09c0.55-0.07,1.07-0.25,1.54-0.54c0,0.32-0.76,0.78-2.21,1.38C95.69,12.52,95.67,12.59,95.65,12.66z M93.83,11.23c-0.63,0-1.53,0.75-2.7,2.24s-1.75,2.6-1.75,3.31s0.23,1.06,0.67,1.06c0.81,0,1.82-0.73,3.06-2.18s1.84-2.51,1.84-3.14C94.49,12.18,94.11,11.74,93.83,11.23z"/>
            </motion.svg>
            </div>
        </Link>
        
        <span id='sep' >|</span>
        <div className='header--links' >
                <button style={{border:"1px solid white"}} 
                onClick={(e)=>{
                    if(isUserSignedIn)navigator("/desume");
                    else signInUser();
                }}
                >De`sume</button>
            {/* <Link to="/feedback" >
                <button>Suggestion</button>
            </Link>
            <Link to="/about">
                <button>About Me!</button>
            </Link> */}
        </div>
        </div>
        <div className='auth--btn' >
            <button id='signin--btn' style={{border:"1px solid white",width:120, marginRight:20}}
            onClick={(e)=>{
                if(isUserSignedIn)signOutUser();
                else signInUser();
            }}
            >{isUserSignedIn?"Log Out":"Sign In"}</button>
        </div>
    </header>
  )
}

export default Header