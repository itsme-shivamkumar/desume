import React from 'react'
import Header from './Header'
import {motion} from 'framer-motion';
const Feedback = () => {
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
  return (
    <motion.div variants={myVariant} initial="hidden" animate="visible" exit="hidden">
      <Header/>
    </motion.div>
  )
}

export default Feedback;