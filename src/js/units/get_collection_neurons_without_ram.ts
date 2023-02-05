export function get_collection_neurons_without_ram(full_collection: string[], ram_collection:string[]){
    let collection_without_ram:string[] = [];
    if(ram_collection.length == 0){
         return full_collection;
    } else {
        collection_without_ram = full_collection.filter(x => !ram_collection.includes(x));
         return collection_without_ram;
    }
}