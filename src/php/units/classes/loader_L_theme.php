<?php
session_start();

class loader_L_theme {

    function __construct(
        $theme_L_name,
        $graph_L_name
    ){
        $this->theme_L_name = $theme_L_name;
        $this->graph_L_name = $graph_L_name;
        $this->response = $this->get_c_string_c_theme_c_css();
    }

   protected function get_c_string_c_theme_c_css(){
    $theme_L_path = $_SERVER['DOCUMENT_ROOT']."/theme_L_basic/".$this->theme_L_name.".css";

    if (file_exists($theme_L_path)) {
        $cssString = file_get_contents($theme_L_path); 
        $theme_L_css_L_base64 = base64_encode($cssString);
        return $theme_L_css_L_base64;
    } else {
        //check_in_local_folder
        return false;
    }

   }
}