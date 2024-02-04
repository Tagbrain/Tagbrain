<?php
include $_SERVER['DOCUMENT_ROOT']."/php/units/functions/check_session_data.php";
include $_SERVER['DOCUMENT_ROOT']."/php/units/functions/collect_random_array.php";
include $_SERVER['DOCUMENT_ROOT']."/php/units/functions/get_neuron_data.php";
include $_SERVER['DOCUMENT_ROOT']."/php/units/functions/get_L_user_graph_L_ram_L_neuron00s_L_id00s.php";

class get_graph_data {
    use collect_random_array;
    use get_neuron_data;
    use check_session_data;
    use get_L_user_graph_L_ram_L_neuron00s_L_id00s;

    function __construct($action, $graph_name, $facultative){
        //consultative
            $this->action = $action;
            if($graph_name == "" || $graph_name == "/"){
                $this->graph_name = "project";
            } else {
                $this->graph_name = $graph_name;
            }
        //facultative
            $this->amount_L_neuron00s = $facultative->amount;
            $this->search_keys = $facultative->search_keys;
            if(property_exists($facultative, "neuron00s_L_id00s"))
                $this->neuron00s_L_id00s = $facultative->neuron00s_L_id00s;
        //macrofeatures
            $this->graph_dir = $_SERVER['DOCUMENT_ROOT']."/channels/".$this->graph_name."/content_items/";
            if (!file_exists($this->graph_dir)) {
                mkdir($this->graph_dir, 0777, true);
            }
        $this->controller_getting_data();
    }

    public function controller_getting_data(){
        if($this->action == 'get_random_neurons'){
            $this->get_random_neurons();
        } else if ($this->action == 'get_mental_image'){
            $this->get_most_activated_neurons();
        } else if ($this->action == 'get_L_neuron00s_L_with_id00s'){
            $this->get_L_neuron00s_L_target();
        }
    }
    protected function collect_c_file00s_c_by_last_modified(
        $neuron00s, 
        $amount_L_neuron00s
    ): array {
        //get_X_sort_L_neuron_L_id_X_time
        $neuron_X_time = [];

        foreach ($neuron00s as $neuron_L_name) {
            if($neuron_L_name == ""){
                continue;
            }
            if(file_exists($this->graph_dir.$file)){
                $neuron_X_time[$neuron_L_name] = filemtime($this->graph_dir.$file);
            }
        }

        arsort($neuron_X_time);

        $neuron00s_L_id_L_current_X_ram = $this->get_L_user_graph_L_ram_L_neuron00s_L_id00s(
            $_SESSION["userid"],
            $this->graph_name
        );

        $neuron00s_L_last_modified = [];
        $ram_X_current = [];

        $i = 0;
        foreach ($neuron_X_time as $neuron_L_name => $time) {
            $i++;
            $is_current_ram = false;
            $neuron_L_id = str_replace(".json","", $neuron_L_name);
            if(in_array($neuron_L_id, $neuron00s_L_id_L_current_X_ram)){
                $ram_X_current[] = $neuron_L_name;
                $is_current_ram = true;
            }
            if($i < $amount_L_neuron00s && $is_current_ram == false){
                $neuron00s_L_last_modified[] = $neuron_L_name;
            } 
        }
        return array(
            "last_modified" => $neuron00s_L_last_modified,
            "ram_X_current" => $ram_X_current
        );
    }

    protected function get_random_neurons(){
        try {
            $files = array_diff(scandir($this->graph_dir), array('..', '.'));
            $neuron00s_data = array(
                "main" => array(),
                "ram" => array()
            ); 

            $obj_neuron00s = $this->collect_c_file00s_c_by_last_modified(
                $files, 
                $this->amount_L_neuron00s + 1
            );

            foreach($obj_neuron00s["ram_X_current"] as $neuron_L_id_X_ram){
                $neuron00s_data_L_ram = $this->get_neuron_data(
                    $this->graph_dir, 
                    $neuron_L_id_X_ram
                );  
                array_push($neuron00s_data["ram"], $neuron00s_data_L_ram);
            }

            foreach($obj_neuron00s["last_modified"] as $neuron_L_id){

                if($neuron_L_id == ""){
                    continue;
                }

                $neuron_data = $this->get_neuron_data(
                    $this->graph_dir, 
                    $neuron_L_id
                );  
                array_push($neuron00s_data["main"], $neuron_data);
            }

            $access = $this->check_session_data($this->graph_name);
            $this->send_data_c_client(
                $access, 
                $neuron00s_data
            );
        } catch (Exception $e){
            $this->return_fail($e);
        };
    }

    protected function get_most_activated_neurons(){
    }

    protected function get_L_neuron00s_L_target(){
        try {
            $access = $this->check_session_data($this->graph_name);
            $data_L_neuron00s = array();
            foreach($this->neuron00s_L_id00s as $neuron_L_id){
                $neuron_data = $this->get_neuron_data(
                    $this->graph_dir, 
                    $neuron_L_id.".json"
                ); 
                array_push(
                    $data_L_neuron00s, 
                    $neuron_data
                );
            }
            $this->send_data_c_client(
                $access, 
                $data_L_neuron00s
            );
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