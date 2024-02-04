export function set_L_cursor_L_style00s(){
    let body = document.body;
    let body_style = getComputedStyle(body);
    let main_color = body_style.getPropertyValue('--text-content');
    let shiny_light = body_style.getPropertyValue('--shiny-light');
    let encode_main = main_color.replace('#', '%23');
    let encode_shiny_light = shiny_light.replace('#', '%23');
    let cursor_auto_value = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='100' width='100'%3E%3Ccircle cx='8' cy='8' r='5' stroke='`+encode_main+`' stroke-width='1.5' fill='none' /%3E%3C/svg%3E")8 8, auto`;
    let cursor_pointer_value = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='100' width='100' %3E%3Ccircle cx='10' cy='10' r='8' stroke='`+encode_shiny_light+`'  stroke-width='1.5' stroke-dasharray='6 3' fill='none' /%3E%3C/svg%3E")12 12, pointer`;
    body.style.setProperty('--cursor-pointer', cursor_pointer_value);
    body.style.setProperty('--cursor-auto', cursor_auto_value);
}