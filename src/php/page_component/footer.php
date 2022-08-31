<div class="footer_left_container">
    <?php 
    if($access_arr["can_editting"] == true){
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
    <svg class="liner_icon_style icon_size_sl_a_middle">.
        <use xlink:href="#sprite_merge_posts"></use>.
    </svg>
</div>