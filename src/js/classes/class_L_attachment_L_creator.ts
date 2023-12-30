import { attachment_L_creator00s_button00s } from "../units/attachment_L_creator00s_button00s";
import { dCE, gEBI } from "../units/compress_f";
import { send_data_ajax } from "../units/send_data_ajax";
import { track_L_element_L_change } from "../units/track_L_element_L_change";

class class_L_attachment_L_creator {

    public attachment_L_key:string;
    public attachment_L_content: any
    public neuron_L_id:string;
    protected type: string;
    protected container_L_attachment00s: any;
    protected attachment_L_unit: Element;
    protected content_L_element: Element;
    protected key_L_flag: Element;
    protected attachment_L_textarea_L_element: Element;

    protected is_exist_L_attachment_L_unit: boolean;
    protected is_exist_L_attachment_L_content: boolean;

    constructor(
        neuron_L_shell: any,
        attachment_L_key:string,
        attachment_L_content: any,
        neuron_L_id: string,
        type: string
    ) {
        //client_L_attachment00s 
        //window["tagbrain_graph"]["attachment00s"]
        this.neuron_L_id = neuron_L_id;
        this.attachment_L_key = attachment_L_key.replace('@', '');;
        this.attachment_L_content = attachment_L_content;
        this.type = type;
        this.container_L_attachment00s = neuron_L_shell.querySelector(".neuron_L_attachment00s");

        if(attachment_L_content == false){
            this.is_exist_L_attachment_L_content = false;
        } else {
            this.is_exist_L_attachment_L_content = true;
        }

        this.recreate_L_attachment_L_to_client();
        this.add_L_unit();
        
        if(this.type == "txt"){
            this.put_L_listner_L_change();
        }
    }
    add_L_unit(){
        let attachment00s = window["tagbrain_graph"]["attachment00s"];
        for (let i = 0; i < attachment00s.length; i++) {
            const unit = attachment00s[i];
            if(unit.key == this.attachment_L_key){
                //delete this attachment and unit
                unit.element.remove();
                window["tagbrain_graph"]["attachment00s"].splice(i, 1)
                break
            }
        }
        window["tagbrain_graph"]["attachment00s"].push(
            {
                key: this.attachment_L_key,
                content: this.attachment_L_content,
                neuron_L_id: this.neuron_L_id,
                element: this.attachment_L_unit
            }
        );
    }
    recreate_L_attachment_L_to_client(){
        //create_L_attachment_L_element
        this.attachment_L_unit = dCE("div");
        this.attachment_L_unit.className = "attachment_L_unit";
        this.container_L_attachment00s.appendChild(this.attachment_L_unit);
        let neuron_L_id = this.neuron_L_id;
        let attachment_L_key =  this.attachment_L_key;

        if(this.is_exist_L_attachment_L_content == false){
            this.attachment_L_unit.innerHTML +=
                '<div>'
                    + '<span class="special_symbols_style">'
                        + this.attachment_L_key
                    + '</span>'
                + '</div>'
                + '<div class="content_L_element">'
                    + '<a class="create_element_button">'
                        + '<svg class="linear_icon_c_target icon_size_sl_a_middle">'
                            + '<use xlink:href="#sprite_new_post">'
                            + '</use>'
                        + '</svg>'
                    + '</a>'
                + '</div>';
            let content_L_element = this.attachment_L_unit.children[1];
            this.content_L_element = content_L_element;
            let create_element_button = this.content_L_element.querySelector(".create_element_button");
            create_element_button.addEventListener("click", function(){
                create_element_button.remove();
                attachment_L_creator00s_button00s(
                    content_L_element,
                    attachment_L_key,
                    neuron_L_id
                );
            });

        } else {
            if(this.type == "img"){
                this.attachment_L_content = '<img class="attachment_L_img" src="'+this.attachment_L_content+'">';
            } else {//txt

                let content_L_html = this.attachment_L_content.replaceAll("\n", '<br>');
                let reg_L_link = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/, "gmi");
                content_L_html = content_L_html.replace(reg_L_link, function (link: string) {
                    let response = '<a contenteditable="false" target="_blank" href="'+ link + '">'
                        + link 
                    + '</a>';
                    return response;
                });

                this.attachment_L_unit.innerHTML += 
                '<div>'
                    + '<span class="special_symbols_style key_L_element">'
                        + this.attachment_L_key
                    + '</span>'
                    + '<span class="key_L_flag"></span>'
                + '</div>'
                + '<div class="content_L_element">'
                    + '<div contenteditable="true" class="attachment_L_textarea">'
                        + content_L_html
                    + '</div>'
                + '</div>';

                this.content_L_element = this.attachment_L_unit.children[1];
                this.attachment_L_textarea_L_element = this.content_L_element.children[0]
                this.key_L_flag = this.attachment_L_unit.querySelector(".key_L_flag");
            }
        } 
    }
    
    put_L_listner_L_change(){

        let neuron_L_id = this.neuron_L_id;
        let attachment_L_key = this.attachment_L_key;
        let attachment_L_value = this.attachment_L_content;
        let type = this.type;
        let key_L_flag = this.key_L_flag;

        let refracter = false;
        let attachment_L_textarea_L_element: any = this.attachment_L_textarea_L_element;

        //validation_L_textarea_L_event
        this.attachment_L_textarea_L_element.addEventListener("blur", async function(e:any) {

            //reg_L_link_X_row_shift
            let htmltext:string = attachment_L_textarea_L_element.innerText.replaceAll("\n", '<br>');
            let reg_L_link = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/, "gmi");
            htmltext = htmltext.replace(reg_L_link, function (link: string) {
                let response = '<a contenteditable="false" target="_blank" href="'+ link + '">'
                    + link 
                + '</a>';
                return response;
            });
            attachment_L_textarea_L_element.innerHTML = htmltext; 
        })

        //save_L_textarea_L_event
        this.content_L_element.addEventListener("input", async function(e:any) {
            key_L_flag.innerHTML = " ●";

            if(refracter == true) {
                //refractory_L_period
            } else {
                refracter = true;
                const result = await track_L_element_L_change(gEBI("cellural_automaton"));
                if (result === true) {
                    //send_L_save_request
                    let data = {
                        action: "change_L_attachment",
                        direction_L_name: "txt00s",
                        type: type,
                        attachment_L_key: attachment_L_key,
                        neuron_L_id: neuron_L_id,
                        attachment_L_value: attachment_L_textarea_L_element.innerText,
                        graph_L_name: window["tagbrain_graph"]["graph_name"],
                    };
                    let url = "php/neurons/controller_c_api.php";
                    let error_message = "Request 'change_L_attachment' error";
                    let controller_f = function(response_obj: any){
                        if(response_obj.status == "success"){
                            key_L_flag.innerHTML = "";                           
                            //add_L_attachment container_L_button00s_L_creator_attachment00s
                        }
                    };
                    send_data_ajax(data, url, controller_f, true, error_message);  
                    refracter = false;
                }
            }
        })
    }
}
export{class_L_attachment_L_creator}