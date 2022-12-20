export function is_class_of_event_target(e:any, class_name:string){
    e = e || window.event;
    var target = e.target;
    if(target.classList.contains(class_name)){
        return true
    } else {
        return false
    }
}