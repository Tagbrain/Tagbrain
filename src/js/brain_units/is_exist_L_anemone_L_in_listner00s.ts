type anemone = outgrowth_L_usual[];
type branch = outgrowth_L_usual[];
type outgrowth_L_usual = {
    content: string,
    depth: number,
    v_index: number,
}

export function is_exist_L_anemone_L_in_listner00s(
    truncus_L_ex: outgrowth_L_usual,
    og_L_obligatory: outgrowth_L_usual|false,
    is_high_L_affinity: boolean
){
    let listner00s_L_anemone00a = window["tagbrain_graph"].ram.listner00s_L_anemone00a;
        for (let lst_i = 0; lst_i < listner00s_L_anemone00a.length; lst_i++) {
            //take_L_one_anemone
            let listner_L_anemone00a = listner00s_L_anemone00a[lst_i];
            //compare_L_with_listner_L_truncus
            if(truncus_L_ex.content == listner_L_anemone00a[0].content){
                if(og_L_obligatory != false){
                    for (let og_i = 1; og_i < listner_L_anemone00a.length; og_i++) {
                        if(listner_L_anemone00a[og_i].content == og_L_obligatory.content){
                            if(is_high_L_affinity == true){
                                if(listner_L_anemone00a[og_i].v_index > 0){
                                    return {
                                        is_exist: true,
                                        anemone: listner00s_L_anemone00a[lst_i],
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
                                    anemone: listner00s_L_anemone00a[lst_i],
                                }
                            }
                        } else {
                            continue
                        }
                    }
                } else {
                    return {
                        is_exist: true,
                        anemone: listner00s_L_anemone00a[lst_i],
                    }
                }
            }
        }
    return {
        is_exist: false,
        anemone: [],
    }
    
}