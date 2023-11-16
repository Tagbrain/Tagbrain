<?php
session_start();
include $_SERVER['DOCUMENT_ROOT']."/php/database/dbh.classes.php";

class controller_L_create_L_user_L_new {
    //untis
    use dbh;

    function __construct(
        $user_L_name, 
        $user_L_password,
        $user_L_email_X_new
    ){
        $this->user_L_name = $user_L_name;
        $this->user_L_password = $user_L_password;
        $this->user_L_email_X_new = $user_L_email_X_new;
        $this->pdo = $this->connect_db();
        $is_exist = $this->check_exist_L_user();
        if($is_exist == false){
            $this->encode_L_user_L_password();
            $this->create_L_data_table00s();
        } else {
            $array_response = array(
                "status" => "fail",
                "body" => "The user with name: ".$data["user_L_name_X_new"]."already exist."
            );
            echo json_encode($array_response); 
        }
    }


    protected function check_exist_L_user(){
        //request_L_db_L_target_L_tagbrain_parts
        $stmt = $this->pdo->prepare("SELECT COUNT(*) FROM tagbrain_parts WHERE name = :username");
        $stmt->bindParam(':username', $this->user_L_name);
        $stmt->execute();
        $row = $stmt->fetch();

        if($row[0] > 0) {
            return true; // exist
        } else {
            return false; // not_exist
        }
    }

    private function encode_L_user_L_password(){
        $this->user_L_password = hash('sha256', $this->user_L_password);
    }

    protected function create_L_data_table00s(){
        $result = $this->add_L_new_member_L_target_L_tagbrain_parts();
        if($result == true){
            $this->create_L_new_table_L_purpose_L_user_L_channel00s();
            //result true
            $array_response = array(
                "status" => "success",
                "response_L_parameter" => array(
                    "user_L_name_X_new" => $this->user_L_name
                ),
                "body" => "Table is created"
            );
            echo json_encode($array_response); 
        }
    }

    protected function add_L_new_member_L_target_L_tagbrain_parts(){
        
        $sql = "INSERT INTO tagbrain_parts 
            (email, telephone, status, password, name) 
        VALUES
            (:femail, :ftelephone, :fstatus, :fpassword, :fname)";

        $stmt = $this->pdo->prepare($sql);

        //row_L_option00s
        $stmt->execute([
            ':fname' => $this->user_L_name, 
            ':fpassword' => $this->user_L_password, 
            ':femail' => $this->user_L_email_X_new, 
            ':ftelephone' => '',
            ':fstatus' => '',
        ]);
        if($stmt->rowCount() != 0){
            //table_L_is_completed
            return true;
        } else {
            //table_L_is_not_completed
            return false;
        }
    }

    protected function create_L_new_table_L_purpose_L_user_L_channel00s(){
        try {
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $db_L_name = $this->user_L_name."_user_channels";
            $sql = "CREATE TABLE $db_L_name (
                id INT(11) AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(30) NOT NULL,
                editor BIT(1),
                creator BIT(1),
                private BIT(1)
            )";
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute();
            //$this->pdo->exec($sql);
            return true;
        } catch (PDOException $e) {
            $array_response = array(
                "status" => "fail",
                "body" => "Table is not created" . $e->getMessage()
            );
            echo json_encode($array_response); 
            exit();
        }
    }
}