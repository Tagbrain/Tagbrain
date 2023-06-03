type branch = outgrowth_c_usual[];
type outgrowth_c_usual = {
    content: string,
    depth: number,
    v_index: number,
}
export function is_exist_c_in_interval(
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