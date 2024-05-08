import Head from 'next/head';
import { Menu } from '../../components/menu';
import {useState} from 'react';
import {useRef} from 'react';
import * as React from 'react';
import styles from'../../styles/main.module.css';
import {ColorsStickies} from '../../components/ColorsStickies';
import Papa from 'papaparse';
import { CSVLink } from 'react-csv';

var indexId;
let myTitle;
let myDescription;

var myColor;
var myCounter=0;

export default function Application() {
  <>
  <Head><script src="https://cdn.rawgit.com/abdennour/react-csv/6424b500/cdn/react-csv-latest.min.js" type="text/javascript"></script></Head>
  </>

  const [show, setShow]=React.useState(false);
  const [back, setBack]=React.useState(true);
  const [okay, setOkay]=React.useState(true);

  const [edit, setEdit]=useState(false);
  const [editBack,setEditBack]= useState(true);
  const [editOk, setEdiitOk]=useState(true);

  const[importSticky,setImportSticky]=useState(false);
  const [exportSticky,setExportSticky]= useState(false);

  var[counter,setCounter]=useState(0);
  const updateVote=(item) => {
    counter=item.vote;
    setCounter(counter);
  }
  
  const[editSticky,setEditSticky]=useState(false);
  var[currentSticky,setCurrentSticky]=useState({color:'gray'});
  const ref=useRef(null);

  const handleMessage = event => {
    let currentText=ref.current.value;
    currentSticky.text=currentText;
 }
  const clickBackEdit = () => {
    setEditSticky(!editSticky);
   // console.log(currentColor);
  setCurrentSticky(currentSticky.color=myColor);
  myColor=null;
  myCounter=0;
  }

  const newEditedSticky = (item) => {

    const updateSticky=stickies.findIndex((obj) => 
     obj.id===item.id);

    stickies[updateSticky].select=item.select;
    stickies[updateSticky].color=item.color;
    stickies[updateSticky].text=item.text;
    myCounter=0;
    myColor=null;
    setEditSticky(!editSticky);
   
  };
  
  var[stickies,setStickies]=useState([]);
  const addSticky=(sticky) => {
   var newStickies=[...stickies,sticky];
    setStickies(newStickies);
  }

 const[changeDesc,setChangeDesc]= useState();
 const ref1=useRef(null);
 let newDescription;

 const getDescription = event => {
    newDescription=ref1.current.value;
 }
 const ref4=useRef(null);
  const changeDescription = () => {
    setChangeDesc(newDescription);
    //myDescription=ref4.current.value;
    myDescription=newDescription;
    console.log(myDescription);
  }

  const[changeTitle,setChangeTitle]=useState();
  const ref2=useRef(null);
  let newTitle;

  const getTitle = event => {
    newTitle=ref2.current.value;
  }
  const ref3=useRef(null);
  const changeNewTitle = () => {
    setChangeTitle(newTitle);
    //myTitle=ref3.current.value;
    myTitle=newTitle;
    console.log(myTitle);
  }

  const[checked, setChecked]=React.useState(false);

  const handleChange = () => {
    setChecked(!checked);
   // console.log(checked);
  }
  const checkSticky = (item) => {
    const nextStickies=stickies.map(current => {
      if(current.id===item.id){
        myColor=current.color;
        return{...item, select: !item.select}
      }
      return current;
  });
    setStickies(nextStickies);
   // console.log(nextStickies);
  }

const[boards,setBoards]=useState([]);
const addBoard=(board)=> {
  var newBoard=[...boards,board];
  setBoards(newBoard);
}

const[allBoards,setAllBoards]= useState(false);
const viewBoards= () => {
  setAllBoards(!allBoards);
  //console.log(allBoards);
}

  const settings={
    show,
    setShow,
    edit,
    setEdit,
    editSticky,
    setEditSticky,
    stickies,
    setStickies,
    boards,
    setBoards,
    addBoard,
    myTitle,
    myDescription,
    viewBoards,
    importSticky,
    setImportSticky,
    exportSticky,
    setExportSticky
  };

 
  const ClickBack = () => {
    setBack(back);
    setShow(!show);
    console.log(show);
  }

  const ClickOkay=(currentSticky) => {
      setOkay(okay);
      setShow(!show);
  
   indexId=stickies.length+1;
   currentSticky.id=indexId;
   currentSticky.select=false;
   currentSticky.vote=0;
   indexId+=1;

   stickies.push(currentSticky);
   console.log(stickies);
  }

  const  ClickEditBack = () => {
    setEditBack(editBack);
    setEdit(!edit);
  }
  const clickEditOkay = () => {
    setEdiitOk(editOk);
    setEdit(!edit);

    changeDescription();
    changeNewTitle();
    
  }

  const increase=(item) => {
    item.vote=item.vote+1;;
    updateVote(item);
   //console.log(stickies);
  }
  const decrease = (item) => {
    if(item.vote>0)
    {
        item.vote=item.vote-1;
        updateVote(item);
      console.log(stickies);
    }
}
//import
const [file, setFile] = useState("");
const [error,setError]= useState("");
const allowedExtensions = ["csv"];
const [isImport,SetIsImport]= useState(false);


const handleOnChange = (event) => {
       setError("");

       if(event.target.files.length) {
        const inputFile=event.target.files[0];

        const  fileExtension=inputFile?.type.split("/")[1];
        if (!allowedExtensions.includes(fileExtension)) {
          setError("Please input a csv file");
          return;
        }
          setFile(inputFile);
         // console.log(inputFile);
       }

       Papa.parse(event.target.files[0],
        {
         delimiter: [','],
      
          complete: function (results) {
           // console.log(results.data)
           
            for(let i=1; i<results.data.length; i++){
              var myObject={};
              myObject.color=results.data[i][0];
              myObject.id=parseInt(results.data[i][1]);
              let select=results.data[i][2];
              let boolValue=(select === "true");
              myObject.select=boolValue;
              myObject.vote=parseInt(results.data[i][3]);
              stickies.push(myObject);
            }
            console.log(stickies);

          }})
}
//click in ImportCSV File=>  only render stickies from stickies
const handleParse = () => {
  SetIsImport(!isImport);
  setImportSticky(!importSticky);
}

  return (
  <>
       <Head>
        <title>My application</title>
      </Head>
     
      <div className={styles.app}>
     <Menu settings={settings}/>
        {
           back && show &&
          <div className={styles.addMenu}>
           <ColorsStickies funcOk={ClickOkay} funcBack={ClickBack} /> 
        </div>
        }
        {
          edit && <div className={styles.menu}>
          <div className={styles.editMenu}>
          <p className={styles.editText}>Edit title:</p>
          <div><textarea ref={ref2} onChange={getTitle}></textarea></div>
          <p className={styles.editText}>Edit description:</p>
          <div><textarea ref={ref1} onChange={getDescription}></textarea></div>
          <div className={styles.flexContainer1}>
          <button onClick={clickEditOkay}>OK</button>
          <button onClick={ClickEditBack}>BACK</button>
          </div>
         </div>
          </div>
        }

     <div className={styles.MainBoard}>
      <div className={styles.flex}>
     <div className={styles.titleBox}>
            <p className={styles.labelTitile}>Title of board:</p>
            <textarea className={styles.titleText} ref={ref3} value={changeTitle} onChange={changeNewTitle}  ></textarea>
      </div>
      <div className={styles.descriptionZone}>
          <p className={styles.description}>Descripton of board:</p>
          <div><textarea className={styles.textDescription} ref={ref4} value={changeDesc} onChange={changeDescription}></textarea></div>
      </div>
      </div>

  <div className={styles.flexContainerSticky}> 
      {
            (isImport || stickies) && stickies.map(item => 
          
                <div style={{backgroundColor:item.color}} key={item.id}>
                <div style={{backgroundColor:item.color}}>{item.text}</div>
               
              <div className={styles.voteMenu}>
              <p className={styles.counter}>{item.vote}</p>
              <button onClick={() => {decrease(item)}}>-</button>
              <button onClick={() => {increase(item)}}>+</button>
              </div>
  
                <input className={styles.selectBox} type='checkbox' value={item.select} onChange={() => {checkSticky(item)}} onClick={handleChange}/>
               
              <div>
               
                 
                   {stickies.map(item => {
                    if(item.select)
                    {
                      if(myCounter===0)
                      {
                        myColor=item.color;
                        myCounter=1;
                      }
                      currentSticky=item;
                      console.log(myColor);
                      
                    }
                  }
                  )}
               </div>

              </div>
            )
      }
      {
          allBoards && boards.map(currentBoard =>
            <div className={styles.view} key={currentBoard.title}>
            <div>{currentBoard.title}</div>
            <div>{currentBoard.description}</div>
            </div>
          )
      }
       </div> 
  
       {
        editSticky && currentSticky &&
        <div className={styles.editApp}>
        <textarea className={styles.textAreaAdd2} style={{backgroundColor: currentSticky.color}} value={currentSticky.text} ref={ref4} onChange={handleMessage}  ></textarea>
        <div className={styles.flexContainer2}>
         <button className={styles.gray} onClick={()=> {setCurrentSticky(...currentSticky.color='gray')}}></button>
         <button className={styles.yellow} onClick={() => {setCurrentSticky(...currentSticky.color='yellow')}}></button>
         <button className={styles.aqua} onClick={() => {setCurrentSticky(...currentSticky.color='aqua')}}></button>
         <button className={styles.pink} onClick={() => {setCurrentSticky(...currentSticky.color='pink')}}></button>
         <button className={styles.purple} onClick={() => {setCurrentSticky(...currentSticky.color='purple')}}></button>
         <button className={styles.green} onClick={() => {setCurrentSticky(...currentSticky.color='green')}}></button>
   
         <div className={styles.flexContainer3}>
         <button onClick={()=>{newEditedSticky(currentSticky)}}>OK</button>
         <button onClick={clickBackEdit}>BACK</button>
       </div>
     </div>
     </div>
      
      }

      { importSticky && <div>
         <form className={styles.import}>
            <h2>Import sticky</h2>
             <input type={"file"} accept={".csv"} onChange={handleOnChange} />
             <button className={styles.button} onClick={handleParse} >IMPORT CSV FILE</button>
         </form>

         </div>
     
     }
      {
       exportSticky && <div className={styles.download}>
          <CSVLink data={stickies} style={{color:'black'}}>Download CSV file</CSVLink>
        </div>
      }

        
      </div>
  </div> 
   
  </>
  );
}