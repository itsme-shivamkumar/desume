import './App.css';
// RE`SUME❌ DE`VUME✔️
import {Routes, Route,useLocation} from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Main from './components/Main';
import Devume from './components/Devume';
import Feedback from './components/Feedback';
import About from './components/About';
import { createContext,useEffect,useRef,useState } from 'react';
const AppContext=createContext(null);
function App() {
  const location=useLocation();

  const [currEditingElement,setCurrEditingElement]=useState("");

  const currTitle=useRef("SHIVAM KUMAR");

  const [isUserSignedIn,setIsUserSignedIn]=useState(localStorage.getItem("userId")?true:false);

  const [currStyle,setCurrStyle]=useState({
    fontSize:16.0,
    fontSizeDim:"px",
    fontWeight:400,
    letterSpacing:0.0,
    letterSpacingDim:"px",
    color:"#000000",
    opacity:1,

    after:false,
    before:false,
    prepend:false,
    append:false,
    del:false,

    row:2,
    col:3,
    spanCol:1,
    spanRow:1,
    layoutDivActive:false,
    layoutGridActive:false,

    designFontActive:true,
    animateActive:false,
    designAdvActive:true,

    currEleText:"",
  });


  return (
    <AnimatePresence initial={false} mode='wait'>
      <AppContext.Provider value={{isUserSignedIn, setIsUserSignedIn, currTitle,currEditingElement,setCurrEditingElement,setCurrStyle,currStyle}} >
      <Routes location={location} key={location.key} >
        <Route path='/' element={<Main/>} />
        <Route path='/desume' element={<Devume/>} />
        {/* <Route path='/feedback' element={<Feedback/>}/>
        <Route path='/about' element={<About/>} /> */}
      </Routes>
      </AppContext.Provider>
    </AnimatePresence>
  );
}

export {App,AppContext};
