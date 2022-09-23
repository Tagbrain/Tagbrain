<?php
trait session_protect {
    
    protected function check_session_data($session_user, $session_channels, $session_editor, $session_creator, $page_state){
        $access = array("can_editing" => false, "full_access" => false);
        if($session_user){
            foreach ($session_channels as $channel_the_user){
                if($channel_the_user == $page_state){
                    if(($session_creator[$channel_the_user] == 1) || ($session_editor[$channel_the_user] == 1)){
                            $access["can_editing"] = true;
                        if($session_creator[$channel_the_user] == 1){
                            $access["full_access"] = true;
                        }
                        break;
                    }
                } 
            };
        }
        return $access;
    }

}