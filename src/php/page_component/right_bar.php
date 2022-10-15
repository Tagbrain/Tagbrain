<div class="tag_container tag_container_on">
	<div class="header_right_bar">

		<span class="item_tags_style">#MAIN_POST</span>
		<span class="item_tags_style">#tags_structure</span>
		<br>
		<br>

		<div class="menu_container_right_bar">
			<div>
				<input type="radio" id="search_right_bar" name="item" checked>
				<label class="menu_item_right_bar" for="search_right_bar" title="Search">
					<svg class="liner_icon_style icon_size_big right_menu_icon">
						<use xlink:href="#sprite_search_tab"></use>
					</svg>
					<svg class="liner_icon_style icon_border">
						<use xlink:href="#sprite_border_icon"></use>
					</svg>
				</label>
			</div>
			<div>
				<input type="radio" id="RAM_right_bar" name="item">
				<label class="menu_item_right_bar" for="RAM_right_bar" title="RAM">				
					<svg class="liner_icon_style icon_size_big right_menu_icon">
						<use xlink:href="#sprite_ram"></use>
					</svg>
					<svg class="liner_icon_style icon_border">
						<use xlink:href="#sprite_border_icon"></use>
					</svg>
				</label>
			</div>
			<div>
				<input type="radio" id="functions_right_bar" name="item">
				<label class="menu_item_right_bar" for="functions_right_bar" title="functions">				
					<svg class="liner_icon_style icon_size_big right_menu_icon">
						<use xlink:href="#sprite_functions_tab"></use>
					</svg>
					<svg class="liner_icon_style icon_border">
						<use xlink:href="#sprite_border_icon"></use>
					</svg>
				</label>
			</div>
			<div>
				<input type="radio" id="channels_map_right_bar" name="item">
				<label class="menu_item_right_bar" for="channels_map_right_bar" title="Your channels">
					<svg class="liner_icon_style icon_size_big right_menu_icon">
						<use xlink:href="#sprite_channels_tab"></use>
					</svg>
					<svg class="liner_icon_style icon_border">
						<use xlink:href="#sprite_border_icon"></use>
					</svg>
				</label>
			</div>
			<div>
				<input type="radio" id="smart_tips_right_bar" name="item">
				<label class="menu_item_right_bar" for="smart_tips_right_bar" title="Tips generator">
					<svg class="liner_icon_style icon_size_big right_menu_icon">
						<use xlink:href="#sprite_smart_tips"></use>
					</svg>
					<svg class="liner_icon_style icon_border">
						<use xlink:href="#sprite_border_icon"></use>
					</svg>
				</label>
			</div>
		</div>
	</div>
	<div class="tab_right_bar_wrap">
		<div class="tab_right_bar">
			<div class="tools_container show_page" id="search_right_bar_page">
				<div class="container_search_tab_input">
					<span id="send_search_request" class="buttons_inputs_search_tab">▷</span>
					<input id="search_input_block" class="input_tools" type="text" placeholder="⌕ Search word">
					<input id="send_search_request" style="display:none;" type="submit">
				</div>
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
				<br>
				

				<button id="replace_word_button">
					Change
				</button>
				<button id="replace_all_words">
					Change all
				</button>

				<br><br>
				<div class="header_reuslt_window">
					<span id="counter_block_found_words"></span> 
					<a id="combine_features" title="collect_need_object">
						<svg class="liner_icon_style icon_size_sl_a_middle">
							<use xlink:href="#sprite_merge_posts"></use>
						</svg>
					<a>
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

			<div class="tools_container" id="functions_right_bar_page">
				<a title="5 last items">Copy buffer</a>
				<br><br>
				<button title="upper/lower case">AA<->aa</button>
				<br><br>
				<div>Clipboard panel</div>
				<div class="clipboard_symbols_panel">
					<button class="tools_button_copy">
						→
					</button>
					<button class="tools_button_copy">
						↑
					</button>
					<button class="tools_button_copy">
						←
					</button>
					<button class="tools_button_copy">
						↓
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