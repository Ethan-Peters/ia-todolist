import Day from "./Day.js";
import Task from "./Task.js";
import Year from "./Year";
import Month from './Month';

export default class Calendar{
    constructor(){
        this.datesWithTasks = [];
    }
    addTask=(taskIn)=>{
        let flag = false;
        for(let x = 0; x < this.datesWithTasks.length; x++){
            if(taskIn.getYear()==this.datesWithTasks[x].getYear()){
                console.log("true check 1");
                for(let y = 0; y < this.datesWithTasks[x].getMonths().length; y++){
                    if(taskIn.getMonth()==this.datesWithTasks[x].getMonths()[y].getMonth()){
                        for(let i = 0; i < this.datesWithTasks[x].getMonths()[y].getDays().length; i++){
                            if(taskIn.getDay()==this.datesWithTasks[x].getMonths()[y].getDays()[i].getDay()){
                                console.log(2);
                                this.datesWithTasks[x].getMonths()[y].getDays()[i].addTask(taskIn);
                                flag = true;
                            }
                        }
                        if(!flag){
                            console.log(3);
                            let day = new Day();
                            day.newDay(taskIn.getDay());
                            day.addTask(taskIn);
                            this.datesWithTasks[x].getMonths()[y].getMonth().addDay(day);
                            flag = true;
                        }
                    }
                }
                if(!flag){
                    console.log(4);
                    let month = new Month();
                    month.newMonth(taskIn.getMonth());
                    let day = new Day();
                    day.newDay(taskIn.getDay());
                    day.addTask(taskIn);
                    month.addDay(day);
                    this.datesWithTasks[x].addMonth(month);
                    flag = true;
                }
            }
        }
        if(!flag){
            console.log(5);
            let year = new Year();
            year.newYear(taskIn.getYear());
            let month = new Month();
            month.newMonth(taskIn.getMonth());
            let day = new Day();
            day.newDay(taskIn.getDay());
            day.addTask(taskIn);
            month.addDay(day);
            year.addMonth(month);
            this.datesWithTasks.push(year);
            flag = true;
        }
    }
    getDatesWithTasks(){
        return this.datesWithTasks;
    }
}
