export async function fetch_c_get_c_file(data:any, url:string, controller_f:any, URLencode:boolean, error_message:string){
    let json;
    if(data != null){
        if(URLencode == false || undefined){
            json = JSON.stringify(data);
        } else {
            json = encodeURIComponent((JSON.stringify(data)));
        }
    }

    let head:any = {
        method: "POST",
        headers:{
             'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
             "Access-Control-Allow-Origin" : "*", 
             "Access-Control-Allow-Credentials" : true 
        }
    };
    if(data != null)
        head["body"] = "data=" + json;

    let response = await fetch(url, head);

    if (response.ok) { 
         controller_f(await response.blob());
      } else {
          console.log(error_message);
      }
}