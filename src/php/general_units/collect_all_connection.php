<?php 
include "collect_array_tags_neuron.php";
trait collect_all_connection {

    use collect_array_tags_neuron;

    protected function collect_all_connections($files, $dir_brain_files){
        $brain_tags_count = 0;
        $brain_tags = array();

        foreach($files as $file){

            $neuron_path = $dir_brain_files.$file;
            $neuron_tags = $this->collect_array_tags_neuron($neuron_path); 
      
            if(isset($neuron_tags)){
                $brain_tags_count += count($neuron_tags);
                array_push($brain_tags, $neuron_tags);
            }
        }

        return array (
            "brain_tags_count" => $brain_tags_count,
            "brain_tags" => $brain_tags
        );
    }

}