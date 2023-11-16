<?php
trait check_session_data {
    
    protected function check_session_data($graph_L_current){
        $access = array(
            "can_editing" => false, 
            "full_access" => false, 
            "private" => false
        );

        if($_SESSION["channel_is_private"]){
            $access["private"] = $_SESSION["channel_is_private"];
        }

        if($_SESSION["userid"]){
            foreach ($_SESSION["all_member_channels"] as $user_L_graph){
                if($user_L_graph == $graph_L_current){
                    if(($_SESSION["creator"][$user_L_graph] == 1) || ($_SESSION["editor"][$user_L_graph] == 1)){
                        $access["can_editing"] = true;
                        $access["private"] = false;
                        if($_SESSION["creator"][$user_L_graph] == 1){
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