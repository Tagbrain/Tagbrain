export function get_sel_range(){
    var sel:any, range:any;
    if (window.getSelection) {
         sel = window.getSelection();
         if (sel.getRangeAt && sel.rangeCount) {
              range = sel.getRangeAt(0);
              return {
                   sel: sel,
                   range: range,
              }
         }
    }
}