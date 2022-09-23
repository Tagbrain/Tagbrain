<div class="footer_left_container">
    <?php 
    if($access_arr["can_editing"] == true){
        echo 
                '<a id="search_input" class="create_element_button">'.
                    '<svg class="liner_icon_style icon_size_sl_a_middle">'.
                        '<use xlink:href="#sprite_new_post"></use>'.
                    '</svg>'.
                '</a>'.
                '<div id="saved_not_saved" class="save_not_saved_style"></div>';
    }
    ?>
</div>
<div class="footer_rigth_container">
    <div class="big_arrows_stl" id="scroll_button">
        <svg class="liner_icon_style icon_size_sl_a_middle">
            <use xlink:href="#sprite_arrow"></use>
        </svg>
    </div>
    <div class="switch_right_bar big_arrows_stl" id="switch_right_bar">
        <svg class="liner_icon_style icon_size_sl_a_middle">
            <use xlink:href="#sprite_arrow"></use>
        </svg>
    </div>
</div>