var $ = require( 'jquery' );

function ZoomControls( canvas, eventBus ) {

    // build controls
    var $canvas = $( canvas.getContainer() ),
        $controls = $( '<div></div>' ),
        $zoomOut = $( '<div><span>-</span></div>' ),
        $zoomIn = $( '<div><span>+</span></div>' ),
        $zoomFit= $( '<div><span>F</span></div>' ),
        zlevel = 1,
        zstep = 0.2;

    $canvas.append( $controls );
    $controls.append( $zoomIn );
    $controls.append( $zoomOut );
    $controls.append( $zoomFit );

    $controls.addClass( 'zoom-controls' );
    $zoomOut.addClass( 'zoom zoom-out' );
    $zoomIn.addClass( 'zoom zoom-in' );
    $zoomFit.addClass( 'zoom zoom-fit' );

    $zoomOut.attr( 'title', 'Zoom out' );
    $zoomIn.attr( 'title', 'Zoom in' );
    $zoomFit.attr( 'title', 'Fit to viewport' );

    // set initial zoom level
    canvas.zoom( zlevel, 'auto' );

    // update our zoom level on viewbox change
    eventBus.on( 'canvas.viewbox.changed', function( evt ) {
        zlevel = evt.viewbox.scale;
    });

    // define click handlers for controls
    $zoomFit.on( 'click', function() {
        canvas.zoom( 'fit-viewport' );
    });

    $zoomOut.on( 'click', function() {
        zlevel = Math.max( zlevel - zstep, zstep );
        canvas.zoom( zlevel, 'auto' );
    });
    
    $zoomIn.on( 'click', function() {
        zlevel = Math.min( zlevel + zstep, 7 );
        canvas.zoom( zlevel, 'auto' );
    });
}

// inject necessary dependencies
ZoomControls.$inject = [ 'canvas', 'eventBus' ];

module.exports = ZoomControls;