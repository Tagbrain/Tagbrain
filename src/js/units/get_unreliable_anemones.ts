//REMOVE ALL
type outgrowth = {content: string, v_index: number};
type anemone = { [parent: string]: outgrowth[] };
type induction_obj = {
    a_s_reliable_induction:anemone[],
    a_s_unreliable_induction:anemone[],
}

export function get_unreliable_anemones(anemones: anemone[]){
    let unreliable_anemones = get_raw_anemones(anemones);
    return unreliable_anemones
}

function get_raw_anemones(anemones_induction: anemone[]){
    let induction_obj : induction_obj = {
        a_s_reliable_induction: [],
        a_s_unreliable_induction:[],
    };

    //choose anemone 
    for (let i = 0; i < anemones_induction.length; i++) {

        let anemone = anemones_induction[i];
        let truncus: string = Object.keys(anemone)[0]
        let outgrowths =  Object.values(anemone)[0];

        //take outgrowth in cycle
        let unreliable_anemone: anemone = {} as anemone;
        unreliable_anemone[truncus] = [];

        let reliable_anemone: anemone = {} as anemone;
        reliable_anemone[truncus] = [];

        for (let j = 0; j < outgrowths.length; j++) {
            let outgrowth_v = outgrowths[j]["v_index"];
            if(outgrowth_v == 0){
                unreliable_anemone[truncus].push(outgrowths[j]);
            } else {
                reliable_anemone[truncus].push(outgrowths[j]);
            }
        }
        if(unreliable_anemone[truncus].length > 0){
            induction_obj.a_s_unreliable_induction.push(unreliable_anemone);
        }
        if(reliable_anemone[truncus].length > 0){
            induction_obj.a_s_reliable_induction.push(reliable_anemone);
        }
    }
    return induction_obj
}