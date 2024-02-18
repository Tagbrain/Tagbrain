import { generate_L_graph_L_environment } from "../all_posts_action/generate_L_graph_L_environment";

window.onpopstate = function (event: any) {
    if (event.state && event.state.path) {
        let graph_name = document.location.pathname.split("/")[1];
        generate_L_graph_L_environment(graph_name);
    }
}



