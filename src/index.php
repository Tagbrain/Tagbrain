<?php

session_start([
	'cookie_lifetime' => 3600000,
]);
include_once $_SERVER['DOCUMENT_ROOT']."/php/sessions/sign_in/includes.php";

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

include_once $_SERVER['DOCUMENT_ROOT']."/php/engine/determinator_page_content.php";
include_once $_SERVER['DOCUMENT_ROOT']."/php/units/functions/check_session_data.php";

$data = new load_page_vars();

$channel_private = $data->is_channel_private();
$_SESSION["channel_is_private"] = $channel_private;
$page_state = $data->state();
//remove first slash
$first_letters = substr($page_state, 0, 1);
if($first_letters == "/"){
	$page_state = substr($page_state, 1); 
}

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
		<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
		<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
		<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
		<title>Tagbrain</title>
		</head>
	<body>
		<?php include("php/page_component/animation_layers.php"); ?>
		<div class="grid" id="wave_container"></div>
		<div class="site_template">
				<?php include("php/page_component/header.php"); ?>
			<div class="container_work">
				<div id="tab_container" class="tab_container"></div>
				<div id="mental_image_c_container" class="mental_image_c_container">
						<!-- mental_images_c_js_injection_c_action-->
				</div>
				<?php include("php/page_component/right_bar.php"); ?>
			</div>
			<footer class="footer" style="transform: translate(0px) scale(1);">	
				<?php include("php/page_component/footer.php"); ?>
			</footer>
		</div>
		<div id="layoutViewport"></div>
		<script src="js/bundle.js"></script>
		<script src="js/generator.js"></script>
		<script src="js/history.js"></script>
	</body>
</html>
<?php include "img/svg_sprite.php"; ?>