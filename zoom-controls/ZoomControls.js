var $ = require( 'jquery' );

function ZoomControls( canvas, eventBus ) {

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

    canvas.zoom( zlevel, 'auto' );

    eventBus.on( 'canvas.viewbox.changed', function( evt ) {
        zlevel = evt.viewbox.scale;
    });

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

ZoomControls.$inject = [ 'canvas', 'eventBus' ];

module.exports = ZoomControls;