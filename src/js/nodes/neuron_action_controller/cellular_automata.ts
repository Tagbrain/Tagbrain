import {gEBI, dCE } from "../../units/compress_f.js";
setInterval(function(){ 
    refresh_automate();
	console.log("refresh");
}, 9000);


//if zero
//if one
//function change_one(lenght: number, current_position: number){}

function getRandomInt(min:number, max:number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function refresh_automate(){
    let cellular_automata: HTMLElement = gEBI("cellural_automaton");
    let random_int = getRandomInt(100000000, 999999999);
    let str_number = random_int.toString();
    let str_boolean = "";
    for(let i = 0; i < Array.from(str_number).length; i++){
        let num = parseInt(Array.from(str_number)[i], 10);
        if(num > 4){
            str_boolean += str_boolean + "■ ";
        } else if(num < 5) {
            str_boolean += str_boolean + "  ";
        }
    }

    let part1 = str_boolean.substr(0, 6);
    let part2 = str_boolean.substr(6, 6);
    let part3 = str_boolean.substr(12, 6);

    cellular_automata.innerHTML = '<tspan x="580">'+part1+'</tspan>'+'<tspan x="580" dy="15">'+part2+'</tspan>'+'<tspan x="580" dy="15">'+part3+'</tspan>';

}

/*
let current_state: any;
    let object_units : any, new_units;
    if(cellular_automata!= null){
        if(cellular_automata.textContent.trim() == ""){
            cellular_automata.innerText = "1 1 1 1 1 \n 0 0 0 1 1 \n 1 0 1 1 1";
        }
        current_state = cellular_automata.innerText;
    }

    let rows: string[] = current_state.split("\n");
    let return_row : string[][] = [];

    for(let i = 0; i < rows.length; i++){
        let array_row_symbols: RegExpMatchArray;
        array_row_symbols = rows[i].match(/[0-9]/g); // array symbols of row

        let new_row: any = [];
        for(let j = 0; j < array_row_symbols.length; j++){
                if(array_row_symbols[j] == "0"){
                    if(j-1 < 0){//previous
                        if(array_row_symbols[j-1] != "1" && array_row_symbols[j+1] != "1")
                            if(array_row_symbols[j+3])
                                if(array_row_symbols[j+2] == "1" && array_row_symbols[j+3]== "1"){
                                    new_row.push("0");
                                } else {
                                    new_row.push("1");
                                }
                    } else {//previous
                        j = array_row_symbols.length - 1;
                    }
                }
                if(array_row_symbols[j] == "1"){
                    if(array_row_symbols[j+1])
                        if(array_row_symbols[j+1] == "0"){
                            new_row.push("0");
                        } else {
                            new_row.push("1");
                        }
                }
        }     
        return_row.push(new_row);

    } 
*/ 