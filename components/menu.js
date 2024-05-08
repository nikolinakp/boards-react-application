import styles from'../styles/main.module.css';
import Link from 'next/link';
//import {useRef, useState} from 'react';
//import { CSVLink, CSVDownload } from "react-csv";

export function Menu({settings}) {

  const createButton = () => {
    settings.setShow(!settings.show);
   // console.log(settings.show);
  };
  const editButton = () => {
    settings.setEdit(!settings.edit);
    //console.log(settings.edit);
  }
  const isEditSticky = () => {
    settings.setEditSticky(!settings.editSticky);
    //console.log(settings.editSticky);
  }
  const deleteButton = () => {
  const updatedArray=settings.stickies.filter((element) => element.select !== true);
  settings.setStickies(updatedArray);
    //console.log(updatedArray);
  }
   
  const SortStickies=() => {
    const sortedArray=[...settings.stickies].sort((a,b) => a.color > b.color ? 1: -1);
    settings.setStickies(sortedArray);
     console.log(sortedArray);
  }
  
  const saveCurrentBoard=() => {

   var current={};
   current.title=settings.myTitle;
   current.description=settings.myDescription;
   current.stickies=settings.stickies;
   settings.boards.push(current);
    console.log(settings.boards);

    //clear all
    const clearedArray=settings.stickies.filter((element) => element.id < 0);
    settings.setStickies(clearedArray);
    //settings.myTitle='';
    //settings.myDescription='';

}

const clickImport = () => {
  settings.setImportSticky(!settings.importSticky);
  //console.log(settings.importSticky);
}

const clickExport = () => {
  settings.setExportSticky(!settings.exportSticky);
  console.log(settings.exportSticky);
}

    return(
   
    <div className={styles.Menu}>
         <label className={styles.menuLabel}>Menu</label>
          <div className={styles.menu1}>
            <label className={styles.options}>Board Options:</label> 
            <button className={styles.finish}onClick={editButton}>Fill Board</button>
            <button className={styles.finish}onClick={settings.viewBoards}>View Boards</button>
            <button className={styles.finish}onClick={saveCurrentBoard}>Save Boards</button>
          </div>
          <div className={styles.menu2}>
            <label className={styles.options}>Task options:</label>

            <button className={styles.finish} onClick={createButton}>Create Task</button>

            <button className={styles.finish} onClick={isEditSticky}> Edit Task</button>
            <button className={styles.finish}onClick={deleteButton}>Delete Task</button>
            <button className={styles.finish} onClick={clickImport}> Import Task</button>
            <button className={styles.finish} onClick={clickExport}>Export Task</button>
            <button className={styles.finish} onClick={SortStickies}>Group Task by color</button>
            <h3 className={styles.title}><Link href="/">Back to main page</Link></h3>
          </div>
      </div>
     
    );
}