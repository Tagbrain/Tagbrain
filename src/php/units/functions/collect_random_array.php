<?php
trait collect_random_array {
    function collect_random_array($array, $len){
        $array_len = count($array);
        $response_array = array();
        $numbers = range(0, $array_len);
        shuffle($numbers);
        if($array_len >= $len){
            for($i=0; $i < $len; $i++){
                array_push($response_array, $array[$numbers[$i]]);
            }
        } else {
            for($i=0; $i < $array_len; $i++){
                array_push($response_array, $array[$numbers[$i]]);
            }
        }
        return $response_array;
    }
}