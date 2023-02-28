//let button = document.getElementById("id123");

export async function set_refractor(func_var: any, time: number) {
    if(window["tagbrain_graph"].refractor_neurons_is_activated == false){
        window["tagbrain_graph"].refractor_neurons_is_activated = true;
        func_var();
        await sleep(time);
        window["tagbrain_graph"].refractor_neurons_is_activated = false;
    } else {
      window["tagbrain_graph"].refractor_neurons_stack.push(func_var);
        await sleep(time);
        let len = window["tagbrain_graph"].refractor_neurons_stack.length;
        if(len >= 1){
          window["tagbrain_graph"].refractor_neurons_stack[len - 1]();
          window["tagbrain_graph"].refractor_neurons_stack = [];
        } 
    }
}

function sleep(t:number) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(1);
      }, t);
    });
  }
