import React, { useContext, useEffect, useState,useRef } from "react";
import { motion } from "framer-motion";
import { AppContext } from "../App";
import "../App.css";
import Tool from "./Tool";
import jsPDF from 'jspdf';
import html2canvas from "html2canvas";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../config/Firebase";


const Devume = () => {
  const [contentEdit,setContentEdit]=useState(false);
  let cnt=0;

  const navigator=useNavigate();

  const {isUserSignedIn, currEditingElement,setCurrEditingElement,currStyle,setCurrStyle,currTitle}=useContext(AppContext);
  
  const handleClick=(e)=>{
    let tag=e.target.tagName;
    if((tag==="H1"||tag==="H2"||tag==="H3"||
    tag==="H4"||tag==="H5"||tag==="H6"||tag==="LI"||
    tag==="P"||tag==="SPAN"||tag==="A")&&e.target!==currEditingElement)setCurrEditingElement((prev)=>{
      if(prev){
        prev.setAttribute("contentEditable",false);
        prev.setAttribute("spellCheck",true);
        prev.classList.remove("selectedEle");
        if(prev.id=="text--title"){
          let str=document.getElementById("text--title").innerText;
          console.log("str is ",str);
            currTitle.current=str;
      }
      }
      if(e.target.id=="text--title"){
          let str=document.getElementById("text--title").innerText;
          console.log("str is ",str);
            currTitle.current=str;
      }
      e.target.setAttribute("contentEditable",true);
      e.target.setAttribute("spellCheck",false);
      e.target.className="selectedEle";
      setCurrEditingElement(e.target);
      return e.target;
    });
  }

  const pdfRef=useRef(null);

  const handleDownload2=()=>{
    setCurrStyle({...currStyle,layoutGridActive:false,layoutDivActive:false,designAdvActive:false,designFontActive:false,animateActive:false});
    if(currEditingElement.id=="text--title"){
      let str=document.getElementById("text--title").innerText;
        currTitle.current=str;
    }
    setTimeout(()=>{
      var HTML_Width = 700;
      var HTML_Height = 740;
      var top_left_margin = 15;
      var PDF_Width = HTML_Width + (top_left_margin * 2);
      var PDF_Height = (PDF_Width * 1) + (top_left_margin * 2);
      var canvas_image_width = HTML_Width;
      var canvas_image_height = HTML_Height;
  
      var totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1;
  
      html2canvas(document.getElementById("pdf--content")).then(function (canvas) {
        var imgData = canvas.toDataURL("image/jpeg", 1.0);
        var pdf = new jsPDF('p', 'pt', [PDF_Width, PDF_Height]);
        pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin, canvas_image_width, canvas_image_height);
        for (var i = 1; i <= totalPDFPages; i++) { 
            pdf.addPage(PDF_Width, PDF_Height);
            pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height*i)+(top_left_margin*4),canvas_image_width,canvas_image_height);
        }
        console.log("name is ",currStyle.currTitle);
        pdf.save(`${currTitle.current} Resume 2024.pdf`);
        });
    },500);
    
  }

  const handleDownload = () => {
    setCurrStyle({...currStyle,layoutGridActive:false,layoutDivActive:false,designAdvActive:false,designFontActive:false,animateActive:false});
    if(currEditingElement.id=="text--title"){
      let str=document.getElementById("text--title").innerText;
        currTitle.current=str;
    }
    setTimeout(()=>{
      pdfRef.current=document.getElementById('pdf--content');
    const content = pdfRef.current;
  
    const doc = new jsPDF();
    doc.html(content, {
        callback: function (doc) {
            doc.save(`${currTitle.current} Resume 2024.pdf`);
        },
        html2canvas: { scale: 0.26 } // change the scale to whatever number you need
    });
    },500);
  };
  

  const handleNonEditables=(e)=>{

    if(e.target && e.target.id && 
      (e.target.id.slice(0,2)==='cs' || e.target.id==="content--header") 
      &&(currStyle.layoutDivActive || currStyle.layoutGridActive) )
      {
        if(!currStyle.layoutGridActive||currStyle.layoutDivActive===true)
        setCurrStyle({...currStyle,layoutGridActive:true,layoutDivActive:false});
        document.getElementById(e.target.id).style.resize="both";
        document.getElementById(e.target.id).overflow="auto";
      setCurrEditingElement((prev)=>{
        if(prev && prev.style){
          if(prev.classList.contains("borderedDiv"))prev.classList.remove("borderedDiv");
          if(prev.classList.contains("selectedLayout"))prev.classList.remove("selectedLayout");
        }
        document.getElementById(e.target.id).classList.add("borderedDiv");
        return e.target;
      })
    }
    else if(e.target &&
       (e.target.classList.contains("devume--content") || 
       e.target.classList.contains("content--body--left") ||
        (e.target.classList.contains("content--body--right")))){
          if(currStyle.layoutGridActive||currStyle.layoutDivActive===false)
          setCurrStyle({...currStyle,layoutGridActive:false,layoutDivActive:true});

          setCurrEditingElement((prev)=>{
            if(prev && prev.classList.contains("selectedLayout")){
              prev.classList.remove("selectedLayout");
            }
            e.target.classList.add("selectedLayout");
            return e.target;
          });
    }
  }

  useEffect(()=>{
    if(currStyle.designAdvActive===true || currStyle.designFontActive===true || currStyle.animateActive===true){
          let eles=[...document.getElementsByClassName("highlightedDiv")]
          eles.map((item)=>{
            item.classList="content--section" ;
            item.style.border="";
          })
          setCurrStyle({...currStyle,layoutDivActive:false, layoutGridActive:false});
          setContentEdit(true);
          if(currEditingElement && currEditingElement.classList.contains('selectedLayout')){
            currEditingElement.classList.remove("selectedLayout");
          }
    }
    else if(currStyle.layoutDivActive===true || currStyle.layoutGridActive===true){
      if(currEditingElement){
        currEditingElement.classList.remove("selectedEle");
        currEditingElement.setAttribute("contentEditable",false);
        currEditingElement.style.border="";
      }
      setContentEdit(false);
      setCurrStyle({...currStyle,designAdvActive:false, designFontActive:false, animateActive:false});
      let eles=[...document.getElementsByClassName("content--section" )]
      eles.map((item)=>{
        item.classList="highlightedDiv content--section  ";
      });
      setContentEdit(false);
    }
    else{
      setContentEdit(false);
      if(currEditingElement){
        if(currEditingElement.classList.contains("selectedEle"))
        currEditingElement.classList.remove("selectedEle");
        if(currEditingElement.classList.contains("selectedLayout"))
        currEditingElement.classList.remove("selectedLayout");
        currEditingElement.setAttribute("contentEditable",false);
      }
      let eles=[...document.getElementsByClassName("highlightedDiv")]
          eles.map((item)=>{
            item.classList="content--section" ;
            item.style.border="";
            return item;
          })
    }
  },[currStyle.layoutDivActive,currStyle.layoutGridActive,currStyle.designAdvActive,currStyle.designFontActive,currStyle.animateActive]);

  useEffect(()=>{
    let ele;
    if(currEditingElement)ele=window.getComputedStyle(currEditingElement,null);
    if(currEditingElement){
      let fsize=ele.getPropertyValue("font-size");
      fsize=parseFloat(fsize.slice(0,fsize.length-2));
      let fweight=ele.getPropertyValue("font-weight");
      fweight=parseInt(fweight);
      let lspace=ele.getPropertyValue("letter-spacing");
      if(lspace==="normal")lspace="0px";
      lspace=parseFloat(lspace.slice(0,lspace.length-2));
      let colorEl=ele.getPropertyValue("color");
      const rgb2hex = (rgb) => `#${rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map(n => parseInt(n, 10).toString(16).padStart(2, '0')).join('')}`;
      if(colorEl[0]!=='#')colorEl=rgb2hex(colorEl);
      let opacityEl=ele.getPropertyValue('opacity');
      opacityEl=parseFloat(opacityEl);
      setCurrStyle({...currStyle,fontSize:fsize,fontWeight:fweight,letterSpacing:lspace,color:colorEl,opacity:opacityEl});
    }

    if(currEditingElement?.classList?.contains("borderedDiv")){
      console.log("borderedDiv present");
      // let arr=[...document.getElementsByClassName("borderedDiv")]
      // arr.map((items,index)=>{
      //   items.setAttribute("drag","x");
      //   items.setAttribute("dragControls",controls);
      //   console.log(items.tagName)
      // });
      
    }

  },[currEditingElement])



  const textVariant={
    leftInit:{
      x:-100,
      opacity:0,
      rotateZ:'-20deg'
    },
    leftAnimate:{
      x:0,
      rotateZ:'0deg',
      opacity:1,
      transition:{
        type:'spring',
        delay:0.4,
      }
    },
    rightInit:{
      x:100,
      opacity:0,
      rotateZ:'20deg',
    },
    rightAnimate:{
      x:0,
      rotateZ:'0deg',
      opacity:1,
      transition:{
        delay:0.4,
        type:'spring',
      }
    },
    upInit:{
      y:50,
      opacity:0
    },
    upAnimate:{
      y:0,
      opacity:1,
      transition:{
        delay:0.5,
        duration:2,
        type:'spring',
        stiffness:100,
        ease:"easeInOut"
      }
    },
    downInit:{
      y:-50,
      opacity:0
    },
    downAnimate:{
      y:0,
      opacity:1,
      transition:{
        delay:0.1,
        type:'spring',
        stiffness:60
      }
    },
    hover:{
      scale:1.01,
      y:1,
      transition:{
        ease:"easeInOut",
      }
    }
  }

  const svgVariant={
    svgInit:{
      pathLength:0,
      rotateZ:'-90deg',
    },
    svgAnimate:{
      pathLength:1,
      rotateZ:0,
      transition:{
        delay:0.8,
        type:'spring',
        stiffness:120,
        ease:"easeInOut",
      }
    },
    hover:{
      scale:1.01,
      y:[2,-1,0.5,-0.5,1],
      x:[2,-1,0.5,-0.5,1],
      transition:{
        ease:"easeInOut",
        yoyo:1,
        duration:1,
      }
    },
    splash:{
      scale:[1,1.01,1.01,1.03,1.04,1.05],
      opacity:[1,0.8,0.6,0.4,0.2,0],
      transition:{
        ease:"easeOut",
        yoyo:1,
      }
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

  useEffect(()=>{
    if(!isUserSignedIn)navigator("/");
  },[])
  
  return (
    <motion.div id="devume"   variants={myVariant} initial="hidden" animate="visible" exit="hidden" >
      <motion.div variants={textVariant} initial="downInit" animate="downAnimate"  className="devume--header" >
        <div>
          <Link to={"/"}>
          <motion.svg whileTap="splash" whileHover="hover" variants={svgVariant} initial="svgInit" animate="svgAnimate"
             className="homeIcon"
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                <path
                d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/>
                </motion.svg>
          </Link>
        <motion.h1
        style={{fontSize:20, fontFamily:'Roboto', fontWeight:200, display:'inline-block', marginLeft:20, textShadow:'1px 1px black'}} >
          {`${currTitle.current}_Resume_2024.pdf`}
        </motion.h1> 
        </div>
        <div>
        </div>
        <div>
        <motion.svg whileTap="splash" whileHover="hover" variants={svgVariant} initial="svgInit" animate="svgAnimate"  onClick={handleDownload} style={{cursor:"pointer"}} className="svgIcons" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M128 0C92.7 0 64 28.7 64 64v96h64V64H354.7L384 93.3V160h64V93.3c0-17-6.7-33.3-18.7-45.3L400 18.7C388 6.7 371.7 0 354.7 0H128zM384 352v32 64H128V384 368 352H384zm64 32h32c17.7 0 32-14.3 32-32V256c0-35.3-28.7-64-64-64H64c-35.3 0-64 28.7-64 64v96c0 17.7 14.3 32 32 32H64v64c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V384zM432 248a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"/></motion.svg>
        <motion.svg whileTap="splash" whileHover="hover" variants={svgVariant} initial="svgInit" animate="svgAnimate" onClick={handleDownload2} style={{cursor:"pointer"}} className="svgIcons" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32zM64 352c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V416c0-35.3-28.7-64-64-64H346.5l-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352H64zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"/></motion.svg>
        </div>
      </motion.div>


      <motion.div className="devume--area">
        <motion.div  id="pdf--content"  className="devume--content" onClick={(e)=>{
          if(contentEdit)handleClick(e);
          else handleNonEditables(e);
        }} >
          <motion.div
          dragElastic={1}
          className="content--section" drag dragConstraints={{top:0,left:10,bottom:0,right:10}}  id="content--header">
            <motion.h1 id="text--title" variants={textVariant} initial="upInit" animate="upAnimate" onChange={(e)=>currTitle.current=e.target.value}
  
            >SHIVAM KUMAR</motion.h1>
            <br />
            <motion.h4 variants={textVariant} initial="upInit" animate="upAnimate" > | Bachelors of Technology in Information Technology | </motion.h4>
            <br />
            <motion.h4 variants={textVariant} initial="upInit" animate="upAnimate" >
              |{" "}
              <motion.a variants={textVariant} initial="upInit" animate="upAnimate"
               href="mailto:shivkumar386112@gmail.com">
                mail: shivkumar386112
              </motion.a>{" "}
              | <motion.a variants={textVariant} initial="upInit" animate="upAnimate"
               href="tel:+918619975293">+91 861 997 5293</motion.a> | Raipur, C.G.
              492099 |
            </motion.h4>
          </motion.div>
          <hr />
          <motion.div  className="content--body">
            <motion.div   className="content--body--left">
              <motion.div  className="content--section" drag dragConstraints={{top:0,left:10,bottom:0,right:10}}  id={`cs-${cnt++}`} >
                <motion.h3 variants={textVariant} initial="upInit" animate="upAnimate" >EDUCATION</motion.h3>
                <br />
                <span className="eduction--span">
                  <motion.h2 variants={textVariant} initial="upInit" animate="upAnimate" >NIT RAIPUR, CHATTISGARH</motion.h2>
                  <br />
                  <motion.h5 variants={textVariant} initial="upInit" animate="upAnimate" >B.Tech in Information Technology</motion.h5>
                  <motion.h6 variants={textVariant} initial="upInit" animate="upAnimate" >
                    Dec 2020 - July 2024 |<br />
                    Cum. Grade: 8.31 CPI (Till Sem 5) |<br />
                    Raipur, Chattisgarh |
                  </motion.h6>
                </span>
                <span className="eduction--span">
                  <motion.h2 variants={textVariant} initial="upInit" animate="upAnimate" >MAA BHARTI</motion.h2>
                  <br />
                  <motion.h5 variants={textVariant} initial="upInit" animate="upAnimate" >Inter with Mathematics</motion.h5>
                  <motion.h6 variants={textVariant} initial="upInit" animate="upAnimate" >
                    May 2017-May 2019 |<br />
                    Total Marks: 408/500 (81.6%) |<br />
                    Kota, Rajasthan |
                  </motion.h6>
                  <br />
                </span>
                <span className="eduction--span">
                  <motion.h2 variants={textVariant} initial="upInit" animate="upAnimate" >RSVM</motion.h2>
                  <br />
                  <motion.h6 variants={textVariant} initial="upInit" animate="upAnimate" >
                    Matric. March 2017 |<br />
                    CGPA 10.0/10 |<br />
                    Dhanbad, Jharkhand |
                  </motion.h6>
                  <br />
                </span>
              </motion.div>

              <motion.div  className="content--section" drag dragConstraints={{top:0,left:10,bottom:0,right:10}}  id={`cs-${cnt++}`} >
                <motion.h3 variants={textVariant} initial="upInit" animate="upAnimate" >SKILLS</motion.h3>
                <br />
                <span className="skills--span">
                  <motion.h2 variants={textVariant} initial="upInit" animate="upAnimate" >TECHNICAL-SKILLS</motion.h2>
                  <br />
                  <motion.h6 variants={textVariant} initial="upInit" animate="upAnimate" >Proficiency</motion.h6>
                  <ul>
                    <motion.li
                    variants={textVariant} initial="upInit" animate="upAnimate"
                     >C++ / Javascript / Python</motion.li>
                    <motion.li
                    variants={textVariant} initial="upInit" animate="upAnimate"
                     >Object oriented programming</motion.li>
                    <motion.li
                    variants={textVariant} initial="upInit" animate="upAnimate"
                     >Data structures and algorithms</motion.li>
                    <motion.li
                    variants={textVariant} initial="upInit" animate="upAnimate"
                     >HTML/CSS</motion.li>
                  </ul>
                  <motion.h6 variants={textVariant} initial="upInit" animate="upAnimate" >Frameworks/Tools</motion.h6>
                  <ul>
                    <motion.li
                    variants={textVariant} initial="upInit" animate="upAnimate"
                     >React Js / Next Js</motion.li>
                    <motion.li
                    variants={textVariant} initial="upInit" animate="upAnimate"
                     >Node / Express</motion.li>
                    <motion.li
                    variants={textVariant} initial="upInit" animate="upAnimate"
                     >MongoDb / Firebase</motion.li>
                    <motion.li
                    variants={textVariant} initial="upInit" animate="upAnimate"
                     >SQL / GraphQL</motion.li>
                    <motion.li
                    variants={textVariant} initial="upInit" animate="upAnimate"
                     >Tailwind CSS/ Bootstrap</motion.li>
                  </ul>
                </span>
              </motion.div>

              <motion.div  className="content--section" drag dragConstraints={{top:0,left:10,bottom:0,right:10}}  id={`cs-${cnt++}`} >
                <motion.h3 variants={textVariant} initial="upInit" animate="upAnimate" >LINKS</motion.h3>
                <br />
                <span className="links--span">
                  <motion.h2 variants={textVariant} initial="upInit" animate="upAnimate" >PROFILES</motion.h2>
                  <br />
                  <ul>
                    <motion.li
                    variants={textVariant} initial="upInit" animate="upAnimate"
                     >
                      Hackerrank:{" "}
                      <motion.a variants={textVariant} initial="upInit" animate="upAnimate"
                       href="https://www.hackerrank.com/shivkumar386112">
                        shivkumar386112
                      </motion.a>
                    </motion.li>
                    <motion.li
                    variants={textVariant} initial="upInit" animate="upAnimate"
                     >
                      Leetcode:{" "}
                      <motion.a variants={textVariant} initial="upInit" animate="upAnimate"
                       href="https://www.hackerrank.com/shivkumar386112">
                        shivkumar386112
                      </motion.a>
                    </motion.li>
                    <motion.li
                    variants={textVariant} initial="upInit" animate="upAnimate"
                     >
                      Github:{" "}
                      <motion.a variants={textVariant} initial="upInit" animate="upAnimate"
                       href="https://github.com/itsme-shivamkumar">
                        itsme-shivamkumar
                      </motion.a>
                    </motion.li>
                    <motion.li
                    variants={textVariant} initial="upInit" animate="upAnimate"
                     >
                      LinkedIn:{" "}
                      <motion.a variants={textVariant} initial="upInit" animate="upAnimate"
                       href="https://www.linkedin.com/in/shivam-kumar-9575a7227/">
                        shivam kumar
                      </motion.a>
                    </motion.li>
                    <motion.li
                    variants={textVariant} initial="upInit" animate="upAnimate"
                     >
                      Codechef:{" "}
                      <motion.a variants={textVariant} initial="upInit" animate="upAnimate"
                       href="https://www.codechef.com/users/shivam_nitrr">
                        shivam_nitrr
                      </motion.a>
                    </motion.li>
                  </ul>
                </span>
              </motion.div>
            </motion.div>
            <motion.div  className="content--body--right">
              <motion.div  className="content--section" drag dragConstraints={{top:0,left:10,bottom:0,right:10}}  id={`cs-${cnt++}`} >
                <motion.h3 variants={textVariant} initial="upInit" animate="upAnimate" >EXPERIENCE | VIRTUAL</motion.h3>
                <br />
                <span className="experience--span">
                  <motion.h2 variants={textVariant} initial="upInit" animate="upAnimate" >JP MORGAN CHASE & CO</motion.h2>
                  <motion.h5 variants={textVariant} initial="upInit" animate="upAnimate" >Software Engineering Virtual Experience Program</motion.h5>
                  <motion.h6 variants={textVariant} initial="upInit" animate="upAnimate" >Nov 2022 - Dec 2022 | India</motion.h6>
                  <ul>
                    <motion.li
                    variants={textVariant} initial="upInit" animate="upAnimate"
                     >
                      Implemented systems for analyzing stock price data feeds
                      and determining accurate prices and ratios for efficient
                      trading decisions.
                    </motion.li>
                    <motion.li
                    variants={textVariant} initial="upInit" animate="upAnimate"
                     >
                      Implemented Perspective open-source code to improve data
                      visualization on a client-side web application using JPMC
                      frameworks and tools.
                    </motion.li>
                    <motion.li
                    variants={textVariant} initial="upInit" animate="upAnimate"
                     >
                      Created a live graph using Perspective to display data
                      feeds fortraders, enabling them to easily identify
                      potential trading opportunities
                    </motion.li>
                  </ul>
                </span>
              </motion.div>

              <motion.div  className="content--section" drag dragConstraints={{top:0,left:10,bottom:0,right:10}}  id={`cs-${cnt++}`} >
                <motion.h3 variants={textVariant} initial="upInit" animate="upAnimate" >PROJECTS</motion.h3>
                <br />
                <span className="project--span">
                  <motion.h2 variants={textVariant} initial="upInit" animate="upAnimate" >PROJECT 1</motion.h2>
                  <motion.h5 variants={textVariant} initial="upInit" animate="upAnimate" >| Advice Generator Website</motion.h5>
                  <br />
                  <motion.div variants={textVariant} initial="upInit" animate="upAnimate"  className="project--links">
                    <motion.a
                     href="https://itsme-shivamkumar.github.io/Advice-Generator-Website/">
                      Check Site Here
                    </motion.a>{" "}
                    |{" "}
                    <motion.a
                     href="https://github.com/itsme-shivamkumar/Advice-Generator-Website">
                      See Github Here
                    </motion.a>
                  </motion.div>
                  <ul>
                    <motion.li
                    variants={textVariant} initial="upInit" animate="upAnimate"
                     >
                      Designed and developed a website using Semantic HTML5
                      markup, CSS custom properties, and Flexbox.
                    </motion.li>
                    <motion.li
                    variants={textVariant} initial="upInit" animate="upAnimate"
                     >
                      Implemented asynchronous programming using Promises and
                      the Fetch API to retrieve and display advice from the
                      Advice Slip API.
                    </motion.li>
                    <motion.li
                    variants={textVariant} initial="upInit" animate="upAnimate"
                     >
                      Wrote a function called getAdvice() to handle the fetching
                      and display of advice, including error handling using the
                      .catch() method.
                    </motion.li>
                    <motion.li
                    variants={textVariant} initial="upInit" animate="upAnimate"
                     >
                      Created a functional and visually appealing website that
                      displayed random pieces of advice to users.
                    </motion.li>
                    <motion.li
                    variants={textVariant} initial="upInit" animate="upAnimate"
                     >
                      Improved skills in asynchronous programming and CSS
                      design.
                    </motion.li>
                  </ul>
                </span>
              </motion.div>

              <motion.div  className="content--section" drag dragConstraints={{top:0,left:10,bottom:0,right:10}}  id={`cs-${cnt++}`} >
                <motion.h3 variants={textVariant} initial="upInit" animate="upAnimate" >RELEVANT COURSEWORKS</motion.h3>
                <br />
                <span className="coursework--span">
                  <motion.h2 variants={textVariant} initial="upInit" animate="upAnimate" >UNIVERSITY COURSEWORKS</motion.h2>
                  <br />
                  <ul>
                    <motion.li
                    variants={textVariant} initial="upInit" animate="upAnimate"
                     >Analysis of Algorithms</motion.li>
                    <motion.li
                    variants={textVariant} initial="upInit" animate="upAnimate"
                     >Operating Systems</motion.li>
                    <motion.li
                    variants={textVariant} initial="upInit" animate="upAnimate"
                     >Database & Management Systems</motion.li>
                    <motion.li
                    variants={textVariant} initial="upInit" animate="upAnimate"
                     >Computer Networks</motion.li>
                    <motion.li
                    variants={textVariant} initial="upInit" animate="upAnimate"
                     >Sofware Engineering</motion.li>
                  </ul>
                </span>
              </motion.div>

              <motion.div  className="content--section" drag dragConstraints={{top:0,left:10,bottom:0,right:10}}  id={`cs-${cnt++}`} >
                <motion.h3 variants={textVariant} initial="upInit" animate="upAnimate" >ACHIEVEMENTS</motion.h3>
                <br />
                <span className="achievements--span">
                  <ul>
                    <motion.li
                    variants={textVariant} initial="upInit" animate="upAnimate"
                     >
                      Secured{" "}
                      <strong>Global Rank #64 out of 22886 participants</strong>{" "}
                      in STARTERS 64 CODECHEF CHALLENGE
                    </motion.li>
                    <motion.li
                    variants={textVariant} initial="upInit" animate="upAnimate"
                     >
                      Secured{" "}
                      <strong>
                        1206th rank globally in Google's CodeJam Farewell
                        Competition! Out of 8000+
                      </strong>{" "}
                      talented students,
                    </motion.li>
                  </ul>
                </span>
              </motion.div>

              <motion.div  className="content--section" drag dragConstraints={{top:0,left:10,bottom:0,right:10}}  id={`cs-${cnt++}`} >
                <motion.h3 variants={textVariant} initial="upInit" animate="upAnimate" >CERTIFICATIONS</motion.h3>
                <br />
                <span className="certifications--span">
                  <ul>
                    <motion.li
                    variants={textVariant} initial="upInit" animate="upAnimate"
                     >
                      <motion.a variants={textVariant} initial="upInit" animate="upAnimate"
                       href="https://www.hackerrank.com/certificates/280d51e1bea9">
                        <strong>Hackerrank Intermediate Problem Solving</strong>
                      </motion.a>
                    </motion.li>
                  </ul>
                </span>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div whileHover="hover" variants={textVariant} initial="rightInit" animate="rightAnimate" >
        <motion.div whileHover="hover" variants={textVariant} initial="rightInit" animate="rightAnimate" className="tools--right">
            <Tool tool="designFont"/>
            <Tool tool="designAdv"/>
        </motion.div>

        <motion.div   className="tools--left">
          <motion.div whileHover="hover" variants={textVariant} initial="rightInit" animate="rightAnimate">
          <Tool tool="layoutGrid"/>
          <Tool tool="layoutDiv"/>
          <Tool tool="animate"/>
          </motion.div>
        </motion.div>
        </motion.div>

      </motion.div>
    </motion.div>
  );
};

export default Devume;
