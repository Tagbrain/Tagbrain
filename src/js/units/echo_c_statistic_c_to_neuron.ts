import { elements } from "../nodes/neuron_action_controller/obj_post_edit_f";
import { functions } from "../nodes/neuron_action_controller/obj_post_edit_f";

export function echo_c_statistic_c_to_neuron() {
    let count_rows: number = 0,
        count_tags: number = 0,
        count_words: number = 0,
        count_points: number = 0,
        count_words_arr: any = [],
        count_tags_arr: any = [],
        rows_arr: NodeListOf<ChildNode>,
        content = elements.current_post.textContent;

    let patterns1 = {
        words: /[^\s]*[\p{L}\p{P}_0-9]/gu,
    }

    //get not empty rows
    rows_arr = elements.current_post.childNodes;
    if (rows_arr != null) {
        for (let j = 0; j < rows_arr.length; j++) {
            let text_characters_arr: any = [];
            let text = rows_arr[j].textContent;
            if (text != null)
                text_characters_arr = text.match(/[^\s]*[\p{L}\p{P}_0-9]/gu);
            if (text_characters_arr != null)
                count_rows += 1;
        }
    }

    if (content != null) {
        //get count words
        count_words_arr = content.match(patterns1.words);
        if (count_words_arr != null)
            count_words = count_words_arr.length;

        //get count tags
        //let reg_tag = new RegExp(patterns.pattern_tag, 'gui')
        count_tags_arr = content.match(/#[\p{L}_0-9]*/gui);
        if (count_tags_arr != null)
            count_tags = count_tags_arr.length;
    }

    //sigmoid(count_tags)

    let counters = {
        words: count_words,
        rows: count_rows,
        tags: count_tags,
    }

    //let points = (normalizing_tag_f(count_tags) * normalizing_rows_f(count_rows) / normalizing_words_f(count_words);

    function normalizing_tag_f(count_tags: number) {
        sigmoid(count_tags)
    }

    function normalizing_rows_f(count_rows: number) {
        sigmoid(count_tags)
    }

    function normalizing_words_f(count_words: number) {
        //let count_words_index = 0.0001*(count_words**2) - (0.02*count_words) + 1.0001;
        //after extreme other function
        //count_words = 0,001*(count_words**2) - (0,02*count_words) + 7,99;
        //sigmoid(count_words)
        sigmoid(count_words)
    }


    //check structurization
    if (count_rows * 3 > count_words) {
        count_points = (count_tags * count_rows) / (2 * count_words);
    } else {
        count_points = (count_tags * count_rows) / count_words;
    }

    //math
    function sigmoid(z: number) {
        return 10 / (1 + Math.exp(-z));
    }
    function echo_points(count_points: number) {
        let hard_index = 10;
        let result = sigmoid(count_points / hard_index);
        return result;
    }
    count_points = echo_points(count_points);
    count_points = Math.floor(count_points * 10) / 10;

    let post_low_panel_parent = elements.current_post.parentNode,
        post_low_panel_parent2,
        fields_count;
    if (post_low_panel_parent != null)
        post_low_panel_parent2 = post_low_panel_parent.parentNode;
    if (post_low_panel_parent2 != null)
        fields_count = post_low_panel_parent2.querySelector(".post_low_panel");
    if (fields_count != null) {
        let count_rows_node = fields_count.querySelector(".count_rows"),
            count_words_node = fields_count.querySelector(".count_words"),
            count_tags_node = fields_count.querySelector(".count_tags"),
            count_points_node = fields_count.querySelector(".count_points");
        if (count_words_node != null) {
            if (count_words > 500) {
                count_words_node.innerHTML = "W: " + "<error>" + count_words + "</error>";
            } else {
                count_words_node.textContent = "W: " + count_words;
            }
            if (count_rows_node != null)
                count_rows_node.textContent = "R: " + count_rows;
            if (count_tags_node != null)
                count_tags_node.textContent = "#: " + count_tags;
            if (count_points_node != null)
                count_points_node.textContent = "points: " + count_points;
        }
    }
    //make vertical lines HG
}