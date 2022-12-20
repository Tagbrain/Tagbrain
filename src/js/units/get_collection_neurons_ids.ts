
export function get_collection_neurons_ids(){
    let arr_ids:String[] = [];
    let array_post_name = document.querySelectorAll(".item");
    array_post_name.forEach((element)=>{
         let id_el: String = element.id;
         arr_ids.push(id_el);
    })
    return arr_ids;
}