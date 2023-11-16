function convert_num_to_custom_system(num: string){
    return {
         from : function (baseFrom: number) {
             return {
                 to : function (baseTo: number) {
                     return parseInt(num, baseFrom).toString(baseTo);
                 }
             };
         }
    };
}
function get_octal_number(num: string){
    return convert_num_to_custom_system(num).from(10).to(8);
}
function collect_part_number(curr_depth:number, prev_depth:number, activation_octal: string){
    if(prev_depth == curr_depth){
         return "8" + activation_octal;
    } else if(prev_depth < curr_depth){
         return "98" + activation_octal;
    } else if(prev_depth > curr_depth){
         let quotient = Math.floor((prev_depth - curr_depth)/ 4);
         return "99".repeat(quotient) + "8" + activation_octal;
    }
}
function get_row_score(row_num: number){
    if(row_num < 2){
         return 13;
    } else if(row_num < 4){
         return 10;
    } else if(row_num < 8) {
         return 3;
    } else {
         return 1;
    }
}
function get_depth_score(depth_num: number){
    if(depth_num < 9){
         return 10;
    } else if (depth_num < 12){
         return 5;
    } else if (depth_num < 20){
         return 2;
    } else {
         return 1;
    } 
}
export function generate_struct_activ_num(obj_allrow: any[]){
    let general_activation = 0;
    let number = "";
    let last_depth_tmp = 0;
    if(obj_allrow.length > 0)
    
     for (let i = 0; i < obj_allrow.length; i++) {
         let activation_octal = "0";
         
         if(obj_allrow[i]["is_key_row"] == true){
               let row_activ = get_row_score(i),
                   depth_activ = get_depth_score(obj_allrow[i]["depth"]),
                   activation = row_activ * depth_activ;
               general_activation += activation;

              activation_octal = get_octal_number(activation.toString());

              number += collect_part_number(obj_allrow[i]["depth"], last_depth_tmp, activation_octal);
          } else {
              number += collect_part_number(obj_allrow[i]["depth"], last_depth_tmp, "");
          }

          last_depth_tmp = obj_allrow[i]["depth"];
     }

    return {
         number: number,
         general_activation: general_activation,
    }
}
