<div class="upper_layer_for_animation">	
	<div class="shadow_background_container_pos shadow_container_property">
		<div id="central_pop_up_block" class="central_pop_up_block">
			<div class="settings_header">
				<a class="exit_icon_pos button_cont_stl" id="exit_button">
					<svg class="liner_icon_style  icon_size_middle">
						<use xlink:href="#sprite_cross"></use>
					</svg>
				</a>
			</div>
			
			<div class="menu_container_settings_pop_up">
				<div>
					<input type="radio" id="general_pop_up" name="group" checked="checked">
					<label class="menu_item_right_bar" for="general_pop_up" title="Draft">				
						<a class="a_cl" title="General">General</a>
					</label>
				</div>
				<div>
					<input type="radio" id="this_channel_pop_up" name="group">
					<label class="menu_item_right_bar" for="this_channel_pop_up" title="Draft">				
						<a class="a_cl" title="This channel">This channel</a>
					</label>
				</div>
				<div>
					<input type="radio" id="statistic_pop_up" name="group">
					<label class="menu_item_right_bar" for="statistic_pop_up" title="">				
						<a class="a_cl" title="Statistic">Statistic</a>
					</label>
				</div>
			</div>

			<div class="tab_right_bar">
	
				<div class="settings_container show_page" id="general_pop_up_page">
					<a class="a_cl">Color theme</a><br>
					<a class="a_cl">Change channel name</a><br>
					<a class="a_cl">Change channel editors</a><br>
					<br>
					<button id="get_channel_data">Get channel data</button>
					<br>
					<div>Date of measurement</div><br>
						<div>Total tags:</div>
						<div>Total rows:</div>
						<div>Total words:</div>
						<div>Total points:</div>
						<br>
					<br>
					<br>
					<div>List of technical words</div>
					<span>(+)</span>
				</div>

				<div class="settings_container" id="this_channel_pop_up_page">
					<a class="a_cl wrong" id="delete_channel">DELETE this channel</a>
				</div>

				<div class="settings_container" id="statistic_pop_up_page">
					<div>Tagbrain knowledge points</div>
					<div>Today</div>
					<div>Week</div>
					<div>Month</div>
					<div>All time</div>
					<div>Activity</div>
				</div>

			</div>
			<div class="settings_pop_up_footer">
					<a class="a_cl">Night mode</a>
			</div>		

		</div>
	</div>
	<div id="post_pop_up_menu" class="post_pop_up_hide">
		<a class="a_cl" id="button_create_from_selection">Create a new post from the selection</a><br>
		<a class="a_cl" id="paste_text">Paste</a><br>
		<a class="a_cl" id="export_content">Export the selection → other channel</a><br>
		<a class="a_cl" id="post_parsing">Post parsing</a>
	</div>
</div>
<div class="bottom_layer_for_img_animation">
	<div class="background_svg_container">
		<svg class="background_svg" viewBox="0 0 1200 1200">
			<use xlink:href="#sprite_background" class=""></use>
		</svg>
		<div id="cellural_automaton"></div>
	</div>
</div>