
export function iterate_childs_to_target(target_node: Node | Text, current_node: Node | Text, position_in_row_where_node: number){
    if(target_node != current_node){
         let current_node_children: NodeListOf<Node> = current_node.childNodes;
         for (let i = 0; i < current_node_children.length; i++) {
              let child = current_node_children[i];
              if(target_node == child){
                   return position_in_row_where_node;
              } else {
                   if(child.nodeType == 3){//this is text
                        let text = child.textContent;
                        if(text != null){
                             position_in_row_where_node += text.length;
                        }
                   } else {//this is node
                        if(current_node.contains(target_node)){
                             iterate_childs_to_target(target_node, child, position_in_row_where_node);
                        } else {
                             let text_node = current_node.textContent
                             if(text_node != null){
                                  position_in_row_where_node += text_node.length;
                             }
                        }
                   }
              }
         }
    }
    return position_in_row_where_node;
}