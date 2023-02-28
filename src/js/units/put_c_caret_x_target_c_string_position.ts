export function put_c_caret_x_target_c_string_position(node: HTMLElement | Text, pos: number){
    // do => SAVE_SELECTION
    if(typeof(pos) === 'number'){
         let position: number = pos;
         if(node.nodeType == 1){
              let Elnode = node as Node;
              let childs = Elnode.childNodes;
              let i = 0;
              if(childs != null){
                   while(i < childs.length) {
                        let text = childs[i].textContent,
                        len: number = 0;
                        if(text != null)
                             len = text.length;

                        if(len < position){
                             position = position - len;
                             i++;
                             continue
                        } else {
                             if(childs[i].nodeType == 3){
                                  let element: HTMLElement = Elnode as HTMLElement;
                                  element.focus();
                                  document.getSelection()?.collapse(childs[i], position);
                                  return
                             } else {
                                  let element: HTMLElement = childs[i] as HTMLElement;
                                  element.focus();
                                  document.getSelection()?.collapse(childs[i].childNodes[0], position);
                                  return
                             }
                        }
                   }
              }
         }
         // #edit => RETURN OLD SELECTION

    } else if (pos === "end" || undefined){

         let new_range = new Range();
         new_range.selectNodeContents(node);
         if (document.getSelection !== null){
         document.getSelection()?.removeAllRanges();
         document.getSelection()?.addRange(new_range);
         }
         new_range.collapse();
         return
    }
}