
export function get_collection_neurons_ids(){
    let arr_ids: string[] = [];
    let array_post_name = document.querySelectorAll(".item");
    array_post_name.forEach((element)=>{
         let id_el: string = element.id;
         arr_ids.push(id_el);
    })
    return arr_ids;
}