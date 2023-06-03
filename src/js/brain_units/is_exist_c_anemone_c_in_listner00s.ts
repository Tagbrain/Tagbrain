type anemone = outgrowth_c_usual[];
type branch = outgrowth_c_usual[];
type outgrowth_c_usual = {
    content: string,
    depth: number,
    v_index: number,
}
type outgrowth_short = { content: string, v_index: number };
export function is_exist_c_anemone_c_in_listner00s(
    truncus_c_ex: outgrowth_short,
    og_c_obligatory: outgrowth_short|false,
    is_high_c_affinity: boolean
){
    let listner00s_c_anemone00a = window["tagbrain_graph"].ram.listner00s_c_anemone00a;
        for (let lst_i = 0; lst_i < listner00s_c_anemone00a.length; lst_i++) {
            //take_c_one_anemone
            let listner_c_anemone00a = listner00s_c_anemone00a[lst_i];
            //compare_c_with_listner_c_truncus
            if(truncus_c_ex.content == listner_c_anemone00a[0].content){
                if(og_c_obligatory != false){
                    for (let og_i = 1; og_i < listner_c_anemone00a.length; og_i++) {
                        if(listner_c_anemone00a[og_i].content == og_c_obligatory.content){
                            if(is_high_c_affinity == true){
                                if(listner_c_anemone00a[og_i].v_index > 0){
                                    return {
                                        is_exist: true,
                                        anemone: listner00s_c_anemone00a[lst_i],
                                    }
                                } else {
                                    return {
                                        is_exist: false,
                                        anemone: [],
                                    }
                                }
                            } else {
                                return {
                                    is_exist: true,
                                    anemone: listner00s_c_anemone00a[lst_i],
                                }
                            }
                        } else {
                            continue
                        }
                    }
                } else {
                    return {
                        is_exist: true,
                        anemone: listner00s_c_anemone00a[lst_i],
                    }
                }
            }
        }
    return {
        is_exist: false,
        anemone: [],
    }
    
}