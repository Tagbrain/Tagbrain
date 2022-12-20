<?php
session_start([
	'cookie_lifetime' => 3600000,
]);
include $_SERVER['DOCUMENT_ROOT']."/php/sessions/sign_in/includes.php";
if(!$_SESSION["userid"]){
	if(count($_COOKIE) > 0) {
		if($_COOKIE["session_user"]){
			//refresh session
			set_sign_controller($_COOKIE["session_user"].":".$_COOKIE["password"]);
		}
	} else {
		//Cookies are disabled
	}
}

include $_SERVER['DOCUMENT_ROOT']."/php/engine/determinator_page_content.php";
include $_SERVER['DOCUMENT_ROOT']."/php/units/functions/protect_session.php";

$channel_private = $data->is_channel_private();
$page_state = $data->state();
//remove first slash
$first_letters = substr($page_state, 0, 1);
if($first_letters == "/"){
	$page_state = substr($page_state, 1);  
}

class header_check_session{
	
	use session_protect;
	public function check_session($page_state){
		return $this->check_session_data($page_state);
	}

}
$header_check_session = new header_check_session();
$access_arr = $header_check_session->check_session($page_state);

//all session variables
	//$_SESSION["userid"];
	//$_SESSION["all_member_channels"];

	//for this channel
		//$_SESSION["editor"];
		//$_SESSION["creator"];
		//$_SESSION["private"];
//not session
	//$access_arr["can_editing"];
	//$access_arr["full_access"];
?>
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
		<link rel="stylesheet" href="css/collector.css?v=7117">
		<?php echo '<link rel="stylesheet" href="'.$_SERVER['DOCUMENT_ROOT'].'/channels/'.$page_state.'/css/theme.css'.'">'; ?>
		<title>Tagbrain</title>
		<?php
		if($page_state == "math"){
			echo '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.15.3/dist/katex.min.css" integrity="sha384-KiWOvVjnN8qwAZbuQyWDIbfCLFhLXNETzBQjA/92pIowpC0d2O3nppDGQVgwd2nB" crossorigin="anonymous">
			<script defer src="https://cdn.jsdelivr.net/npm/katex@0.15.3/dist/katex.min.js" integrity="sha384-0fdwu/T/EQMsQlrHCCHoH10pkPLlKA1jL5dFyUOvB3lfeT2540/2g6YgSi2BL14p" crossorigin="anonymous"></script>
			<script defer src="https://cdn.jsdelivr.net/npm/katex@0.15.3/dist/contrib/auto-render.min.js" integrity="sha384-+XBljXPPiv+OzfbB3cVmLHf4hdUFHlWNZN5spNQ7rmHTXpd7WvJum6fIACpNNfIR" crossorigin="anonymous"></script>';
		}
		?>
		</head>
	<body>
		<?php include("php/page_component/animation_layers.php"); ?>
		<div class="grid" id="circle_cont"></div>
		<div class="site_template">
				<?php include("php/page_component/header.php"); ?>
			<div class="container_work">
				<div id="tab_container" class="tab_container"></div>
				<div class="neuron_container">
					<div id="search_container" class="neuron_container_unit hide_cl">
						<span class="">
							Test field
						</span>
						<input placeholder="parents keys" type="text">
						<input placeholder="child keys" type="text">
					</div>
					<div id="items_container" class="neuron_container_unit">
						<div id="loading_flag">Loading...</div>
						<!-- ?php echo($data->content($page_state, $data->get_channel_properties_array(), $access_arr["can_editing"])); ?>-->
					</div>
				</div>
				<?php include("php/page_component/right_bar.php"); ?>
			</div>
			<footer class="footer">	
				<?php include("php/page_component/footer.php"); ?>
			</footer>
		</div>
		<script src="js/bundle.js"></script>
		<script src="js/generator.js"></script>
		<script src="js/history.js"></script>
	</body>
</html>
<?php include "img/svg_sprite.php"; ?>