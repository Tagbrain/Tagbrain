export function get_child00s_L_from_floor00s(
    outgrowth00s:any,
    num00s:number[],
){
    let all_child00s: any = outgrowth00s.outgrowth_s;
    let floor00s: any = {};
    for (let i = 0; i < all_child00s.length; i++) {
        for (let y = 0; y < num00s.length; y++) {
            let cur_d = all_child00s[i]["depth"];

            if(cur_d == num00s[y]){
                if(floor00s[cur_d]){
                    floor00s[cur_d].push(all_child00s[i]);
                } else {
                    //add_new_floor
                        floor00s[cur_d] = [all_child00s[i]];
                }
            }

        }
    }
    return floor00s;
}