
export default class Task{
    newTask = (date, time, title, descIn, priority) =>{
        this.month = date.split("/")[0];
        this.day = date.split("/")[1];
        this.year = date.split("/")[2];
        this.description = descIn;
        this.prio = priority;
        this.date = date;
        this.time = time;
        this.title = title;
    }
    getYear(){
        return this.year;
    }
    getMonth(){
        return this.month;
    }
    getDay(){
        return this.day;
    }
    getPrio(){
        return this.prio;
    }
    getDescription(){
        return this.description;
    }
    getDate(){
        return this.date;
    }
    getTime(){
        return this.time;
    }
    getTitle(){
        return this.title;
    }
}