<?php
include "get_row_depth.php";
include "get_pos_activation.php";
include "get_key_activation.php";

trait get_post_search_obj {

    use get_row_depth;
    use get_pos_activation;
    use get_key_activation;

    protected function get_post_search_obj($array_of_search_key, $file_path){

        $tags_array = array(); // tag // the most depth space 
        $search_obj = array();
        $row_num = 0;
        $post_activation = 0;
        $reading = fopen($file_path, 'r');
        $is_node = "false";
        while(!feof($reading)){
            $line = fgets($reading);
                
            $regexp = '/'.join("|",$array_of_search_key).'|#[\p{L}_0-9]*/i';
            $regexp_words = '/'.join("|",$array_of_search_key).'/i';
            preg_match_all(
                $regexp,
                $line,
                $matches
            );

            foreach($matches as $arr){
                foreach($arr as $match){
                    
                    //check searching words
                    if(in_array($match, $array_of_search_key)){
                        $activation_key = $this->get_key_activation($line, $row_num);
                        $search_obj[$match] = $activation_key;
                        if(preg_match($this->pattern_tag, $match, $array) != false){
                            array_push($tags_array, $match);
                            //tag activation
                        }
                    } 
                    if(preg_match($this->pattern_tag, $match, $tag) != false){
                        if(preg_match($regexp_words, $match, $output) != false){
                            //tag contain word
                            $activation_key = $this->get_key_activation($line, $row_num);
                            $search_obj[$match] = $activation_key;
                        }
                        array_push($tags_array, $match);
                        //tag activation
                    }

                }
            }
            $row_num++;
        }
        fclose($reading);

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
            "tags_count" => count($tags_array),
            //"obj" => $search_obj //error encoding special symbols for json response
        );
        return $return_obj;
    }

}