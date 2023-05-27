<div class="tag_container tag_container_on">
	<div class="header_right_bar">
		<div class="menu_container_right_bar">
			<div>
				<input type="radio" id="search_right_bar" name="item" checked>
				<label class="menu_item_right_bar" for="search_right_bar" title="Search">
					<svg class="linear_icon_c_target icon_size_big right_menu_icon">
						<use xlink:href="#sprite_search_tab"></use>
					</svg>
					<svg class="linear_icon_c_target icon_border">
						<use xlink:href="#sprite_border_icon"></use>
					</svg>
				</label>
			</div>
			<div>
				<input type="radio" id="microfeatures_controller_right_bar" name="item">
				<label class="menu_item_right_bar" for="microfeatures_controller_right_bar" title="Generalization controller">
					<svg class="linear_icon_c_target icon_size_big right_menu_icon">
						<use xlink:href="#sprite_neural_f"></use>
					</svg>
					<svg class="linear_icon_c_target icon_border">
						<use xlink:href="#sprite_border_icon"></use>
					</svg>
				</label>
			</div>
			<div>
				<input type="radio" id="RAM_right_bar" name="item">
				<label class="menu_item_right_bar" for="RAM_right_bar" title="RAM">				
					<svg class="linear_icon_c_target icon_size_big right_menu_icon">
						<use xlink:href="#sprite_ram"></use>
					</svg>
					<svg class="linear_icon_c_target icon_border">
						<use xlink:href="#sprite_border_icon"></use>
					</svg>
				</label>
			</div>
			<div>
				<input type="radio" id="functions_right_bar" name="item">
				<label class="menu_item_right_bar" for="functions_right_bar" title="functions">				
					<svg class="linear_icon_c_target icon_size_big right_menu_icon">
						<use xlink:href="#sprite_functions_tab"></use>
					</svg>
					<svg class="linear_icon_c_target icon_border">
						<use xlink:href="#sprite_border_icon"></use>
					</svg>
				</label>
			</div>
			<div>
				<input type="radio" id="channels_map_right_bar" name="item">
				<label class="menu_item_right_bar" for="channels_map_right_bar" title="Your channels">
					<svg class="linear_icon_c_target icon_size_big right_menu_icon">
						<use xlink:href="#sprite_channels_tab"></use>
					</svg>
					<svg class="linear_icon_c_target icon_border">
						<use xlink:href="#sprite_border_icon"></use>
					</svg>
				</label>
			</div>
			<div>
				<input type="radio" id="smart_tips_right_bar" name="item">
				<label class="menu_item_right_bar" for="smart_tips_right_bar" title="Tips generator">
					<svg class="linear_icon_c_target icon_size_big right_menu_icon">
						<use xlink:href="#sprite_smart_tips"></use>
					</svg>
					<svg class="linear_icon_c_target icon_border">
						<use xlink:href="#sprite_border_icon"></use>
					</svg>
				</label>
			</div>
		</div>
	</div>
	<div class="tab_right_bar_wrap">
		<div class="tab_right_bar">
			<div class="tools_container show_page" id="search_right_bar_page">

				<a id="activation_all_graphes_c_purpose_x_checker_icon" class="icon_buttons_visual_effects" title="Activate actions for all graphes">
					<svg class="linear_icon_c_target icon_size_sl_a_middle" id="checker_id_4">
						<use xlink:href="#sprite_c_search_icons_x_all_graphes"></use>
					</svg>
				</a>

				<div class="container_search_tab_input">
					<input id="search_input_block" autocomplete="off" class="input_tools" type="text" placeholder="⌕ Search RegExp">
					<a id="send_search_request" class="buttons_inputs_search_tab icon_buttons_visual_effects" title="Find synapses">
						<svg class="linear_icon_c_target icon_size_middle">
							<use xlink:href="#sprite_c_search_icons_x_send_request"></use>
						</svg>
					</a>
				</div>

				<div id="settings_objects_search" class="settings_objects_search container_for_buttons">
					<a class="icon_buttons_visual_effects" title="whole words">
						<svg class="linear_icon_c_target icon_size_sl_a_middle" id="checker_id_5">
							<use xlink:href="#sprite_c_search_icons_x_whole_synapse"></use>
						</svg>
					</a>
					<a id="regexp_c_purpose_x_checker_x_search_window" class="icon_buttons_visual_effects" title="Turn on -> Regular expression">
						<svg class="linear_icon_c_target icon_size_sl_a_middle linear_icon_c_target_x_checked">
							<use xlink:href="#sprite_c_search_icons_x_regexp"></use>
						</svg>
					</a>
				</div>

				<div class="container_search_tab_input">
					<input id="replace_input_block" autocomplete="off" class="input_tools" type="text" placeholder="Replace">
					<a id="send_replace_request"  class="buttons_inputs_search_tab icon_buttons_visual_effects" title="Replace synapses">
						<svg class="linear_icon_c_target icon_size_middle">
							<use xlink:href="#sprite_c_search_icons_x_replace"></use>
						</svg>
					</a>
				</div>

				<br><br>
				<div class="header_reuslt_window">
					<span id="counter_block_found_words"></span> 
					<a id="combine_features" title="collect_need_object">
						<svg class="linear_icon_c_target icon_size_sl_a_middle">
							<use xlink:href="#sprite_merge_posts"></use>
						</svg>
					</a>
				</div>
				<div id="result_block" class="container_search_rows output_block">
				</div>
				<br><br><br><br>
			</div>

			<div class="tools_container" id="RAM_right_bar_page">
				<a>Save</a> 
				<a> Clean</a>
				<a>Save_in_cookie</a>
				<div id="last_posts_lists" class="output_block"></div>
			</div>

			<div class="tools_container" id="microfeatures_controller_right_bar_page">
				<div>Neurons:</div>
			    <div>Request tree\generalizated:</div>
				<div id="synapses_tree_x_output_field" class="synapses_tree_x_output_field"></div>
				<button>activate</button>
				<div>Anemones:</div>
				<div id="donors_microfeatures_x_input_field"></div>
				<div>Output\neural_guide:</div>
			</div>

			<div class="tools_container" id="functions_right_bar_page">
				<a title="5 last items">Open_copy_buffer()</a>
				<a title="The most activated synapse of the graph">get_important_synapse()</a>
				<br>
				<div>For developers</div>
				<br>
				<a title="Use this graph syntax">show_str_graph_syntax()</a>
				<br><br>
				<button title="upper/lower case">AA<->aa</button>
				<br><br>
			</div>

			<div class="tools_container" id="channels_map_right_bar_page">
				<?php 
				if($_SESSION["userid"]){
					echo '<div class="channels_user_container">';
					foreach($_SESSION["all_member_channels"] as $access_channels){
						echo "<a id="."channel_".$access_channels." href=".$access_channels.">".$access_channels."</a><br>";
					};
					echo '</div>'.
							'<a title="Create new channel" id="create_new_channel_button">(+)</a>';
				};
				?>
			</div>

			<div class="tools_container" id="smart_tips_right_bar_page">
				<div class="">Tagbrain tips generator</div>
				<div>Dynamic error output</div>
				<button id="check_content">
					Check graph
				</button>
			</div>
		</div>
	</div>
</div>