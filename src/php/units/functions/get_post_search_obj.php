<?php
include $_SERVER['DOCUMENT_ROOT']."/php/units/functions/load_neuron_tree.php";
include "get_row_depth.php";
include "get_pos_activation.php";
include "get_key_activation.php";

trait get_post_search_obj {

    use get_row_depth;
    use get_pos_activation;
    use get_key_activation;

    use load_neuron_tree;

    protected function get_post_search_obj($array_of_search_key, $graph, $neuron){
        $neuron_id = str_replace(".php", "", $neuron);
        $tags_array = array(); // tag // the most depth space 
        $search_obj = array();
        $row_num = 0;
        $post_activation = 0;
        $is_node = "false";

        $outgrowths = $this->load_neuron_tree($graph.$neuron);
        foreach($outgrowths as $outgrowth){
            $content = $outgrowth["content"];

            $pattern_tag = '/#[\p{L}_0-9]*/ui';
            $regexp = '/(?<searching>'.join("|",$array_of_search_key).')|(?<tags>#[\p{L}_0-9]*)/iu';

            preg_match_all(
                $regexp,
                $content,
                $matches
            );
            
            foreach($matches['searching'] as $match){
                if($match == '') continue;
                $activation_key = $this->get_key_activation($content, $row_num);
                $search_obj[$match] = $activation_key;
                if(preg_match($pattern_tag, $match, $array) != false){
                    array_push($tags_array, $match);
                }
            }
            foreach($matches['tags'] as $match){
                if($match == '') continue;
                array_push($tags_array, $match);
            }
            $row_num++;
        }

        foreach($search_obj as $key => $activation){
            $post_activation += $activation;
        } 

        foreach($tags_array as $tag){
            if($tag == "#tags_structure"){
                $is_node = "true";
                $post_activation += 1;
            }
        }
        if(count($search_obj) == 0){
            return false;
        }
        $return_obj = array(
            "post_activation" => $post_activation, 
            "is_node" => $is_node,
            "file_name" => $neuron_id,
        );
        return $return_obj;
    }

}