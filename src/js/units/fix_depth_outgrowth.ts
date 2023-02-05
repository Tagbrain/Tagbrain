export function fix_depth_outgrowth(depth:number, previous_depth:number) {
    let new_depth: number = 0
    if (depth > previous_depth) {
        if (depth - previous_depth == 1) {
            new_depth = depth
        } else if (depth - previous_depth > 1) {
            new_depth = previous_depth + 1;
        }
    } else {
        new_depth = depth;
    }
    return new_depth;
}