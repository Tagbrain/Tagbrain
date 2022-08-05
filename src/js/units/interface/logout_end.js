document.addEventListener('DOMContentLoaded',function(){

    function logout_ajax(){
        const xhttp = new XMLHttpRequest();
        xhttp.onload = function() {
        window.location.href = 'index.php';
        }
        xhttp.open("POST", "php/sessions/logout_inc.php", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send("data=data");
    }
    if(document.getElementById("logout_a")){
        document.getElementById("logout_a").addEventListener("click", ()=>{
            logout_ajax();
        })
    }

    function output_data_center_screen(data_output){
        let output_container  = document.getElementById("output_information_screen");
        let output_block = document.createElement('span');
        output_block.innerHTML = data_output;
        output_container.appendChild(output_block);
        setTimeout(() => output_block.remove(), 2000);
    }
    function validate_code_form(){
        let x = document.forms["password_code"].value;
        if (x.length < 5) {
            output_data_center_screen("The code is too short");
            return false;
        }
    }
});