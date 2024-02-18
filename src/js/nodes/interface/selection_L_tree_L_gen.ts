import SelectionArea from "@viselect/vanilla";
import { gEBI } from "../../units/compress_f";

const selection123 = new SelectionArea({

    selectionContainerClass: 'selection_L_area_L_container',
        selectionAreaClass: 'selection_L_area',
    container: 'body', 
    document: window.document,
    selectables: ['div#synapses_tree_x_output_field > .neuron_L_og'],
    //startareas: ['html'],
    boundaries: ['div#synapses_tree_x_output_field'],
    behaviour: {
        overlap: 'invert',
        intersect: 'touch',
        startThreshold: 10,
        scrolling: {
            speedDivider: 10,
            manualSpeed: 750,
            startScrollMargins: {x: 0, y: 0}
        }
    },
    features: {
        touch: true,
        range: true,
        singleTap: {
            allow: true,
            intersect: 'native'
        }
    }
});

selection123.on('start', ({store, event}) => {

    if (!(event as MouseEvent).ctrlKey && !(event as MouseEvent).metaKey) {

        for (const el of store.stored) {
            el.classList.remove('selected123');
        }

        selection123.clearSelection();
    }

}).on('move', ({store: {changed: {added, removed}}}) => {

    for (const el of added) {
        el.classList.add('selected123');
    }

    for (const el of removed) {
        el.classList.remove('selected123');
    }
});
