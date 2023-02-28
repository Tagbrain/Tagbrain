<?php
session_start();

include $_SERVER['DOCUMENT_ROOT']."/php/units/functions/check_session_data.php";
include $_SERVER['DOCUMENT_ROOT']."/php/units/functions/get_post_search_obj.php";
include $_SERVER['DOCUMENT_ROOT']."/php/units/functions/load_neuron_tree.php";
include $_SERVER['DOCUMENT_ROOT']."/php/units/functions/get_extension.php";
include $_SERVER['DOCUMENT_ROOT']."/php/units/functions/put_right_format_file.php";

class search_controller {
    //untis
    use check_session_data;
    use get_post_search_obj;
    use load_neuron_tree;
    use get_extension;
    use put_right_format_file;

    function __construct($graph_name, $request_data, $regexp_is_activated, $is_all_graphes_activated){
        $this->graph_name = $graph_name;
        $this->is_all_graphes_activated = $is_all_graphes_activated;
        $this->request_data = $request_data;
        $this->regexp_is_activated = $regexp_is_activated;
        $this->collection_post_without_ram = $collection_post_without_ram;
        $this->collection_ram_post_name = $collection_ram_post_name;
    }

    //controller
    protected function start_search_controller(){

        $graph = __DIR__ . "/../../channels/".$this->graph_name."/content_items/";
        $neurons = array_diff(scandir($graph), array('.', '..'));

        $channel_search_obj = array();
        foreach($neurons as $neuron){

            $neuron_id = str_replace(".php", "", $neuron);
            
            foreach($this->collection_ram_post_name as $num => $ram_post_front_end){
                if($ram_post_front_end == $neuron_id){
                    continue 2;
                }
            }

            $post_search_obj = $this->get_post_search_obj($this->request_data, $graph ,$neuron);
            if($post_search_obj != false){
                array_push($channel_search_obj, $post_search_obj);
            }

        }

        if (empty($channel_search_obj)) {
            $response_arr = array(
                "status" => "success",
                "remove_posts" => array(),
                "add_posts" => array()
            );
            echo json_encode($response_arr);
            exit();
        }

        //sorting
        function cmp($a, $b){
            if ($a == $b) {
                return 0;
            }
            return ($a["post_activation"] > $b["post_activation"]) ? -1 : 1;
        }
        usort($channel_search_obj, "cmp");
        $splice_group = $channel_search_obj;
        $finded_posts = array();

        
        if(count($channel_search_obj) <= 10){
            $splice_group = array_splice($channel_search_obj, 0, 10);
            $finded_posts = $splice_group;
        } else if (count($channel_search_obj) > 10){
            $splice_group = array_splice($channel_search_obj, 0, 20);
            $finded_posts = $splice_group;
        }
        
        for($i=0; $i<count($finded_posts); $i++){
            $cont_neuron_path = $graph."/".$finded_posts[$i]["file_name"].".php";

            $extension = $this->get_extension($cont_neuron_path);
            if($extension != "json"){
                $new_neuron_path = $this->put_right_format_file($cont_neuron_path, $extension);
            }
            $neuron_tree = $this->load_neuron_tree($new_neuron_path, true);
            //#edit
            //#edit check format and change the neuron if it's txt and php
            $finded_posts[$i]["content"] = $neuron_tree; 
        }

        
        $exist_posts = array();
        $remove_posts = array();
        $add_posts = array();



        foreach($finded_posts as $finded_post){
            
            $is_exist = false;
            
            foreach($this->collection_post_without_ram as $num => $post_front_end){
                if($finded_post["file_name"] == $post_front_end){
                    $is_exist = true; 

                    array_push($exist_posts, $finded_post["file_name"]);
                    break;
                } 
            }

            if($is_exist === false){//not exist in collection_post_without_ram
                array_push($add_posts, $finded_post);
            }
        }
        
        $remove_posts = array_diff($this->collection_post_without_ram, $exist_posts);
        
        //print_r($remove_posts);
        //print_r($exist_posts);

        /*
            collect cluster_memory from the best posts
            get file with the POINTS
            get file list with other finded words

            get the first parent of the best post and find it in other post
            get the most frequent words of the finded posts

            refresh_channel_obj_data json
        */

        $response_arr = array(
            "status" => "success", 
        );

        if(count($remove_posts) > 0){
            $response_arr["remove_posts"] = $remove_posts;
        } 

        if(count($add_posts) > 0){
            $response_arr["add_posts"] = $add_posts;
        }
        echo json_encode($response_arr);
       
        //delayed function
    }

    protected function change_post_name_activation(){
        //last posts decrease
        //first posts increase
    }
    protected function create_cluster_memory(){
        /*
            delete similar clusters
            clusters memory

         get 5 the best FROM 
         list_posts_with_activation
         for this SEARCH_QUERY
            5
                //post_name
                //activation
                //is_node

            // get lists_posts memory
            // get current key_search_array
        // create list from this words
        // add general tags from this 
        */
    }
    public function get_and_check_data(){
        $access_arr = $this->check_session_data($this->graph_name);
        $this->start_search_controller($this->graph_name, $this->request_data, $this->collection_post_without_ram, $this->collection_ram_post_name);
    }
}
