type branch = outgrowth_L_usual[];
type outgrowth_L_usual = {
    content: string,
    depth: number,
    v_index: number,
}
export function is_exist_L_in_interval(
    tree:branch,
    pos: number,
    interval: [left_limit:number, right_limit:number],
){
    if(interval[0] <= pos){
        if(interval[1] >= pos){
            return true
        } else {
            return false
        }
    } else {
        return false
    }
}