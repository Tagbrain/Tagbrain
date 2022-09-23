<?php
trait collect_array_tags_neuron {

    protected function collect_array_tags_neuron($neuron_path){

        $array_tags = array();

        $reading = fopen($neuron_path, 'r');
        while(!feof($reading)){
            $line = fgets($reading);
                
            $regexp = '/#[\p{L}_0-9]*/iu';
            preg_match_all(
                $regexp,
                $line,
                $matches
            );
            if(isset($matches)){
                foreach($matches as $arr){
                    foreach($arr as $match){
                        array_push($array_tags, $match);
                    }
                }
            }
        }
        fclose($reading);
        /*
        $array_tags = array(
            "0" => "#text",
            "1" => "#text"
        );
        */
        return $array_tags;
    }

}