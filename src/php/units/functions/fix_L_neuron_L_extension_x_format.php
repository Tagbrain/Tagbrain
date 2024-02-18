<?php
include_once $_SERVER['DOCUMENT_ROOT']."/php/units/functions/get_extension.php";
include_once $_SERVER['DOCUMENT_ROOT']."/php/units/functions/put_right_format_file.php";

trait fix_L_neuron_L_extension_x_format {
    use get_extension;
    use put_right_format_file;

    protected function fix_L_neuron_L_extension_x_format($neuron_path){
        $extension = $this->get_extension($neuron_path);
        $new_neuron_path = "";
        if($extension != "json"){
            $new_neuron_path = $this->put_right_format_file($neuron_path, $extension);
        } else {
            $new_neuron_path = $neuron_path;
        }
        return $new_neuron_path;
    }
}