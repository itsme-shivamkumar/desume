import React, { useEffect, useContext, useState } from "react";
import { AppContext } from "../App";
import {motion} from 'framer-motion';

const Tool = ({ tool }) => {
  const { currStyle, setCurrStyle, currEditingElement } =
    useContext(AppContext);
  const [toolVisible, setToolVisible] = useState({
    layoutDiv: false,
    layoutGrid: false,
    designFont: false,
    designAdv: false,
    animate: false,
  });
  useEffect(() => {
    switch (tool) {
      case "layoutGrid":
        setToolVisible({ ...toolVisible, layoutGrid: true });
        break;
      case "layoutDiv":
        setToolVisible({ ...toolVisible, layoutDiv: true });
        break;
      case "designFont":
        setToolVisible({ ...toolVisible, designFont: true });
        break;
      case "designAdv":
        setToolVisible({ ...toolVisible, designAdv: true });
        break;
      default:
        setToolVisible({ ...toolVisible, animate: true });
        break;
    }
  }, []);

  // function getSelectedText() {
  //   var selectedText = '';

  //   // window.getSelection
  //   if (window.getSelection) {
  //       selectedText = window.getSelection().toString();
  //   }
  //   // document.getSelection
  //   else if (document.getSelection) {
  //       selectedText = document.getSelection().toString();
  //   }
  //   // document.selection
  //   else if (document.selection) {
  //       selectedText =
  //           document.selection.createRange().text;
  //   } else return;
  //   // To write the selected text into the textarea
  //   return selectedText;
  // }
  // const handleHighlighted=(e)=>{
  //   let st=getSelectedText();
  //   if(st){
  //     console.log(st,e.target);
  //   }
  // }

  const handleClick = (e) => {
    console.log(e.target.id);
    switch (e.target.id) {
      case "after":
        setCurrStyle({ ...currStyle, after: !currStyle.after });
        break;
      case "before":
        setCurrStyle({ ...currStyle, before: !currStyle.before });
        break;
      case "append":
        setCurrStyle({ ...currStyle, append: !currStyle.append });
        break;
      case "prepend":
        setCurrStyle({ ...currStyle, prepend: !currStyle.prepend });
        break;
      case "del":
        setCurrStyle({ ...currStyle, del: !currStyle.del });
        break;
      default:
        break;
    }
  };

  const handleChange = (e) => {
    switch (e.target.name) {
      case "gridSliderCol":
        setCurrStyle({ ...currStyle, col: parseInt(e.target.value) });
        break;
      case "gridSliderRow":
        setCurrStyle({ ...currStyle, row: parseInt(e.target.value) });
        break;
      case "gridSliderSpanRow":
        setCurrStyle({ ...currStyle, spanRow: parseInt(e.target.value) });
        break;
      case "gridSliderSpanCol":
        setCurrStyle({ ...currStyle, spanCol: parseInt(e.target.value) });
        break;
      case "fontsize--dimension":
        setCurrStyle({ ...currStyle, fontSizeDim: e.target.value });
        break;
      case "letterspacing--dimension":
        setCurrStyle({ ...currStyle, letterSpacingDim: e.target.value });
        break;
      case "fontweight":
        setCurrStyle({ ...currStyle, fontWeight: parseInt(e.target.value) });
        break;
      case "color":
        setCurrStyle({ ...currStyle, color: e.target.value });
        break;
      case "fontsize":
        setCurrStyle({ ...currStyle, fontSize: parseFloat(e.target.value) });
        break;
      case "opacity":
        setCurrStyle({ ...currStyle, opacity: parseFloat(e.target.value) });
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (currEditingElement) {
      let ele = currEditingElement.style;
      ele.fontSize = `${currStyle.fontSize}${currStyle.fontSizeDim}`;
      ele.fontWeight = currStyle.fontWeight;
      currStyle.letterSpacing !== 0
        ? (ele.letterSpacing = `${currStyle.letterSpacing}${currStyle.letterSpacingDim}`)
        : (ele.letterSpacing = "normal");
      ele.color = currStyle.color;
      ele.opacity = currStyle.opacity;
      
      // ele.gridColumn=`auto / span ${currStyle.spanCol}`;
      // ele.gridRow=`auto / span ${currStyle.spanRow}`;
    }
  }, [currStyle]);

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

  return (
    <div className="tools--section">
      {toolVisible.layoutGrid && (
        <div className="layout--grid">
          <h2
            onClick={() =>
              setCurrStyle({
                ...currStyle,
                layoutGridActive: !currStyle.layoutGridActive,
                designAdvActive: false,
                animateActive: false,
                designFontActive: false,
              })
            }
          >
            Change Layout
            <motion.svg whileTap="splash" whileHover="hover" variants={svgVariant} initial="svgInit" animate="svgAnimate"
             className="svgIcons" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z"/></motion.svg>
          </h2>
          {currStyle.layoutGridActive && (
            <>
              <div className="property">
                {"No. of grid columns: " + currStyle.col}
                <br />
                <input
                  type="range"
                  name="gridSliderCol"
                  min={1}
                  max={12}
                  step={1}
                  value={currStyle.col}
                  onChange={handleChange}
                />
              </div>
              <div className="property">
                {"No. of grid rows: " + currStyle.row}
                <br />
                <input
                  type="range"
                  name="gridSliderRow"
                  min={1}
                  max={12}
                  step={1}
                  value={currStyle.row}
                  onChange={handleChange}
                />
              </div>
              <div className="property">
                {"Span cols: " + currStyle.spanCol}
                <br />
                <input
                  type="range"
                  name="gridSliderSpanCol"
                  min={0}
                  max={parseInt(currStyle.col)}
                  step={1}
                  value={currStyle.spanCol}
                  onChange={handleChange}
                />
              </div>
              <div className="property">
                {"Span rows: " + currStyle.spanRow}
                <br />
                <input
                  type="range"
                  name="gridSliderSpanRow"
                  min={0}
                  max={parseInt(currStyle.row)}
                  step={1}
                  value={currStyle.spanRow}
                  onChange={handleChange}
                />
              </div>
            </>
          )}
        </div>
      )}
      {toolVisible.layoutDiv && (
        <div className="layout--div">
          <h2
            onClick={() =>
              setCurrStyle({
                ...currStyle,
                layoutDivActive: !currStyle.layoutDivActive,
                designAdvActive: false,
                animateActive: false,
                designFontActive: false,
              })
            }
          >
            Add or Remove Div
            <motion.svg whileTap="splash" whileHover="hover" variants={svgVariant} initial="svgInit" animate="svgAnimate"
             className="svgIcons" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z"/></motion.svg>
          </h2>
          {currStyle.layoutDivActive && (
            <>
              <div className="property">
                <button id="after" onClick={handleClick}>
                  Add: After
                </button>
                <br />
                <button id="before" onClick={handleClick}>
                  Add: Before
                </button>
                <br />
                <button id="prepend" onClick={handleClick}>
                  Add: Prepend
                </button>
                <br />
                <button id="append" onClick={handleClick}>
                  Add: Append
                </button>
                <br />
                <button id="del" onClick={handleClick}>
                  Delete Selected
                </button>
              </div>
            </>
          )}
        </div>
      )}
      {toolVisible.designFont && (
        <div className="design--font">
          <h2
            onClick={() =>
              setCurrStyle({
                ...currStyle,
                designFontActive: !currStyle.designFontActive,
                layoutDivActive: false,
                layoutGridActive: false,
              })
            }
          >
            Style text and font
            <motion.svg whileTap="splash" whileHover="hover" variants={svgVariant} initial="svgInit" animate="svgAnimate"
             className="svgIcons" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M352 144c0-44.2 35.8-80 80-80s80 35.8 80 80v48c0 17.7 14.3 32 32 32s32-14.3 32-32V144C576 64.5 511.5 0 432 0S288 64.5 288 144v48H64c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V256c0-35.3-28.7-64-64-64H352V144z"/></motion.svg>
          </h2>
          {currStyle.designFontActive && (
            <>
              <div className="property">
                <label>
                  Font Size :
                  <select
                    name="fontsize--dimension"
                    onChange={handleChange}
                    defaultValue={currStyle.fontSizeDim}
                  >
                    <optgroup>
                      <option name="fsizepx" value="px">
                        px
                      </option>
                      <option name="fsizerem" value="rem">
                        rem
                      </option>
                      <option name="fsize%" value="%">
                        %
                      </option>
                      <option name="fsizevw" value="vw">
                        vw
                      </option>
                    </optgroup>
                  </select>
                  <input
                    type="number"
                    name="fontsize"
                    value={currStyle.fontSize}
                    onChange={handleChange}
                  />
                </label>
              </div>

              <div className="property">
                <label>
                  Font Weight :
                  <select
                    name="fontweight"
                    onChange={handleChange}
                    value={parseInt(currStyle.fontWeight)}
                  >
                    <optgroup>
                      <option name="fw100" value="100">
                        100
                      </option>
                      <option name="fw200" value="200">
                        200
                      </option>
                      <option name="fw300" value="300">
                        300
                      </option>
                      <option name="fw400" value="400">
                        400
                      </option>
                      <option name="fw500" value="500">
                        500
                      </option>
                      <option name="fw600" value="600">
                        600
                      </option>
                      <option name="fw700" value="700">
                        700
                      </option>
                      <option name="fw800" value="800">
                        800
                      </option>
                    </optgroup>
                  </select>
                </label>
              </div>

              <div className="property">
                <label>
                  Letter spacing :
                  <select
                    name="letterspacing--dimension"
                    onChange={handleChange}
                    value={currStyle.letterSpacingDim}
                  >
                    <optgroup>
                      <option name="lspx" value="px">
                        px
                      </option>
                      <option name="lsrem" value="rem">
                        rem
                      </option>
                      <option name="ls%" value="%">
                        %
                      </option>
                      <option name="lsvw" value="vw">
                        vw
                      </option>
                    </optgroup>
                  </select>
                  <input
                    type="number"
                    onChange={(e) =>
                      setCurrStyle({
                        ...currStyle,
                        letterSpacing: parseFloat(e.target.value),
                      })
                    }
                    value={currStyle.letterSpacing}
                  />
                </label>
              </div>

              <div className="property">
                <label>
                  Color :
                  <input
                    type="color"
                    name="color"
                    value={currStyle.color}
                    onChange={handleChange}
                  />
                </label>
              </div>

              <div className="property">
                <label>
                  <input
                    type="range"
                    value={currStyle.opacity}
                    step={0.1}
                    min={0}
                    max={1}
                    onChange={handleChange}
                    name="opacity"
                  />
                  Opacity :<span>{currStyle.opacity}</span>
                </label>
              </div>

            </>
          )}
        </div>
      )}
      {toolVisible.animate && (
        <div className="animate">
          <h2
            onClick={() =>
              setCurrStyle({
                ...currStyle,
                animateActive: !currStyle.animateActive,
                layoutDivActive: false,
                layoutGridActive: false,
              })
            }
          >
            Animate Resume
            <motion.svg whileTap="splash" whileHover="hover" variants={svgVariant} initial="svgInit" animate="svgAnimate"
             className="svgIcons" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z"/></motion.svg>
          </h2>
          {currStyle.animateActive && <></>}
        </div>
      )}
      {toolVisible.designAdv && (
        <div className="design--adv">
          <h2
            onClick={() =>
              setCurrStyle({
                ...currStyle,
                designAdvActive: !currStyle.designAdvActive,
                layoutDivActive: false,
                layoutGridActive: false,
              })
            }
          >
            Advanced Styling
            <motion.svg whileTap="splash" whileHover="hover" variants={svgVariant} initial="svgInit" animate="svgAnimate"
             className="svgIcons" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M352 144c0-44.2 35.8-80 80-80s80 35.8 80 80v48c0 17.7 14.3 32 32 32s32-14.3 32-32V144C576 64.5 511.5 0 432 0S288 64.5 288 144v48H64c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V256c0-35.3-28.7-64-64-64H352V144z"/></motion.svg>
          </h2>
          {currStyle.designAdvActive && <>
            <hr style={{width:'inherit'}} />
            <h4 style={{fontWeight:200,marginTop:5}}>{"1. Add the html directly along with inline--styling:"}</h4>
            <input  id="adv--input" type="text" placeholder="<h2 style=''>My Text: <a href='www.jsonplaceholder.com'>My link</a></h2>" value={currStyle.currEleText} onChange={(e)=>setCurrStyle({...currStyle,currEleText:e.target.value})} />
            <h4 style={{fontWeight:200,marginTop:5}}>{"2. Select the element you want to change:"}</h4>
            <button className="adv--btn" onClick={(e)=>{
              currEditingElement.innerHTML=currStyle.currEleText;
              currEditingElement.classList.add("newItem");
              setCurrStyle({...currStyle,currEleText:""});
            }} >Change</button>
            <hr style={{width:'inherit',marginTop:10}} />
            <h4 style={{fontWeight:200,marginTop:5}}>{"3. To delete an element (select and click below)"}</h4>
            <button className="adv--btn" onClick={()=>{
              if(currEditingElement)currEditingElement.style.display="none";
            }} >Delete</button>

          </>}
        </div>
      )}
    </div>
  );
};

export default Tool;
