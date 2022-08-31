//UNITS

let refractor_put_replacer;
function call_refractor_put_replacer(timer_name, ms){
    if(timer_name != undefined)
    window.clearTimeout(timer_name);
    timer_name = window.setTimeout(put_replacer, ms)
}
function put_replacer(){
    let replace_input = document.getElementById("replace_input_block");
    let replacer = replace_input.value;
    let array_of_finded = [];
    array_of_finded = document.querySelectorAll("mark");
    if(array_of_finded != null){
        for(let i = 0; i < array_of_finded.length; i++){
            if(array_of_finded[i].childNodes.length == 2){
                let content = array_of_finded[i].childNodes[0].textContent;
                array_of_finded[i].innerHTML = '<replaced_text>'+ content +'</replaced_text><replacer>' + replacer + '</replacer>';
            } else {
                array_of_finded[i].innerHTML = '<replaced_text>'+array_of_finded[i].textContent+'</replaced_text><replacer>' + replacer + '</replacer>';
            }
        }
    }
}
function replace_marked_text(){
    let array_of_finded = [];
    if(document.getElementsByTagName("replaced_text")[0]){
        array_of_finded = document.querySelectorAll("mark");
        if(array_of_finded != null){
            for(let i = 0; i < array_of_finded.length; i++){
                if(array_of_finded[i].getElementsByTagName("replacer")){
                    let content = array_of_finded[i].childNodes[1].textContent;
                    array_of_finded[i].innerHTML = content;
                }
            }
        }
    }
}
function complete_save_object(){
    //export save function
}

//NODE
    //LISTENER

let replace_input = document.getElementById("replace_input_block");
replace_input.addEventListener('focus', ()=>{
    call_refractor_put_replacer(refractor_put_replacer, 900);
})

replace_input.addEventListener('keyup', (e)=>{
    if (e.key === 'Enter') {
        replace_marked_text();
        document.getElementById("replace_input_block").blur();
        complete_save_object(); 
    } else {
        call_refractor_put_replacer(refractor_put_replacer, 900);
    }
});

replace_input.addEventListener('blur', (event)=>{
    let replace_input = document.getElementById("replace_input_block");
    let replacer = replace_input.value;
    let array_of_finded = [];
    array_of_finded = document.querySelectorAll("mark");
    if(array_of_finded != null){
        for(let i = 0; i < array_of_finded.length; i++){
            if(array_of_finded[i].childNodes.length == 2){
                let content = array_of_finded[i].childNodes[0].textContent;
                array_of_finded[i].innerHTML = content;
            }
        }
    }
})
    //CONTROLLER