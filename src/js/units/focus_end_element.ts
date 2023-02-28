export function focus_end_element(element: Node) {
    let new_range = new Range();
    new_range.selectNodeContents(element);
    document.getSelection()?.removeAllRanges();
    document.getSelection()?.addRange(new_range);
    new_range.collapse();
}