<?php

trait put_neuron_tree_in_file {
    protected function put_neuron_tree_in_file($neuron_path, $neuron_tree, $is_adding){
        $json = json_encode(array('outgrowths' => $neuron_tree));
        if($is_adding == true){
            file_put_contents($neuron_path, $json, FILE_APPEND);
        } else {
            file_put_contents($neuron_path, $json);
        }
    }
}