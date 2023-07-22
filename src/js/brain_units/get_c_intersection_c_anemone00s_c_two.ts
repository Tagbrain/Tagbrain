type anemone = outgrowth_c_usual[];
type branch = outgrowth_c_usual[];
type outgrowth_c_usual = {
    content: string,
    depth: number,
    v_index: number,
}
export function get_c_intersection_c_anemone00s_c_two(
    target_og00s:any[],
    parent_og00s:any[],
){
    let new_array:outgrowth_c_usual[] = [];

    for (let i = 1; i < target_og00s.length; i++) {
        for (let j = 0; j < parent_og00s.length; j++) {
            if(target_og00s[i].content == parent_og00s[j].content){
                new_array.push({content:target_og00s[i].content, v_index: target_og00s[i].v_index, depth: target_og00s[i].depth});
            }
        }
    }
    return new_array;
}