type outgrowth = {child: string, v_index: number};
type anemone = { [parent: string]: outgrowth[] };
type anemones_collection = anemone[];

export function get_unreliable_anemones(anemones: anemones_collection){
    let unreliable_anemones = get_raw_anemones(anemones);
    return unreliable_anemones
}

function get_raw_anemones(anemones_in_de: anemones_collection){
    let raw_induction_un_a : anemones_collection = [] as anemones_collection;
    let general_len = anemones_in_de.length;

    //choose anemone 
    for (let i = 0; i < general_len; i++) {
        let anemone = anemones_in_de[i];
        let truncus: string = Object.keys(anemone)[0]
        let outgrowths =  Object.values(anemone)[0];

        //take outgrowth in cycle
        let unreliable_anemone: anemone = {truncus:[]} as anemone;
        for (let j = 0; j < outgrowths.length; j++) {
            let outgrowth_v = outgrowths[j]["v_index"];
            if(outgrowth_v == 0 && outgrowth_v < 1){
                unreliable_anemone[truncus].push(outgrowths[j]);
            }
        }
        if(unreliable_anemone[truncus].length > 0){
            raw_induction_un_a.push(unreliable_anemone);
        }
    }
    return raw_induction_un_a
}