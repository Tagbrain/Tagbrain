

class class_c_toggle_c_pop_up {
    public pop_up_el: HTMLElement;
    public upper_layer_for_animation: HTMLElement;

    public show_class: string;
    public close_class: string;

    constructor(options: any) {
        this.pop_up_el = options.element;

        this.show_class = options.show_class;
        this.close_class = options.close_class;

        this.upper_layer_for_animation = document.querySelector(".upper_layer_for_animation") as HTMLElement;
        let shadow_container = document.querySelector(".shadow_background_container_pos");

        if(this.upper_layer_for_animation != null)
        this.upper_layer_for_animation.addEventListener("click", (e:any) => {
                if(window["tagbrain_graph"].pop_up.context.is_activated){
                    this.close();
                } else {
                    this.show(e);
                }
            })

        document.addEventListener("contextmenu", (e) => {
            e.preventDefault();
            if(window["tagbrain_graph"].pop_up.context.is_activated){
                this.close();
            } else {
                this.show(e);
            }
            //e = e || window.event;
            //let neuron = e.target;
            //obj_node = is_inside_c_node_c_in_block(neuron, "item"),
        })
    }
    show(e:any){
        this.replace_сlass(this.pop_up_el, this.close_class, this.show_class)
        this.upper_layer_for_animation.style.pointerEvents = "visible";
        this.pop_up_el.style.pointerEvents = "auto";
        this.pop_up_el.style.top = e.clientY + "px";
        this.pop_up_el.style.left = e.clientX + "px";
        window["tagbrain_graph"].pop_up.context.is_activated = true;
    }
    close(){
        this.replace_сlass(this.pop_up_el, this.show_class, this.close_class)
        this.pop_up_el.style.pointerEvents = "none";
        this.upper_layer_for_animation.style.pointerEvents = "none";
        window["tagbrain_graph"].pop_up.context.is_activated = false;
    }
    replace_сlass(element: HTMLElement, oldClass:string, newClass:string) {
        element.classList.remove(oldClass);
        element.classList.add(newClass);
    } 
}
export{class_c_toggle_c_pop_up};