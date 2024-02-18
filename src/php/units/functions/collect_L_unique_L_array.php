<?php

trait collect_L_unique_L_array {

    protected function collect_L_unique_L_array(
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