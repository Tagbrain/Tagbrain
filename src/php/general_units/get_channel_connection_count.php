<?php
trait get_channel_connection_count {

    protected function get_channel_connection_count($brain_tags, $brain_tags_count){

        $connections = 0;

        for($i=0; $i<count($brain_tags); $i++){
            for($j=0; $j<count($brain_tags[$i]); $j++){
                $current_tag = $brain_tags[$i][$j];
                foreach($brain_tags as $neuron_tags){
                    foreach($neuron_tags as $value => $tag){
                        if($current_tag == $tag){
                            $connections++;
                        }
                    }
                }
            }
        }

        //cut loop connection the_tag → the_tag
        $connections = $connections - $brain_tags_count;
        return $connections;

    }

}