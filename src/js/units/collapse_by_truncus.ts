type outgrowth = {child: string, v_index: number};
type anemone = { [parent: string]: outgrowth[] };
type anemones_collection = anemone[];
export function collapse_by_truncus(general_microfeatures: anemones_collection) {

    let len = general_microfeatures.length;

    outer: for (let i = len - 1; i >= 0; i--) {
        let anemone_donor = general_microfeatures[i];
        let trunc_donor: string = Object.keys(anemone_donor)[0];
        for (let z = i - 1; z >= 0; z--) {
            let anemone_acceptor = general_microfeatures[z];
            let trunc_acceptor: string = Object.keys(anemone_acceptor)[0];
            if (trunc_acceptor == trunc_donor) {
                anemone_acceptor[trunc_acceptor].push(...anemone_donor[trunc_donor]);
                general_microfeatures.splice(i, 1); // remove anemone_donor
                continue outer
            }
        }
    }
    return general_microfeatures;
}