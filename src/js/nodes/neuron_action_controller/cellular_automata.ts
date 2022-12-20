/*
setInterval(function(){ 
    refresh_automate();
	console.log("Oooo Yeaaa!");
}, 3000);
*/

//if zero
//if one
//function change_one(lenght: number, current_position: number){}

function refresh_automate(){

    let cellular_automata: HTMLElement = document.getElementById("cellular_automata");
    let current_state : any ;
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

    for (let z = 0; z < return_row.length; z++) {
        cellular_automata.innerText = return_row[z].join(" ")+ "\n";
    }

}
