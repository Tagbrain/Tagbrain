<?php
trait get_extension {
    function get_extension($neuron_path){
        $path_info = pathinfo($neuron_path);
        return $path_info['extension'];
    }
}