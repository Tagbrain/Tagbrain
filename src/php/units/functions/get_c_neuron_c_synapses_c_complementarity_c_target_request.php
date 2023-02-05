<?php

include_once $_SERVER['DOCUMENT_ROOT']."/php/units/functions/fix_c_neuron_c_extension_x_format.php";
include_once $_SERVER['DOCUMENT_ROOT']."/php/units/functions/get_c_microfeatures_c_format_c_parent_line_child_line.php";

trait get_c_neuron_c_synapses_c_complementarity_c_target_request {
    use fix_c_neuron_c_extension_x_format;
    use get_c_microfeatures_c_format_c_parent_line_child_line;

    protected function get_c_neuron_c_synapses_c_complementarity_c_target_request($neuron_path, $neuron_name, $request_data){
        $neuron_data = array();
        $neuron_id = substr($neuron_name, 0, strrpos($neuron_name, '.'));
        $body_regexp = implode('|', $request_data);
        $new_neuron_path = $this->fix_c_neuron_c_extension_x_format($neuron_path);
        return $this->get_c_microfeatures_c_format_c_parent_line_child_line($new_neuron_path, $neuron_id, $body_regexp);
    }
}