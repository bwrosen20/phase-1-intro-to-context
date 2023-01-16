let twoRows = [
    ["moe", "sizlak", "barkeep", 2],
    ["bartholomew", "simpson", "scamp", 3]
]

/*let employeeData= ["Julius", "Caesar", "General", 1000,];
//console.log(employeeData);
let cRecord = createEmployeeRecord(employeeData);  
//console.log(cRecord, "0044-03-15 0900");   
let updatedBpRecordIn = createTimeInEvent(cRecord, "0044-03-15 0900");
//console.log(updatedBpRecordIn);
let updatedBpRecordOut = createTimeOutEvent(cRecord, "0044-03-15 1100");*/


function createEmployeeRecord(array){
    let object={firstName:array[0], 
        familyName:array[1],
        title:array[2],
        payPerHour:array[3],
        timeInEvents:[],
        timeOutEvents:[]}
       return object;
}

function createEmployeeRecords(array){
    let newArray=[];
    for (let i=0;i<array.length;i++){
    newArray[i]=createEmployeeRecord(array[i]);}
    return(newArray);
    
}

function createTimeInEvent(array,date){
    let dateArray=[]; 
    let arrayLocation;
    dateArray=date.split(' ');
    dateArray[1]=parseInt(dateArray[1]);
    if (array.timeInEvents.length===0){
        arrayLocation=0;}
        else{
        arrayLocation=array.timeInEvents.length}
    array.timeInEvents[arrayLocation]={type: "TimeIn",
                            date: dateArray[0],
                            hour: dateArray[1] 
    }   
   return(array);

}

function createTimeOutEvent(array,date){
    let dateArray=[]; 
    let arrayLocation;
    dateArray=date.split(' ');
    dateArray[1]=parseInt(dateArray[1]);
    if (array.timeOutEvents.length===0){
    arrayLocation=0;}
    else{
    arrayLocation=array.timeOutEvents.length}
    array.timeOutEvents[arrayLocation]={type: "TimeOut",
                            date: dateArray[0],
                            hour: dateArray[1]   
}
   return(array);

}


function hoursWorkedOnDate(object,theDate){
    let newArray=object.timeInEvents; 
    let newishArray=object.timeOutEvents;
    let timeOut=newishArray.find(newishArray => newishArray.date===theDate);
    let timeIn=newArray.find(newArray => newArray.date===theDate);
    let hoursWorked= (timeOut.hour-timeIn.hour);
    return(hoursWorked/100);
}

function wagesEarnedOnDate(object,date){
    let hours=hoursWorkedOnDate(object,date);
    let wages=object.payPerHour;
    return(hours*wages);
}   

function allWagesFor(employeeData){
    let wages=[];
    for (let q=0;q<employeeData.timeInEvents.length;q++){
        wages[q]=wagesEarnedOnDate(employeeData,employeeData.timeInEvents[q].date);
    }
    let totalWages=wages.reduce(function(accumulator, element){return element + accumulator});
    return(totalWages);

}

function calculatePayroll(employees){
    let totalPayroll=0;
    for (let z=0;z<employees.length;z++){
        totalPayroll=totalPayroll+allWagesFor(employees[z]);}
        return totalPayroll;
}


/*let rRecord = createEmployeeRecord(["Rafiki", "", "Aide", 10])
        let sRecord = createEmployeeRecord(["Simba", "", "King", 100])

        let sTimeData = [
          ["2019-01-01 0900", "2019-01-01 1300"], // 4 * 100 = 400
          ["2019-01-02 1000", "2019-01-02 1300"]  // 3 * 100 = 300 ===> 700 total
        ]

        let rTimeData = [
          ["2019-01-11 0900", "2019-01-11 1300"], // 4 * 10 = 40
          ["2019-01-12 1000", "2019-01-12 1300"]  // 3 * 10 = 40 ===> 70 total ||=> 770
        ]

        sTimeData.forEach(function (d) {
          let [dIn, dOut] = d
          sRecord = createTimeInEvent(sRecord, dIn)
          sRecord = createTimeOutEvent(sRecord, dOut)
        })

        rTimeData.forEach(function (d, i) {
          let [dIn, dOut] = d
          rRecord = createTimeInEvent(rRecord, dIn)
          rRecord = createTimeOutEvent(rRecord, dOut)
        })

        let employees = [sRecord, rRecord]
        let grandTotalOwed = employees.reduce((m, e) => m + allWagesFor(e), 0)
        calculatePayroll(employees);
    */


