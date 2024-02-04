<?php

trait load_neuron_tree{

   protected function load_neuron_tree($file, $is_urlecode){
      if(file_exists($file)){
         $file_data = file_get_contents($file);
         $neuron_tree = json_decode($file_data, true);
         return $neuron_tree["outgrowths"];
      } else {
         return false;
      }
   }
}
/*
outgrowths
   content
   depth
*/ 