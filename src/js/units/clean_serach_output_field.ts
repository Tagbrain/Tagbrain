export function clean_serach_output_field(){
    let result_field = document.getElementById("result_block");
    if(result_field!= null){
        result_field.innerHTML = "";
    }
}