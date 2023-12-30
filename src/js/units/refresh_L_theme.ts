import { gEBI } from "./compress_f";

export function refresh_c_theme(theme_css: string | false) {

    //remove_L_from_head_X_if_exist
    let css_c_theme_c_el = gEBI("css_c_theme_a");
    if (css_c_theme_c_el != false) 
      css_c_theme_c_el.remove();
     
    if(theme_css != false){
      theme_css = atob(theme_css).replace(/#/g, '%23');
      var head = document.getElementsByTagName('head')[0];
      var link = document.createElement('link');
      link.id = "css_c_theme_a";
      link.href = 'data:text/css,' + theme_css;
      link.rel = 'stylesheet';
      link.type = 'text/css';
      link.media = 'all';
      head.appendChild(link);
    }
}