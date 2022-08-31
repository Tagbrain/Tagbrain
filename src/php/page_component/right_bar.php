<div class="tag_container tag_container_on">
	<div class="header_right_bar">


		<span class="item_tags_style">#MAIN_POST</span>
		<span class="item_tags_style">#tags_structure</span>
		<a id="work_mode_button" class="icon_buttons_visual_effects" title="Work Mode"> ⚡</a>
		<br>
		<br>
		<div class="tab_right_bar">
			<input type="radio" id="search_right_bar" name="tab-group-1" class="input_check" checked>
			<label class="menu_item_right_bar" for="search_right_bar" title="Search">
				<svg class="liner_icon_style icon_size_big right_menu_icon">
					<use xlink:href="#sprite_search_tab"></use>
				</svg>
				<svg class="liner_icon_style icon_border">
					<use xlink:href="#sprite_border_icon"></use>
				</svg>
			</label>
			<div class="tools_container" id="search_right_bar_container">

				<div class="container_search_tab_input">
					<span id="send_search_request" class="buttons_inputs_search_tab">▷</span>
					<input id="search_input_block" class="input_tools" type="text" placeholder="⌕ Search word">
				</div>
				<br>
				<div id="settings_objects_search" class="settings_objects_search collaps_block container_for_buttons">
					<span class="">
						<button class="button_cont_stl">
							<svg class="liner_icon_style icon_size_middle">
								<use xlink:href="#sprite_association"></use>
							</svg>
						</button>
						<button class="button_cont_stl">
							<svg class="liner_icon_style icon_size_middle">
								<use xlink:href="#sprite_intersection"></use>
							</svg>
						</button>
					</span>
					<input placeholder="parents keys" type="text">
					<input placeholder="child keys" type="text">
				</div>

				<div class="container_search_tab_input">
					<span id="send_replace_request" class="buttons_inputs_search_tab">▷</span>
					<input id="replace_input_block" class="input_tools" type="text" placeholder="Replace">
				</div>
				<br><br>
				

				<button id="replace_word_button">
					Change
				</button>
				<button id="replace_all_words">
					Change all
				</button>

				<br><br>
				<div>
					<span id="counter_block_found_words"></span> <span id="collect_need_object" title="collect_need_object">C<span>
				</div>
				<div id="result_block" class="container_search_rows output_block">
				</div>
				<br><br><br><br>
			</div>
		</div>

		<div class="tab_right_bar">
			<input type="radio" id="RAM_right_bar" class="input_check" name="tab-group-1">
			<label class="menu_item_right_bar" for="RAM_right_bar" title="RAM">				
				<svg class="liner_icon_style icon_size_big right_menu_icon">
					<use xlink:href="#sprite_ram"></use>
				</svg>
				<svg class="liner_icon_style icon_border">
					<use xlink:href="#sprite_border_icon"></use>
				</svg>
			</label>
			<div class="tools_container" id="RAM_right_bar_container">
				<a>Save</a> 
				<a> Clean</a>
				<a>Save_in_cookie</a>
				<div id="last_posts_lists" class="output_block"></div>
			</div>
		</div>
		
		<div class="tab_right_bar">
			<input type="radio" id="functions_right_bar" class="input_check" name="tab-group-1">
			<label class="menu_item_right_bar" for="functions_right_bar" title="functions">				
				<svg class="liner_icon_style icon_size_big right_menu_icon">
					<use xlink:href="#sprite_functions_tab"></use>
				</svg>
				<svg class="liner_icon_style icon_border">
					<use xlink:href="#sprite_border_icon"></use>
				</svg>
			</label>
			<div class="tools_container" id="functions_right_bar_container">
				<div>Clipboard panel</div>
				<div class="clipboard_symbols_panel">
					<button class="tools_button_copy">
						●
					</button>
					<button titile="connector: object•object" class="tools_button_copy">
						•
					</button>
					<button class="tools_button_copy">
						✖
					</button>
					<button title="copy TAB" class="tools_button_copy">
						&nbsp;&nbsp;&nbsp;&nbsp;
					</button>
					<button class="tools_button_copy">
						〇
					</button>
					<button class="tools_button_copy">
						⊃
					</button>
					<button class="tools_button_copy">
						⊂
					</button>
					<button class="tools_button_copy">
						⋃
					</button>
					<button class="tools_button_copy">
						⋂
					</button>
					<button class="tools_button_copy">
						↑
					</button>
					<button class="tools_button_copy">
						←
					</button>
					<button class="tools_button_copy">
						→
					</button>
					<button class="tools_button_copy">
						↓
					</button>
					<button class="tools_button_copy">
						×
					</button>
					<button title="?" class="tools_button_copy">
						⌗
					</button>
					<button class="tools_button_copy">
						≈
					</button>
					<button title="addition_[properties]" class="tools_button_copy">
						+
					</button>
					<button title="$variable_name=#tag(#tag(text))" class="tools_button_copy">
						$
					</button>
					<button class="tools_button_copy">
						#
					</button>
					<button class="tools_button_copy">
						&
					</button>
					<button class="tools_button_copy">
						!
					</button>
					<button class="tools_button_copy">
						/
					</button>
					<button class="tools_button_copy">
						?
					</button>
					<button class="tools_button_copy">
						{}
					</button>
					<button class="tools_button_copy">
						()
					</button>
					<button class="tools_button_copy">
						[]
					</button>
					<button title="mask of input structure: @[class1 → class2], class1 are basic properties, class2 are terminal properties" class="tools_button_copy">
						@
					</button>
					<button title="subitems for describe GENERAL properties uplying subitems" class="tools_button_copy">
						(G)
					</button>	
					<button title="SPECIFIC properties an uplying item" class="tools_button_copy">
						(S)
					</button>	
					<button class="tools_button_copy">
						—
					</button>
					<button class="tools_button_copy" title="item_n or item_m">
						||
					</button>
				</div>
				<br><br>
				<div class="clipboard_symbols_panel">
				<span class="tools_button_copy">
					🕸
				</span>
				<span class="tools_button_copy">
				⚡️
				</span>
				<span title="best" class="tools_button_copy">
							✅
						</span>
						<span title="good" class="tools_button_copy">
							☑️
						</span>
						<span title="medium" class="tools_button_copy">
							✔️
						</span>
						<span title="development" class="tools_button_copy">
						⚠️
						</span>
				</div>
			</div>
		</div>

		<div class="tab_right_bar">
			<input type="radio" id="channels_map_right_bar" class="input_check" name="tab-group-1">
			<label class="menu_item_right_bar" for="channels_map_right_bar" title="Your channels">
				<svg class="liner_icon_style icon_size_big right_menu_icon">
					<use xlink:href="#sprite_channels_tab"></use>
				</svg>
				<svg class="liner_icon_style icon_border">
					<use xlink:href="#sprite_border_icon"></use>
				</svg>
			</label>
			<div class="tools_container" id="channels_map_right_bar_container">
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
		</div>

		<div class="tab_right_bar">
			<input type="radio" id="smart_tips_right_bar" class="input_check" name="tab-group-1">

			<label class="menu_item_right_bar" for="smart_tips_right_bar" title="Tips generator">
				<svg class="liner_icon_style icon_size_big right_menu_icon">
					<use xlink:href="#sprite_smart_tips"></use>
				</svg>
				<svg class="liner_icon_style icon_border">
					<use xlink:href="#sprite_border_icon"></use>
				</svg>
			</label>

			<div class="tools_container">
				<div class="">Tagbrain tips generator</div>
				<div>Dynamic error output</div>
				<button id="check_content">
					Check graph
				</button>
			</div>
		</div>
		

	</div>
</div>