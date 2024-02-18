import { gEBI } from "./compress_f";

export function refresh_L_theme(theme_css: string | false) {

    //remove_L_from_head_X_if_exist
    let css_L_theme_L_el = gEBI("css_L_theme_a");
    if (css_L_theme_L_el != false) 
      css_L_theme_L_el.remove();
     
    if(theme_css != false){
      theme_css = atob(theme_css).replace(/#/g, '%23');
      var head = document.getElementsByTagName('head')[0];
      var link = document.createElement('link');
      link.id = "css_L_theme_a";
      link.href = 'data:text/css,' + theme_css;
      link.rel = 'stylesheet';
      link.type = 'text/css';
      link.media = 'all';
      head.appendChild(link);
    }
}