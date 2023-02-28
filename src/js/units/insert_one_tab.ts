import {focus_end_element} from "./focus_end_element";
export function insert_one_tab(focus: boolean, current_element: HTMLElement) {
    let node_text = current_element.innerText;

    node_text = "    " + node_text;
    current_element.innerHTML = node_text;

    if (focus)
         focus_end_element(current_element);
}