import { gEBI } from "./compress_f";

export function if_c_screen_c_is_narrow_zz8_close_c_right_bar(){
    let right_bar_c_el: any = document.getElementsByClassName("tag_container")[0];
    let site_template_c_el: any = document.getElementsByClassName("site_template")[0];
    if(site_template_c_el.offsetWidth - right_bar_c_el.offsetWidth < 30){
        let switch_right_bar = gEBI("switch_right_bar");
        switch_right_bar.click();
    }
}