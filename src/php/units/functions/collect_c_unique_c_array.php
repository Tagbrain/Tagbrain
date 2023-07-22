<?php

trait collect_c_unique_c_array {

    protected function collect_c_unique_c_array(
        $array_main, 
        $array_extensor
    ){
        $common = array_merge($array_main, $array_extensor);
        $common_unique = array();
        foreach($common as $key => $value) {
            if(!in_array($value, $common_unique)) {
                $common_unique[] = $value;
            }
        }
        
        return $common_unique;
    }
}