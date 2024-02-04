import {connect_c_anemone_x_target_c_tree} from "../brain_units/connect_c_anemone_x_target_c_tree";
import {extend_c_tree_c_chain} from "../brain_units/extend_c_tree_c_chain";

type a_outgrowth = { content: string, v_index: number };
type anemone = a_outgrowth[];
type anemones_collection = anemone[];

type branch = {
    content: string,
    depth: number,
    v_index: number,
}[]

type microfeature = {
    parent: string,
    child: string,
}
type i_obj = {
    tree:{tree: branch},
    donor_a_c_truncus: string,
    donor_c_a_outgrowth_s: a_outgrowth[],
}

class class_generator_tree_structure {

    public induction_a: anemones_collection;
    public deduction_a: anemones_collection;

    constructor(options:any){
        this.induction_a = options.induction_a;
        this.deduction_a = options.deduction_a;
        let trees = this.generate_tree_structures();
        console.log(trees);
        //console.log(generalization counter);
        let trees_reducted = this.choose_c_tree_c_best(trees);
        let tree00s_verified = this.collapse_c_outgrowth_c_not_verified(trees_reducted);
        return tree00s_verified;
    }

    generate_tree_structures() {
        let structures: any = [];
        let trigger_stop:boolean = false as boolean;
        let promise_break  = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve("finished");
              }, 2000);
        });
        promise_break.then(
            result => trigger_stop = true,
        );
        for (let i = 0; i < this.deduction_a.length; i++) {
            
            if(trigger_stop == true)
                break;

            let deduction_a:any = [...this.deduction_a];
            let current_anemone: anemone = deduction_a[i];

            let structure:any = {
                tree:[],
                general_truncus: [],
                general_outgrowths: [],
            };
            let branch:branch = this.collect_tree_c_firstly(current_anemone);
            structure.tree.push(...branch);

            deduction_a.splice(i, 1);
            let anemones_c_remaining:any = {
                a_c_deduction:deduction_a,
                a_c_induction:this.induction_a,
            }
            //clean listners
                window["tagbrain_graph"].ram.listner00s_c_anemone00a = [];
            this.start_x_anemonization_cycle({tree:structure.tree}, anemones_c_remaining);
            structures.push(structure.tree);
        }
        return structures;
        //analysis all structures
    }
    choose_c_tree_c_best(trees:any){
        trees.sort((a:any, b:any) => b.length - a.length );
        return trees;
    }
    collapse_c_outgrowth_c_not_verified(tree:any){
        for (let j = 0; j < tree.length; j++) {
            for (let i = tree[j].length - 1; 0 <= i; i--) {
                if(tree[j][i]["v_index"] == 0){
                    tree[j].splice(i, 1);
                }
            }
        }
        return tree;
    }
    start_x_anemonization_cycle(obj_c_tree:{tree: branch}, anemones_c_remaining:any): any{
        let unused_s:anemone[] = [...anemones_c_remaining.a_c_deduction];
        //induction generalization
        for (let i = 0; i < unused_s.length; i++) {
            let a_unused_c_obj = this.get_c_anemone_obj(unused_s[i]);
            let obj_c_truncus_to_outgrowth = connect_c_anemone_x_target_c_tree(
                obj_c_tree,
                a_unused_c_obj.truncus, 
                a_unused_c_obj.outgrowth_s, 
                {
                    start:0, 
                    count: "limitless"
                }, 
                true
            );
            if(obj_c_truncus_to_outgrowth.is_connected){
                if(a_unused_c_obj.outgrowth_s.length > 0){
                    unused_s[i] = [
                        {
                            depth: 0,
                            v_index: 0,
                            content: a_unused_c_obj.truncus
                        },
                        ...a_unused_c_obj.outgrowth_s]; 
                    //unused_s.splice(i, 1);
                    //i = i - 1;
                } else {
                    unused_s.splice(i, 1);
                    i = i - 1;
                }
            }
        }
        if(unused_s.length > 0){
            //blocker unusful repetitions
            if(anemones_c_remaining.a_c_deduction.length > unused_s.length){
                let remain_anemones:any = {
                    a_c_induction: [],
                    a_c_deduction: unused_s,
                }
                return this.start_x_anemonization_cycle({tree:obj_c_tree.tree}, remain_anemones);
            } 
        } else {
            //remove_c_og_c_vi_c_0
            extend_c_tree_c_chain(
                obj_c_tree
            );
        }
    }
    get_c_anemone_obj(anemone:any){
        let truncus: string = anemone[0].content,
            outgrowth_s: any = anemone.slice(1);
        return {
            truncus: truncus,
            outgrowth_s: outgrowth_s,
        }
    }
    collect_tree_c_firstly(anemone:anemone){
        let branch:any = [],
            truncus: string = anemone[0].content,
            a_c_outgrowth_s: any = anemone.slice(1);

        branch.push({
            content: truncus,
            v_index: 1,
            depth: 0,
        });

        for (let i = 0; i < a_c_outgrowth_s.length; i++) {
            branch.push({
                v_index: a_c_outgrowth_s[i]["v_index"],
                content: a_c_outgrowth_s[i]["content"],
                depth: 1,
            })
        }
        return branch
    }

}

export {class_generator_tree_structure}
