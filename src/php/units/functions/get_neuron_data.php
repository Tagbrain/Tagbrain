<?php
include "get_extension.php";
include "put_right_format_file.php";
include "load_neuron_tree.php";


trait get_neuron_data {
    use get_extension;
    use put_right_format_file;
    use load_neuron_tree;

    function get_neuron_data($graph_link, $neuron_name){
        $neuron_path = $graph_link.$neuron_name;

        $extension = $this->get_extension($neuron_path);
        if($extension != "json"){
            $new_neuron_path = $this->put_right_format_file($neuron_path, $extension);
        } else {
            $new_neuron_path = $neuron_path;
        }
 
        $neuron_id = substr($neuron_name, 0, strrpos($neuron_name, '.'));
        $unix_timestamp = filemtime($new_neuron_path);
        $time_last_change = date("d|m|Y", $unix_timestamp);
        $neuron_tree_json = $this->load_neuron_tree($new_neuron_path);

        //PATH WAS CHANGED
        $neuron_data = array(
            "neuron_id" => $neuron_id,
            "time_last_change" => $time_last_change,
            "neuron_tree_json" => $neuron_tree_json,
         );
         return $neuron_data;
    }
}