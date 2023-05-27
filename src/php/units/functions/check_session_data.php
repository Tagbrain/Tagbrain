<?php
trait check_session_data {
    
    protected function check_session_data($page_state){
        $access = array(
            "can_editing" => false, 
            "full_access" => false, 
            "private" => false
        );

        if($_SESSION["channel_is_private"]){
            $access["private"] = $_SESSION["channel_is_private"];
        }

        if($_SESSION["userid"]){
            foreach ($_SESSION["all_member_channels"] as $channel_the_user){
                if($channel_the_user == $page_state){
                    if(($_SESSION["creator"][$channel_the_user] == 1) || ($_SESSION["editor"][$channel_the_user] == 1)){
                        $access["can_editing"] = true;
                        $access["private"] = false;
                        if($_SESSION["creator"][$channel_the_user] == 1){
                            $access["full_access"] = true;
                        }
                    }
                    break; 
                }
            };
        }

        return $access;
    }

}