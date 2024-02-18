<?php

include_once $_SERVER['DOCUMENT_ROOT']."/php/units/functions/fix_L_neuron_L_extension_x_format.php";
include_once $_SERVER['DOCUMENT_ROOT']."/php/units/functions/get_L_microfeatures_L_format_L_parent_line_child_line.php";

trait get_L_neuron_L_synapses_L_complementarity_L_target_request {
    use fix_L_neuron_L_extension_x_format;
    use get_L_microfeatures_L_format_L_parent_line_child_line;

    protected function get_L_neuron_L_synapses_L_complementarity_L_target_request($neuron_path, $neuron_name, $request_data){
        $neuron_data = array();
        $neuron_id = substr($neuron_name, 0, strrpos($neuron_name, '.'));
        $body_regexp = implode('|', $request_data);
        $new_neuron_path = $this->fix_L_neuron_L_extension_x_format($neuron_path);
        return $this->get_L_microfeatures_L_format_L_parent_line_child_line(
            $new_neuron_path, 
            $neuron_id, 
            $body_regexp
        );
    }
}