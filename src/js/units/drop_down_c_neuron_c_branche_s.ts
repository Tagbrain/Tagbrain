export function drop_down_c_neuron_c_branche_s(parent_el: HTMLElement){
    var arr_row_spaces: number[] = [];
    let classes_arr = parent_el.children as HTMLCollectionOf<HTMLElement>;
    let numbers_bar: HTMLElement[] = [];
    
    if(classes_arr.length > 0){

         numbers_bar = this.put_rows(parent_el, true);
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