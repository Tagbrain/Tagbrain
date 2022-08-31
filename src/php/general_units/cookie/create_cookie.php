<?php

trait create_cookie {
    protected function create_cookie($name_user, $password){

        if (!$_COOKIE["session_user"]){
            setcookie("session_user", $name_user, time() + (86400 * 30), "/");
            setcookie("password", $password, time() + (86400 * 30), "/");
        }

    }
}