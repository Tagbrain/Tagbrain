type outgrowth = {content: string, v_index: number, depth: number};
type anemone = outgrowth[];
type anemones_collection = anemone[];

export function collapse_by_truncus(all_microfeature00s: anemones_collection) {
    let count_collapsing: number = 0;
    outer: for (let i = all_microfeature00s.length - 1; i >= 0; i--) {
        let anemone_c_donor = all_microfeature00s[i];

        let truncus_c_donor: string = anemone_c_donor[0].content;
        for (let z = i - 1; z >= 0; z--) {
            let anemone_c_acceptor = all_microfeature00s[z];

            let truncus_c_acceptor: string = anemone_c_acceptor[0].content;
            if (truncus_c_acceptor == truncus_c_donor) {
                count_collapsing++;
                console.log("truncus_generalization_c_num");
                anemone_c_donor.splice(0, 1);
                anemone_c_acceptor.push(...anemone_c_donor);
                all_microfeature00s.splice(i, 1); // remove anemone_donor
                continue outer
            }
        }
    }
    return {
        microfeature00s: all_microfeature00s,
        truncus_summarization: count_collapsing,
    }
}