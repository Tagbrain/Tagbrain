import { gEBI } from "../../units/compress_f";
import { load_L_neuron_L_authorization } from "../../units/load_L_neuron_L_authorization";
document.addEventListener('DOMContentLoaded', function () {

    let log_up_c_element = gEBI("log_up");
    if(log_up_c_element instanceof Element){
        log_up_c_element.addEventListener("click", (e:any) => {
            load_L_neuron_L_authorization();
        });
    }

    function logout_ajax() {
        const xhttp = new XMLHttpRequest();
        xhttp.onload = function () {
            window.location.href = 'index.php';
        }
        xhttp.open("POST", "php/sessions/logout_inc.php", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send("data=data");
    }

    if (gEBI("logout_a")) {
        gEBI("logout_a").addEventListener("click", () => {
            logout_ajax();
        })
    }

    function output_data_center_screen(data_output:any) {
        let output_container: HTMLElement = document.getElementById("logout_c_input_c_guide") as HTMLElement;
        let output_block = document.createElement('span');
        output_block.innerHTML = data_output;
        output_container.appendChild(output_block);
        setTimeout(() => output_block.remove(), 2000);
    }
});