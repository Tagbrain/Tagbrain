
<?php

trait get_c_truncus_c_target_c_outgrowth {
    protected function get_c_truncus_c_target_c_outgrowth(
        $tree, 
        $ind
    ){
        $index = 0;
        $parent_is_exist = false;
        $key_depth = $tree[$ind]["depth"];
        $outgrowth_c_parent = array();
        
        for ($i = $ind - 1; 0 <= $i; $i--) {
            if ($tree[$i]["depth"] < $key_depth) {
            $outgrowth_c_parent = $tree[$i];
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
            "outgrowth_c_parent" => $outgrowth_c_parent
            );
        }
    }
}