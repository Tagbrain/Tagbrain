
export function parent_is_exist(node: Node, parent_class_name: String) {
    let iterable_node:any = node;
    if (iterable_node.nodeType == 3) {
         iterable_node = iterable_node.parentNode;
    }
    while (iterable_node.classList.contains(parent_class_name) == false) {
         iterable_node = iterable_node.parentNode;
         if (iterable_node == document.body)
            return false
    }
    return true;
}