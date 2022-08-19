<?php

trait get_row_depth {
    protected function get_row_depth($line){
        $tab_depth_counter = 0;
        $regexp = '/./m';
        preg_match_all(
          $regexp,
          $line,
          $line_chars,
          PREG_SET_ORDER
        );
        $j=0;
        while(count($line_chars) > $j){
          if ($line_chars[$j][0] == ' '){
            $tab_depth_counter += 1;
          } else if ($line_chars[$j][0] == '	'){
            $tab_depth_counter += 4;
          } else {
            break;
          }
          $j++;
          continue;
        }
        return $tab_depth_counter;
    }

}