<?php 
trait page_state{
    public function state() {
        $request = substr($_SERVER['PHP_SELF'], 0, strrpos($_SERVER['PHP_SELF'], '/'));
        $url_variables = str_replace($request, '', $_SERVER['REQUEST_URI']);
        return $url_variables;
    }
}