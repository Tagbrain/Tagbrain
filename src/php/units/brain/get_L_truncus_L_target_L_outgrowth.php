
<?php

trait get_L_truncus_L_target_L_outgrowth {
    protected function get_L_truncus_L_target_L_outgrowth(
        $tree, 
        $ind
    ){
        $index = 0;
        $parent_is_exist = false;
        $key_depth = $tree[$ind]["depth"];
        $outgrowth_L_parent = array();
        
        for ($i = $ind - 1; 0 <= $i; $i--) {
            if ($tree[$i]["depth"] < $key_depth) {
            $outgrowth_L_parent = $tree[$i];
            $index = $i;
            $parent_is_exist = true;
            break;
            } else {
            continue;
            }
        }
        
        if ($parent_is_exist == false) {
            return false;
        } else {
            return array(
            "index" => $index,
            "outgrowth_L_parent" => $outgrowth_L_parent
            );
        }
    }
}