import Task from './Task.js';

export default class Day{
    newDay(DayIn){
        this.day = DayIn;
        this.tasks = [];
    }
    addTask(taskIn){
        this.tasks.push(taskIn);
    }
    getDay(){
        return this.day;
    }
    getTasks(){
        return this.tasks;
    }
}