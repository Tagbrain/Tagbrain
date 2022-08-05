//change_url
/*
function handlerAnchors() {
    var state = {
        title: this.getAttribute( "title" ),
        url: this.getAttribute( "href", 2 )
    }

    history.pushState( state, state.title, state.url );
    document.title = state.title;
    reAnswer(state.url, state.title);
    return false;
}

var anchor = document.getElementById('link_generator');
anchor.onclick = handlerAnchors;

window.onpopstate = function( e ) {
     document.title = history.state.title;
     reAnswer(history.state.url, history.state.title);
}*/