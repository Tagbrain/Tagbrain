<style>.validation_form{font-size:10px;}</style>
<div id="create_channel_form" contenteditable="false">
    <div>
        <input type="text" id="channel_name" required name="" type="text" placeholder="Channel name">
        <br>
        <span id="channel_name_validation" class="validation_form"></span>
    </div>
    <div>
        Private
        <input id="graph_L_is_private" type="checkbox" checked>
    </div>
    <br>
    <button type="submit" id="create_channel_button">Create channel</button>
    <div id="result_form_create_channel" class="validation_form"></div> 
</div>