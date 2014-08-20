'use strict';

// we use fs + brfs to inline an example XML document.
// exclude fs in package.json#browser + use the brfs transform
// to generate a clean browserified bundle
var fs = require('fs');

// inlined in result file via brfs
var pizzaDiagram = fs.readFileSync(__dirname + '/../resources/pizza.bpmn', 'utf-8');

// require the viewer, make sure you added it to your project
// dependencies via npm install --save-dev bpmn-js
var BpmnViewer = require('bpmn-js'),
    $ = require( 'jquery' ),
    viewer = new BpmnViewer({
                container: '#canvas',
                additionalModules: [
                    require( 'bpmn-js/lib/features/movecanvas' ),
                    require( 'bpmn-js/lib/features/zoomscroll' ),
                    require( '../zoom-controls' )
                ]
            });

viewer.importXML(pizzaDiagram, function(err) {
    if ( err ) {
        console.warn('something went wrong:', err);
        return;
    }
});