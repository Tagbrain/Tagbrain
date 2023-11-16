<?php
trait get_pos_activation {
    protected function get_pos_activation($row_tab_depth, $row_num){
        $pos_activation["column"] = $this->get_column_activation($row_tab_depth);
        $pos_activation["row_L_act"] = $this->get_row_activation($row_num);
        return $pos_activation;
    }

    protected function get_column_activation($tab_depth){
        if($tab_depth <= 2){
            return 10;
        } else if ($tab_depth <= 3){
            return 5;
        } else if ($tab_depth < 5){
            return 2;
        } else {
            return 1;
        }
    }

    protected function get_row_activation($row_num){
        if($row_num < 4){
            return 10;
        } else if($row_num < 8) {
            return 3;
        } else {
            return 1;
        }
    }   
}
