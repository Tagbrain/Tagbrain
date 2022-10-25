export async function send_data_ajax(data, url, controller_f, URLencode, error_message){
    let json;
    if(data != null){
        if(URLencode == false || undefined){
            json = JSON.stringify(data);
        } else {
            json = encodeURIComponent((JSON.stringify(data)));
        }
    }

    let head = {
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
         controller_f(await response.json());
      } else {
          console.log(error_message);
      }
}