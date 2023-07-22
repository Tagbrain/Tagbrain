export function convert_c_unixtime_c_to_formate_c_usual(unixTimestamp:string){
  let unix_time:number = Number(unixTimestamp);
  var date = new Date(unix_time * 1000);
  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();
  return `${day}|${month}|${year}`;
}