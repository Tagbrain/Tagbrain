<?php

include "php/database/dbh.classes.php";
include "php/units/functions/state_trait.php";

class load_page_vars {
    use dbh;
    //get url variables
    use page_state;

    //return name page appropriate s_t_a_t_e
    public function get_channel_data(){
        $stmt = $this->connect_db()->prepare("SELECT name, link, private FROM channels");
        $stmt->execute();
        $this->channels_data = $stmt->fetchAll();
        return $this->channels_data;
    }

    function title($table){
        $table = $this->get_channel_data();
        $i=0;
        foreach($table as $row => $value){  
            if("./".$table[$i]["link"] == ".".$this->state()){
                return $table[$i]["name"];
            }
            $i++;
        }

    }
    function is_channel_private(){
        $table = $this->get_channel_data();
        $channel_private = true;
        $i=0;
        foreach($table as $row => $value){ 
            if("./".$table[$i]["link"] == ".".$this->state()){
                if($table[$i]["private"] == "0"){
                    $channel_private = false; 
                } 
            }
            $i++;
        }
        return $channel_private;
    }

    function get_channel_properties_array(){
        $table = $this->get_channel_data();
        $i=0;
        $exist = false;
        $access = false;

        $channel_title = "Project";
        foreach($table as $row => $value){ 
            //exist 
            if("./".$table[$i]["link"] == ".".$this->state()){
                $exist = true;
            }
            //private
            if("./".$table[$i]["link"] == ".".$this->state()){
                if($table[$i]["private"] == "0"){
                    $access = true; 
                } else {
                    if($_SESSION["all_member_channels"]){
                        foreach($_SESSION["all_member_channels"] as $n => $channel){
                            if($channel == substr($this->state(), 1)){
                                $access = true; 
                            }
                        }
                    }
                }
            }
            //name
            if("./".$table[$i]["link"] == ".".$this->state()){
                $channel_title = $table[$i]["name"];
            }
            $i++;
        }
        return [$channel_title, $exist, $access];
    }

    function content($page, $get_channel_properties_array, $can_editing){
        //access page  
        $exist = $get_channel_properties_array[1];
        $access = $get_channel_properties_array[2];
         
        //if home page
        if($this->state() == "/" || $this->state() == "/project"){
            $exist = true;
            $access = true;
            $page = "/project";
        }
        if($access == true){
            if($exist == true){
                $page_name = $get_channel_properties_array[0];
                $post = array(
                    'page' => $page,
                    'name' => $page_name,
                    'can_editing' => $can_editing,
                    'password' => '',
                    'submit' => TRUE,
                );
                $data = http_build_query($post);
                $opts = array(
                        'http' => array(
                            'method' => 'POST',
                            'header' => "Content-type: application/x-www-form-urlencoded\r\nContent-Length: " . strlen($data) . "\r\n",
                            'content' => $data,
                        )
                        );
                $context = stream_context_create($opts);

                $url = $this->siteURL()."/php/engine/content_post.php";
                $content = file_get_contents($url,FALSE,$context);
            } else {
                //post format function
                $content = 
                '<div class="item" id="Channel_not_exist">'.
                    '<div class="sense_item">'.
                        '<div id="network_not_exist" class="item_input">'.
                            '<div class="wrong">This channel doesn\'t exist</div>'.
                            '<a href="/project" class="a_cl">Main page</a>'.
                        '</div>'.
                    '</div>'.
                '</div>';
            }
        } else {
            $content = 
            '<div class="item" id="Channel_not_exist">'.
                '<div class="sense_item">'.
                    '<div id="network_not_exist" class="item_input">'.
                        '<div class="wrong">This channel is private</div>'.
                        '<a href="/project" class="a_cl">Main page</a>'.
                    '</div>'.
                '</div>'.
            '</div>';
        }
        return $content;
    }
    

    //get site url start page
    function siteURL(){
        //get protocol
        if (isset($_SERVER['HTTPS']) &&
            ($_SERVER['HTTPS'] == 'on' || $_SERVER['HTTPS'] == 1) ||
            isset($_SERVER['HTTP_X_FORWARDED_PROTO']) &&
            $_SERVER['HTTP_X_FORWARDED_PROTO'] == 'https') {
          $protocol = 'https://';
        }
        else {
          $protocol = 'http://';
        }

        $siteUrl = $protocol.$_SERVER["HTTP_HOST"].$_SERVER["PHP_SELF"];
        return dirname($siteUrl);
   }
}

$data = new load_page_vars();
?>
