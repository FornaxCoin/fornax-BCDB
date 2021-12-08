let date_ob = new Date();
let date = ("0" + date_ob.getDate()).slice(-2);
console.log(date);
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
// current year
let year = date_ob.getFullYear();
// current hours
let hours = date_ob.getHours();
// current minutes
let minutes = date_ob.getMinutes();
// current seconds
let seconds = date_ob.getSeconds();
// prints date in YYYY-MM-DD format
console.log(year + "-" + month + "-" + date);

// prints date & time in YYYY-MM-DD HH:MM:SS format
console.log(year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);
console.log(`${year}-${month}-${(parseInt(date)+1).toString()} 00:00:00.000`)
let unixTimestampFrom = Math.floor(new Date(`${year}-05-01 00:00:00.000`).getTime()/1000);
let unixTimestampTo = Math.floor(new Date(`${year}-${month}-${date} 00:00:00.000`).getTime()/1000);
console.log(unixTimestampFrom);
let newdate = new Date(( 1) * 1000);
date = ("0" + newdate.getDate()).slice(-2);
month = ("0" + (newdate.getMonth() + 1)).slice(-2);
console.log(`${newdate.getFullYear()}-${month}-${date} 00:00:00.000`);
console.log(unixTimestampTo);
