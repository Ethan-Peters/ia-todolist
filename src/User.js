import Task from './Task.js';
import React from 'react';
import Calendar from './Calendar.js';

export default class User{
    constructor(){
        this.Tasks = [];
        this.calendar = new Calendar();
    }
    addTask(input){
        let temp = this.Tasks;
        temp.push(input);
        this.Tasks = temp;
        this.calendar.addTask(input);
    }
    getTasks(){
        return this.Tasks;
    }
    getCalendar(){
        return this.calendar;
    }
}