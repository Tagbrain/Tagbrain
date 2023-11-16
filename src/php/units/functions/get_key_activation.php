<?php
trait get_key_activation{

    protected function get_key_activation($line, $row_num){

    $row_tab_depth = $this->get_row_depth($line);
    $pos_act_obj = $this->get_pos_activation($row_tab_depth, $row_num);
        $c_dep_activ = $pos_act_obj["column"];
        $r_dep_activ = $pos_act_obj["row_L_act"];

    $activation = $c_dep_activ * $r_dep_activ;

    return $activation;
    }
    
}