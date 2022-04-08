import Month from './Month';

export default class Year{
    newYear = (yearIn)=>{
        this.year = yearIn;
        this.months = [];
    };
    getYear=()=>{
        return this.year;
    };
    getMonths(){
        return this.months;
    };
    addMonth(monthIn){
        this.months.push(monthIn);
    };
}