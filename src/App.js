import './App.css';
import { useReducer, useState } from 'react';
import React from 'react';
import Task from './Task.js';
import User from './User.js';

let today = new Date();
let [priority, setPriority] = [1,1];
let [display, setDisplay] = [1, 1];
let [focusedMonth, setFocusedMonth] = [1, 1];
let currYear;
let [focusedTask, setFocusedTask] = [1, 1];
let [date, setDate] = [1, 1];
let [time, setTime] = [1, 1];
let [title, setTitle] = [1, 1];
let [description, setDescription] = [1, 1];
let [year, setYear] = [1,1];
let [compVisible, setCompVisible] = [1,1]
let [focusedDay, setFocusedDay] = [1, 1];
let [user, setUser] = [1,1];
let [sortStyle, setSortStyle] = [1,1];
const mOfYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const defaultUser = new User;
const App=()=>{
  [priority, setPriority] = useState(1);
  [sortStyle, setSortStyle] = useState('prio');
  [display, setDisplay] = useState('none');
  [focusedTask, setFocusedTask] = useState(0);
  [focusedDay, setFocusedDay] = useState(1);
  [focusedMonth, setFocusedMonth] = useState(0);
  [date, setDate]  = useState('12/22/2021');
  [time, setTime]  = useState('hh:mm AM/PM');
  [title, setTitle]  = useState('');
  [description, setDescription]  = useState('');
  [year, setYear] = useState(`${today.getFullYear()}`);
  [user, setUser] = useState(defaultUser);
  const [mVisuals, setMVisuals] = useState(['','','','','','','','','','','','']);
  [compVisible, setCompVisible] = useState(['block', 'none', 'none']);
  return (
    <div>
      <div
      className='bg'
      style={{display: `${compVisible[0]}`}}>
        {taskCreate()}
        {Calendar([mVisuals, setMVisuals])}
        
      </div>
      <div
      className='bg'
      style={{display: `${compVisible[1]}`}}>
        {MonthWindow()}
        <button
        className='taskCreateInput'
        style={{width: '9em', height: "2em", textAlign: "center"}}
        onClick={()=>{
          setCompVisible(['block', 'none', 'none']);
        }}>
          {`Back`}
        </button>
      </div>
      <div
      className='bg'
      style={{display: `${compVisible[2]}`}}>
        {dayWindow()}
        <button
        className='taskCreateInput'
        style={{width: '9em', height: "2em", textAlign: "center"}}
        onClick={()=>{
          setCompVisible(['none', 'block', 'none']);
        }}>
          {`Back`}
        </button>
      </div>
    </div>
  );
}
const taskCreate = () =>{
  const options = [['Date:', 'Time:', 'Title:', 'Description:', `Priority: ${priority}`],['65', '65', '67.5', '42', '50','55'],['25', '25', '22.5', '48', '40', '35'],['text', 'text',  'text', 'text', 'text'], ['mm/dd/yyyy', 'hh:mm AM/PM','', '', 'none']]
  const getStyle = (i) => {
    if(i!=4)
      return({
        left:`${options[2][i]}%`, 
        width: `${options[1][i]}%`,
        top: `${10*i + 10}%`
      });
    else
      return({
        left:`${options[2][i]}%`, 
        width: `${options[1][i]}%`,
        top: `${53}%`
      });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if(date.split("/")[0].length == 2 && date.split("/")[1].length == 2 && date.split("/")[2].length == 4 && !isNaN(date.split("/")[0])&& !isNaN(date.split("/")[1])&& !isNaN(date.split("/")[2])){
      let task = new Task;
      task.newTask(date, time, title, description, priority);
      user.addTask(task);
    } else alert("Your date is likely formated incorrectly. Try doing so in the mm/dd/yyyy format");
  }
  return(
    <div
    className='taskCreateWindow'>
        <form onSubmit={handleSubmit}>
            <label
            className='taskCreateTitle'>
                Create Task
            </label>
            {
                options[0].map((option, i) => 
                    <label 
                    className='taskCreateTxt' 
                    style={{top: `${10*i + 10}%`}}>
                        {option}
                    </label>
                )
            }
            <input
            className="taskCreateInput"
            type="text"
            required
            value={date}
            onChange = {(e)=>{setDate(e.target.value)}}
            style = {getStyle(0)}
            />
            <input
            className="taskCreateInput"
            type="text"
            required
            value={time}
            onChange = {(e)=>{setTime(e.target.value)}}
            style = {getStyle(1)}
            />
            <input
            className="taskCreateInput"
            type="text"
            required
            value={title}
            onChange = {(e)=>{setTitle(e.target.value)}}
            style = {getStyle(2)}
            />
            <input
            className="taskCreateInput"
            type="text"
            required
            value={description}
            onChange = {(e)=>{setDescription(e.target.value)}}
            style = {getStyle(3)}
            />
            <input
            className="taskCreateInput"
            type="range"
            required
            min={1}
            max={5}
            value={priority}
            onChange={(e)=>setPriority(e.target.value)}
            style={getStyle(4)}
            />
            <button
            style = {{position: 'absolute', top: '80%', height: '10%', width: '40%', left: '30%'}}>
              Create
            </button>
        </form>
    </div>
  );
}
const Calendar = ([mVisuals, setMVisuals]) => {
  currYear = String(today.getFullYear());
  let style;
  const monthFocus=(month)=>{
    setFocusedMonth(month);
    setCompVisible(['none', 'block', 'none']);
  }
  const getMonths=()=>{
    let Months=[];
    for(let x = 0; x < 12; x++){
      Months.push(x);
    }
    return(Months);
  }
  const getMonthVisuals=(i)=>{
    let components = [];
    user.getCalendar().getDatesWithTasks().forEach(xYear => {
      if(xYear.getYear() == currYear){
        xYear.getMonths().forEach(month => {
          if(parseInt(month.getTotalPrio()) > 0){
            let tempArr = mVisuals;
            tempArr[month.getMonth()-1] = `Tasks: ${month.getTotalTasks()}... ☆: ${month.getTotalPrio()}`;
            setMVisuals(tempArr);
          }
          else{
            let tempArr = mVisuals;
            tempArr[month.getMonth()-1] = '';
            setMVisuals(tempArr);
          }
        });
        return;
      }
      else{
        setMVisuals(['','','','','','','','','','','','']);
      }
    });
  }
  return(
    <div 
    className="Calendar">
      <label className='Year'>{year}</label>
      {
        getMonths().map(month => {
            if(month < 4){
            style = {
                top: `13%`,
                left: `${24.67*(month%4)+(month%4)*.3+.25}%`
            }
            } else if(month < 8){
            style = {
                top: `42%`,
                left: `${24.67*(month%4)+(month%4)*.3+.25}%`
            }
            } else{
            style = {
                top: `71%`,
                left: `${24.67*(month%4)+(month%4)*.3+.25}%`
            }
            }
            return(
              <div 
              className="Month" style = {style}>
                  <body 
                  className = "mText">
                    {mOfYear[month]}
                  </body>
                  <label className='mText' style = {{left: "40%", position: 'absolute'}}>
                    {
                      mVisuals[month]
                    }
                  </label>
                  <button 
                  className = 'monthButton' 
                  onClick = {() => monthFocus(month)} >
                  </button>
              </div>
            );
        })
      }
      <button className='taskCreateInput' style = {{position: 'absolute', left: '35%', width: '2em', top: "3%"}} onClick = {()=>{currYear = parseInt(year)-1; setYear(currYear);  getMonthVisuals(); }}>←</button>
      <button className='taskCreateInput' style = {{position: 'absolute', left: '57%', width: '2em', top: "3%"}} onClick = {()=>{currYear = parseInt(year)+1; setYear(currYear); getMonthVisuals(); }}>→</button>
    </div>
  );
}
const MonthWindow=()=>{
  const getDayWindows=()=>{
    let components = [];
    let numOfDays = new Date(year, focusedMonth + 1, 0).getDate()
    let x = 0;
    for(let z = 1;x < numOfDays; z++){
      for(let y = 0; y < 7 && x < numOfDays; y++){
        components.push(<button value={`${x+1}`} onClick={(e)=>{
          setFocusedDay(e.target.value);
          setCompVisible(['none', 'none', 'block'])
          }} style={{position: 'absolute', backgroundColor: 'rgb(46, 46, 46)', height: '16%', width: '12%', top: `${17*z-3}%`, left: `${14*y + 2}%`}}>
          {`${x+1}th`}
        </button>);
        x++;
      }
    }
    return(components);
  }
  return(
    <div>
      {taskCreate()}
      <div className='Calendar'>
        <label className='Year'>{mOfYear[focusedMonth]}</label>
        {getDayWindows()}
      </div>
    </div>
  );
}
const dayWindow=()=>{
  const getTaskWindows=()=>{
    let components = [];
    if(sortStyle == "prio"){
      for(let x = 0; x < user.getTasks().length; x++){
        let component = [];
        if(user.getTasks()[x] instanceof Task && user.getTasks()){
          if(user.getTasks()[x].getYear() == year && user.getTasks()[x].getMonth() == focusedMonth+1 && user.getTasks()[x].getDay() == focusedDay){
            console.log('testest???');
            component.push(<label id={x} className='Year' style={{textAlign: 'center' , top: '15%', left: '5%'}}>{"Date: "+user.getTasks()[x].getDate()}</label>);
            component.push(<label id={x} className='Year' style={{textAlign: 'center' , top: '25%', left: '5%'}}>{"Time: "+user.getTasks()[x].getTime()}</label>);
            component.push(<label id={x} className='Year' style={{textAlign: 'center' , top: '35%', left: '5%'}}>{"Title: "+user.getTasks()[x].getTitle()}</label>);
            component.push(<label id={x} className='Year' style={{textAlign: 'center' , top: '45%', left: '5%'}}>{"Description: "+user.getTasks()[x].getDescription()}</label>);
            component.push(<label id={x} className='Year' style={{textAlign: 'center' , top: '55%', left: '5%'}}>{"Priority: "+user.getTasks()[x].getPrio()}</label>);
            components.push(component);
          }
        }
      }
      for(let i = 0; i < user.getTasks().length-1; i++){
        let minidx = i;
        for( let j = i+1; j < components.length; j++){
          if(user.getTasks()[j].getPrio() < user.getTasks()[i].getPrio())
            minidx = j;
        }
        let temp = components[minidx];
        components[minidx] = components[i];
        components[i] = temp;
      }
    }
    else if(sortStyle=='time'){
      for(let x = 0; x < user.getTasks().length; x++){
        let component = [];
        if(user.getTasks()[x] instanceof Task && user.getTasks()){
          if(user.getTasks()[x].getYear() == year && user.getTasks()[x].getMonth() == focusedMonth+1 && user.getTasks()[x].getDay() == focusedDay){
            console.log('testest???');
            component.push(<label id={x} className='Year' style={{textAlign: 'center' , top: '15%', left: '5%'}}>{"Date: "+user.getTasks()[x].getDate()}</label>);
            component.push(<label id={x} className='Year' style={{textAlign: 'center' , top: '25%', left: '5%'}}>{"Time: "+user.getTasks()[x].getTime()}</label>);
            component.push(<label id={x} className='Year' style={{textAlign: 'center' , top: '35%', left: '5%'}}>{"Title: "+user.getTasks()[x].getTitle()}</label>);
            component.push(<label id={x} className='Year' style={{textAlign: 'center' , top: '45%', left: '5%'}}>{"Description: "+user.getTasks()[x].getDescription()}</label>);
            component.push(<label id={x} className='Year' style={{textAlign: 'center' , top: '55%', left: '5%'}}>{"Priority: "+user.getTasks()[x].getPrio()}</label>);
            components.push(component);
          }
        }
      }
      for(let i = 0; i < user.getTasks().length-1; i++){
        let minidx = i;
        for( let j = i+1; j < components.length; j++){
          if(user.getTasks()[j].getTime() < user.getTasks()[i].getTime())
            minidx = j;
        }
        let temp = components[minidx];
        components[minidx] = components[i];
        components[i] = temp;
      }
    } else {
      for(let x = 0; x < user.getTasks().length; x++){
        let component = [];
        if(user.getTasks()[x] instanceof Task && user.getTasks()){
          if(user.getTasks()[x].getYear() == year && user.getTasks()[x].getMonth() == focusedMonth+1 && user.getTasks()[x].getDay() == focusedDay){
            console.log('testest???');
            component.push(<label id={x} className='Year' style={{textAlign: 'center' , top: '15%', left: '5%'}}>{"Date: "+user.getTasks()[x].getDate()}</label>);
            component.push(<label id={x} className='Year' style={{textAlign: 'center' , top: '25%', left: '5%'}}>{"Time: "+user.getTasks()[x].getTime()}</label>);
            component.push(<label id={x} className='Year' style={{textAlign: 'center' , top: '35%', left: '5%'}}>{"Title: "+user.getTasks()[x].getTitle()}</label>);
            component.push(<label id={x} className='Year' style={{textAlign: 'center' , top: '45%', left: '5%'}}>{"Description: "+user.getTasks()[x].getDescription()}</label>);
            component.push(<label id={x} className='Year' style={{textAlign: 'center' , top: '55%', left: '5%'}}>{"Priority: "+user.getTasks()[x].getPrio()}</label>);
            components.push(component);
          }
        }
      }
    }
    return components;
  }
  return(
    <div>
      {taskCreate()}
      <div className='Calendar'>
        <label className='Year'>Tasks:</label>
        {getTaskWindows()[focusedTask%user.getTasks().length]}
        {}
        <button className='taskCreateInput' style = {{position: 'absolute', left: '35%', width: '2em', top: "4%", display: `${display}`}} onClick = {()=>{
          setFocusedTask(focusedTask-1);
          if(focusedTask < 1)
            setDisplay('none');
        }}>←</button>
        <button className='taskCreateInput' style = {{position: 'absolute', left: '57%', width: '2em', top: "4%"}} onClick = {()=>{
          setFocusedTask(focusedTask+1)
          if(display == 'none')
            setDisplay('block');
          }}>→</button>
          <button style={{fontSize: '6em', position: 'absolute', left: '0%'}} onClick = {(e)=>{
            setSortStyle('prio');
          }}> ☆</button>
          <button style={{fontSize: '3em', position: 'absolute', left: '23%'}} onClick = {(e)=>{
            setSortStyle('');
          }}>Creation</button>
          <button style={{fontSize: '6em', position: 'absolute', left: '9.3%'}} onClick = {(e)=>{
            setSortStyle('time');
          }}>🕛</button>
      </div>
    </div>
  );
}
//🕛
export default App;