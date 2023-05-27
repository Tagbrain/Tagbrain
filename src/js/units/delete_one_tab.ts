import {focus_end_element} from "./focus_end_element";
export function delete_one_tab(target_block: HTMLElement, focus: boolean) {
    let content = target_block.innerText;
    let reducted: number = 0;
    if(content != null){
         content = content.replace("\t", "    ");
         content.search(/\s\s\s\s/i);
         if (content.search(/\s\s\s\s/i) == 0) {
              content = content.substring(4);
              reducted = 4;
         } else if (content.search(/\s\s\s/i) == 0) {
              content = content.substring(3);
              reducted = 3;
         } else if (content.search(/\s\s/i) == 0) {
              content = content.substring(2);
              reducted = 2;
         } else if (content.search(/\s/i) == 0) {
              content = content.substring(1);
              reducted = 1;
         };
         target_block.innerText = content;
    }

    if (focus)
         focus_end_element(target_block);
         
    return reducted;
}