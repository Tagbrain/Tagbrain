export function get_collection_neurons_without_ram(full_collection: String[], ram_collection:String[]){
    let collection_without_ram:String[] = [];
    if(ram_collection.length == 0){
         return full_collection;
    } else {
        collection_without_ram = full_collection.filter(x => !ram_collection.includes(x));
         return collection_without_ram;
    }
}