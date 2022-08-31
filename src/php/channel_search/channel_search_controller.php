<?php
session_start();
include "../protect/server_protect.php";
include "../general_units/activation/get_post_search_obj.php";
include "../engine/load_post_content.php";

class search_controller {
    //untis
    use session_protect;
    use get_post_search_obj;
    use load_post_content;

    public $pattern_tag = '/#[\p{L}_0-9]*/i';

    //controller
    protected function start_search_controller($channel_name, $array_of_search_key, $collection_post_without_ram, $collection_ram_post_name){


        $channel_posts_dir = __DIR__ . "/../../channels/".$channel_name."/content_items/";
        $files = array_diff(scandir($channel_posts_dir), array('.', '..'));

        $channel_search_obj = array();
        $general_tags_count = 0;
        foreach($files as $file){
            $file_id = str_replace(".php", "", $file);
            
            foreach($collection_ram_post_name as $num => $ram_post_front_end){
                if($ram_post_front_end == $file_id){
                    continue 2;
                }
            }

            $file_path = $channel_posts_dir.$file;

            $post_search_obj = $this->get_post_search_obj($array_of_search_key, $file_path);
            if($post_search_obj != false){
                $post_search_obj["file_name"] = $file_id;
                array_push($channel_search_obj, $post_search_obj);
            }

            $general_tags_count += $post_search_obj["tags_count"];
        }
        
        /*print_r($channel_search_obj);
        echo json_encode($channel_search_obj);
        exit();
        */
 
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

        if(count($channel_search_obj) < 10){
            $splice_group = array_splice($channel_search_obj, 0, 10);
            $finded_posts = $splice_group;
        } else if (count($channel_search_obj) > 10){
            $splice_group = array_splice($channel_search_obj, 0, 20);
            $finded_posts = $splice_group;
        }
        
        for($i=0; $i<count($finded_posts); $i++){
            $cont_file_path = $channel_posts_dir."/".$finded_posts[$i]["file_name"].".php";
            $content = $this->loadDataFromFile($cont_file_path);
            $finded_posts[$i]["content"] = $content; 
        }

        /*
        print_r($finded_posts);
        echo json_encode($finded_posts);
        exit();
        */
        
        $exist_posts = array();
        $remove_posts = array();
        $add_posts = array();



        foreach($finded_posts as $finded_post){
            

            $is_exist = false;
            
            foreach($collection_post_without_ram as $num => $post_front_end){

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
        
        $remove_posts = array_diff($collection_post_without_ram, $exist_posts);

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
            "all_tags" => $general_tags_count
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

    public function get_and_check_data($channel_name, $array_of_search_key, $collection_post_without_ram, $collection_ram_post_name){

        $can_editing = $this->check_session_data($_SESSION["userid"],$_SESSION["all_member_channels"], $_SESSION["editor"],$_SESSION["creator"], $channel_name);

        if($can_editing == true){

            $this->start_search_controller($channel_name, $array_of_search_key, $collection_post_without_ram, $collection_ram_post_name);

        } else {
            echo "No access";
        }

    }
    
}

//definition
$user = $_SESSION["userid"];
$data = json_decode($_POST["data"]);
    $channel_name = $data->channel_name;
    $array_of_search_key = $data->array_of_search_key;
    $collection_post_without_ram = $data->collection_post_without_ram;
    $collection_ram_post_name = $data->collection_ram_post_name;

//init_controller    
if(isset($channel_name, $array_of_search_key)){
    $search_controller = new search_controller();
    $search_controller->get_and_check_data($channel_name, $array_of_search_key, $collection_post_without_ram, $collection_ram_post_name);
} else {
    echo "Data is not complete";
}


