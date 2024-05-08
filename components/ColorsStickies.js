import styles from'../styles/main.module.css';
import {useState} from 'react';

export function ColorsStickies(props) {

    //const ref=useRef(null);
    const[currentSticky,setCurrentSticky]=useState({color:'gray'});
    
    const handleMessage = event => {
      // let currentText=ref.current.value;
       //currentSticky.text=currentText;
       setCurrentSticky({...currentSticky,text:event.target.value});
    }
    
return(
    <div>
        <textarea className={styles.textAreaAdd} style={{backgroundColor: currentSticky.color}}  onChange={handleMessage}></textarea>
        <div className={styles.flexContainer2}>
            <button className={styles.gray} onClick={() =>   {setCurrentSticky({...currentSticky, color: 'gray'})}} ></button>
            <button className={styles.yellow} onClick={() => {setCurrentSticky({...currentSticky, color: 'yellow'})}}></button>
            <button className={styles.aqua} onClick={() => {setCurrentSticky({...currentSticky, color: 'aqua'})}}></button>
            <button className={styles.pink} onClick={() => {setCurrentSticky({...currentSticky, color: 'pink'})}}></button>
            <button className={styles.purple} onClick={() => {setCurrentSticky({...currentSticky, color:'purple'})}}></button>
            <button className={styles.green} onClick={() => {setCurrentSticky({...currentSticky,color:'green'})}}></button>
      
            <div className={styles.flexContainer3}>
            <button onClick={()=> props.funcOk(currentSticky)}>OK</button>
            <button onClick={props.funcBack}>BACK</button>
          </div>
        </div>
    </div>
   
);

}