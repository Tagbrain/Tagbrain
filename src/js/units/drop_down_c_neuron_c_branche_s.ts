import {get_depth_outgrowth} from "./get_depth_outgrowth";

export function drop_down_c_neuron_c_branche_s(parent_el: any){
    var arr_row_spaces: number[] = [];
    let classes_arr = parent_el.children as HTMLCollectionOf<HTMLElement>;
    let numbers_bar: HTMLElement[] = [];
    
    if(classes_arr.length > 0){

         numbers_bar = put_rows(parent_el, true) as HTMLElement[];
         let arrows_containers: HTMLCollectionOf<HTMLElement>;
         if(parent_el.parentElement != null){
              arrows_containers = parent_el.parentElement.getElementsByClassName("arrows_c") as HTMLCollectionOf<HTMLElement>;
         } else {
              return
         }
         for(let i = 0; i < classes_arr.length; i++){
              let text = classes_arr[i].innerText;
              let obj_spaces = get_depth_outgrowth(text);
              arr_row_spaces.push(obj_spaces.depth);
         }

         for(let j = 0; j < arr_row_spaces.length; j++){

              //check collapsed
              let subclasses_num: HTMLElement[] = [];
              let subclasses: HTMLElement[] = [];

              if(arr_row_spaces[j+1] == null){
                   break
              }

              let arr_cont_CL = arrows_containers[j].classList;
              //merge (1,2) and remove weak embedded blocks
              //(1)
              if(arr_row_spaces[j] < arr_row_spaces[j+1]){

                   classes_arr[j].classList.add("class");
                   arrows_containers[j].innerHTML = "+";
                   if(!classes_arr[j+1].classList.contains("subclass")){
                        arr_cont_CL.add("open_d_d");
                   } else {
                        if(classes_arr[j].classList.contains("subclass")){
                             arr_cont_CL.add("open_d_d");
                        }
                   }

              }
              if(classes_arr[j].innerText.trim() == ""){
                   continue
              }
              
              let z = j + 1;
              let counter = 0;
              //(2)
              while(arr_row_spaces[j] < arr_row_spaces[z]){
                   subclasses.push(classes_arr[z]);
                   subclasses_num.push(numbers_bar[z]);

                   if(counter+2 == arr_row_spaces.length){
                        break
                   }
                   z++;
                   counter++;
              }

              
              arrows_containers[j].addEventListener('click', function (e) {

                   if(subclasses != null){
                        if(subclasses[0]){
                             if (subclasses[0].classList.contains("subclass")){
                                  arr_cont_CL.add("open_d_d");
                                  for(let c = 0; c < subclasses.length; c++){
                                       let sub_c_CL = subclasses[c].classList;
                                       let sub_c_num_CL = subclasses_num[c].classList;
    
                                       if(sub_c_CL.contains("subclass")){
                                            sub_c_CL.remove("subclass");
                                            sub_c_num_CL.remove("subclass");
                                       }
    
                                  }

                             } else {
                                  arr_cont_CL.remove("open_d_d");
                                  if(subclasses != null){
                                       for(let c = 0; c < subclasses.length; c++){
                                            let sub_c_CL = subclasses[c].classList;
                                            let sub_c_num_CL = subclasses_num[c].classList;
                                            if(!sub_c_CL.contains("subclass")){
                                                 if(sub_c_CL.contains("class")){
                                                      sub_c_CL.remove("class");
                                                 }
                                                 sub_c_CL.add("subclass");
                                                 sub_c_num_CL.add("subclass");
                                            }
    
                                       }
                                  }
                             }
                        }
                   }
              });
              
         }
    }
}

function put_rows(post:HTMLElement, is_return_array:boolean){
     let subclasses: number[] = [];
     let rows = post.children;
     //get hide rows
     for(let i = 0; i < rows.length; i++){
          
          if(rows[i].classList.contains("subclass")){
               subclasses.push(i);
          }
     }
     let numbers_bar: HTMLElement | null = null;

     let parent: HTMLElement | null = null;
     if(post.parentElement != null){
          parent = post.parentElement;
          numbers_bar = parent.querySelector(".numbers_bar");
     }

     if(numbers_bar != null){
          let count_rows = rows.length;
          numbers_bar.innerHTML = "";
          let numbers_array: HTMLElement [] = [];

          for(let ind = 1; ind < (count_rows+1); ind++){
               let container: HTMLElement  = document.createElement("div");

               let number: HTMLElement  = document.createElement("div");
               number.innerHTML = ind.toString();

               let arrows_container = document.createElement("div");
               arrows_container.className = "arrows_c";
               
               container.append(number, arrows_container);
               numbers_bar.append(container);

               numbers_array.push(container);
          }

          let num_conts = numbers_bar.children;
          
          for(let j = 0; j < subclasses.length; j++){
               num_conts[subclasses[j]].classList.add("subclass");
          }     

          if(is_return_array != undefined){
               return numbers_array;
          }
     }
}