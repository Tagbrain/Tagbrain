<style>
.validation_form{
    font-size:10px;
}
</style>
<div id="create_channel_form" contenteditable="false">
    <div>
        <input type="text" id="channel_name" required minlenght="2" maxlength="100" name="" type="text" placeholder="Channel name">
        <br>
        <span id="channel_name_validation" class="validation_form"></span>
    </div>
    <textarea name="" id="editors_channel" maxlength="1000" type="text" placeholder="Write editors of the channel, use a comma to divide them"></textarea>
    <br />
    <span id="editors_channel_validation" class="validation_form"></span>
    <div>
        Private
        <input id="public_checkbox" type="checkbox" checked>
    </div>
    <br>
    <button type="submit" id="create_channel_button">Create channel</button>
    <br><br>
    <div id="result_form_create_channel" class="validation_form"></div> 
</div>