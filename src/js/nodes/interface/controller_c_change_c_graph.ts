import { generate_c_graph_c_environment } from "../all_posts_action/generate_c_graph_c_environment";

window.onpopstate = function (event: any) {
    if (event.state && event.state.path) {
        let graph_name = document.location.pathname.split("/")[1];
        generate_c_graph_c_environment(graph_name);
    }
}



