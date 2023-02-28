<?php
include $_SERVER['DOCUMENT_ROOT']."/php/units/functions/state_trait.php";
/* 
json
    [row, depth, content],
    ...
*/
trait transformate_txt_tree_to_json {
    use page_state;
    
    protected function transformate_txt_to_json($neuron_path){
        $this->transformate_neuron_content($neuron_path);
        return $this->replace_extension($neuron_path, "json"); // return new neuron path
    }
    protected function replace_extension($filename, $new_extension) {
        $info = pathinfo($filename);
        $new_path = $info['dirname']."/".$info['filename'] . '.' . $new_extension;
        $is_success = rename($filename, $new_path);
        if ($is_success) {
            return $new_path;
        } else {
            $response = array(
                "status" => "fail",
                "body" => "Failed to change file"
            );
            echo json_encode($response);
            exit();
        }
    }
    protected function transformate_neuron_content($neuron_path){
        //check_node
        $json_tree = array();
        $row = 0;
        $reading = fopen($neuron_path, 'r');
        while(!feof($reading)){
            $line = fgets($reading);
            $array_part_tree = array();

            $line_fixed = str_replace("\n", "", $line);

            $regexp = '/(?<spaces>\s*)|(?<content>[\s\S]*)/i';
            preg_match_all($regexp, $line_fixed, $matches);

            $i = 0;
            foreach($matches['spaces'] as $match_sp){
                $len = strlen($match_sp);
                if($len > 0){
                    if($len){
                        $array_part_tree["depth"] = round($len / 4);
                    }
                }
                if($match_sp == ''){
                    if($matches['content'][$i] != ''){
                        $array_part_tree["content"] = $matches['content'][$i];
                    }
                }
                $i++;
            }

            $array_part_tree["row"] = $row;

            array_push($json_tree, $array_part_tree);
            $row++;
        }
        fclose($reading);

        $json = json_encode(array('outgrowths' => $json_tree));

        if (file_put_contents($neuron_path, $json)){
            //true
        } else {
            $response = array(
                "status" => "fail",
                "body" => "Error in transformate neuron"
            );
            echo json_encode($response);
            exit();
        }
    }
}