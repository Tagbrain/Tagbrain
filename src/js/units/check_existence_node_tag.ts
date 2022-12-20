export function check_existence_node_tag(tag_name:string, neuron: Element){
    let reg_tag = new RegExp(tag_name, 'gmiu');
    let text =  neuron.textContent;
    if(text != null){
        if(reg_tag.test(text)){
            return true
        } else {
            return false
        }
    }
}