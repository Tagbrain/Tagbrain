
export function get_collection_ram_neuron_ids(){
    let arr_ids:string[] = [];
    let last_posts_lists = document.getElementById("last_posts_lists");
    if(last_posts_lists != null){
        let ram_links_el_arr:any = last_posts_lists.querySelectorAll(".ram_row");
        
        ram_links_el_arr.forEach((element: Element)=>{
            let id_ram = element.id;
            id_ram = id_ram.replace("ram_", "");
            arr_ids.push(id_ram);
        })
        return arr_ids;
    }
}