<?php

trait get_og_c_parent_c_verified {

    protected function get_og_c_parent_c_verified(
        $tree, 
        $cur_c_i
    ){
        $parent00s = array();
        $cur_depth = $tree[$cur_c_i]["depth"];
        for ($i = $cur_c_i; $i >= 0; $i--) {
            $og = $tree[$i];
            if ($og["depth"] < $cur_depth) {//that is parent
                $parent00s[] = $og["content"];
                break;
            }
        }
        return $parent00s;
    }
}