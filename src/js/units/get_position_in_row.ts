import {iterate_childs_to_target} from "./iterate_childs_to_target";

export function get_position_in_row(target_node: HTMLElement | Text, node_position:number, current_row:Node) {
    let position_in_row_where_node = 0;
    let current_row_childnodes: NodeListOf<Node> = current_row.childNodes;

    for (let i = 0; i < current_row_childnodes.length; i++) {
         let current_node: Text | HTMLElement = current_row_childnodes[i] as Text | HTMLElement;
         if(target_node == current_node){//this is target node
              position_in_row_where_node += node_position;
              break
         } else {//this contains target node
              if(current_node.contains(target_node)){//current_node contain target node
                   position_in_row_where_node = iterate_childs_to_target(target_node, current_node, position_in_row_where_node);
                   position_in_row_where_node += node_position
                   break
              } else {//get current node length and follow to the next 
                   let textcont = current_node.textContent;
                   if(textcont != null)
                        position_in_row_where_node += textcont.length;
                   continue
              }
         }

    }   
    //clean syntax #remove
    /*
    let row_content = current_row.textContent;
    if(row_content != null)
         current_row.textContent = row_content;
    */
    return position_in_row_where_node;
}