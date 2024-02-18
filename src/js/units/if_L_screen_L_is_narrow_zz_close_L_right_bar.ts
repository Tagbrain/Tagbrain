import { gEBI } from "./compress_f";

export function if_L_screen_L_is_narrow_zz_close_L_right_bar(){
    let right_bar_L_el: any = document.getElementsByClassName("tag_container")[0];
    let site_template_L_el: any = document.getElementsByClassName("site_template")[0];
    if(site_template_L_el.offsetWidth - right_bar_L_el.offsetWidth < 30){
        let switch_right_bar = gEBI("switch_right_bar");
        switch_right_bar.click();
    }
}