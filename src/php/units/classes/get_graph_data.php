<?php
include $_SERVER['DOCUMENT_ROOT']."/php/units/functions/check_session_data.php";
include $_SERVER['DOCUMENT_ROOT']."/php/units/functions/collect_random_array.php";
include $_SERVER['DOCUMENT_ROOT']."/php/units/functions/get_neuron_data.php";

class get_graph_data {
    use collect_random_array;
    use get_neuron_data;
    use check_session_data;

    function __construct($action, $graph_name, $facultative){
        //consultative
            $this->action = $action;
            if($graph_name == "" || $graph_name == "/"){
                $this->graph_name = "project";
            } else {
                $this->graph_name = $graph_name;
            }
        //facultative
            $this->amount = $facultative->amount;
            $this->search_keys = $facultative->search_keys;
            $this->neuron_id = $facultative->neuron_id;
        //macrofeatures
            $this->graph_dir = $_SERVER['DOCUMENT_ROOT']."/channels/".$this->graph_name."/content_items/";

        $this->controller_getting_data();
    }

    public function controller_getting_data(){
        if($this->action == 'get_random_neurons'){
            $this->get_random_neurons();
        } else if ($this->action == 'get_mental_image'){
            $this->get_most_activated_neurons();
        } else if ($this->action == 'get_c_neuron_c_with_id'){
            $this->get_current_neuron();
        }
    }
    protected function collect_c_file00s_c_by_last_modified($file00s, $amount): array {
        $file_info = [];
        foreach ($file00s as $file) {
            $file_info[$file] = filemtime($this->graph_dir.$file);
        }
        arsort($file_info);
        $file00s_c_sorted = [];
        $file00s_c_other = [];
        $i = 0;
        foreach ($file_info as $file => $time) {
            $i++;
            if($i < $amount){
                $file00s_c_sorted[] = $file;
            } else {
                $file00s_c_other[] = $file;
            }
        }
        return array(
            "last_c_modified" => $file00s_c_sorted,
            "other" => $file00s_c_other
        );
    }

    protected function get_random_neurons(){
        try {
            $files = array_diff(scandir($this->graph_dir), array('..', '.'));
            $neuron_data_arr = array(); 

            $obj_file00s = $this->collect_c_file00s_c_by_last_modified($files, 11);

            if(count($obj_file00s["other"]) > 10){
                $obj_file00s["other"] = $this->collect_random_array($obj_file00s["other"], 10);
            }

            $file00s_c_target = $obj_file00s["last_c_modified"] + $obj_file00s["other"];

            foreach($file00s_c_target as $file_c_id){

                if($file_c_id == ""){
                    continue;
                }

                $neuron_data = $this->get_neuron_data($this->graph_dir, $file_c_id);  
                array_push($neuron_data_arr, $neuron_data);
            }

            $access = $this->check_session_data($this->graph_name);
            $this->send_data_c_client($access, $neuron_data_arr);
        } catch (Exception $e){
            $this->return_fail($e);
        };
    }

    protected function get_most_activated_neurons(){
    }

    protected function get_current_neuron(){
        try {
            $access = $this->check_session_data($this->graph_name);
            $neuron_data = $this->get_neuron_data($this->graph_dir, $this->neuron_id.".json"); 
            $this->send_data_c_client($access, $neuron_data);
        } catch (Exception $e){
            $this->return_fail($e);
        };
    }

    public function output_list_posts_variable($graph_folder){     
   }
   protected function get_c_string_c_theme_c_css(){
    function convertCssToString($filePath) {
        if (!file_exists($filePath)) {
          return false; 
        }
      
        $cssString = file_get_contents($filePath); // Получаем содержимое CSS файла в виде строки
        return base64_encode($cssString);
      }
    $theme_path = $_SERVER['DOCUMENT_ROOT']."/channels/".$this->graph_name."/css/theme.css";
    $cssString = convertCssToString($theme_path);
    return $cssString;
   }
    protected function get_c_header_c_animation(){
        function convert_c_html_c_to_string($filePath) {
            if (!file_exists($filePath)) {
                return false; // 
            }
            $html_c_string = file_get_contents($filePath); 
            return $html_c_string;
        }
        $animation_c_path = $_SERVER['DOCUMENT_ROOT']."/channels/".$this->graph_name."/header_animation.php";
        $str_x_false = convert_c_html_c_to_string($animation_c_path);
        if($str_x_false == false){
            return "";
        } else {
            return $str_x_false;
        }
    }

   protected function return_fail($data){
    $response = array(
        "status" => "fail",
        "data" => $data,
        "graph_name" => $this->graph_name,
        "contenteditable" => "error"
    );
    echo json_encode($response);
   }
   protected function return_success($data, $access){
    $response = array(
        "status" => "success",
        "data" => $data,
        "contenteditable" => $access["can_editing"],
        "private" => $access["private"],
        "graph00s_c_name00s" => $_SESSION["all_member_channels"],
        "user" => $_SESSION["userid"],
        "channel_is_private" => $_SESSION["channel_is_private"],
        "graph_c_style00s" => $this->get_c_string_c_theme_c_css(),
        "channel_c_header_c_animation" => $this->get_c_header_c_animation()
    );
    echo json_encode($response);
   }
   protected function send_data_c_client($access, $data){
    if($access["private"] == true){
        if($access["can_editing"] == true){
            $this->return_success($data, $access);
        } else {
            $this->return_fail("The channel is private. Log in");
        }
    } else {
        $this->return_success($data, $access);
    }
   }
}