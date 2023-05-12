import React from 'react'
import Header from './Header'
import {motion} from 'framer-motion';
const About = () => {

  const myVariant={
    hidden:{
      x:-1000,
      scale:0,
      rotateY:'90deg',
    },
    visible:{
      x:0,
      scale:0,
      rotateY:'0deg',
      transition:{
        ease:"easeInOut",
        duration:0.1,
      }
    },
    exit:{
      x:-100,
      opacity:1,
      rotateY:'-90deg',
      transition:{
        ease:"easeInOut",
        duration:2,
      }
    }
  }


  return (
    <motion.div variants={myVariant} initial="hidden" animate="visible" exit="hidden" enterBeforeExit >
      <Header/>
    </motion.div>
  )
}

export default About