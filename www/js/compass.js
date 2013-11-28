    window.addEventListener('load', function(){
    	// Wait for PhoneGap to load
   		document.addEventListener("deviceready", onDeviceReady, false);
    }, false);
    
    // The watch id references the current `watchHeading`
    var watchID = null;

    // PhoneGap is ready
    function onDeviceReady() {
    	var showNorthBtn = $('#showNorthBtn');
    	var startBtn = $('#startBtn');
    	var stopBtn = $('#stopBtn');
    	
    	
    	startBtn.click(function(){
			startBtn.enabled = true;
    		startWatch();
    	});
    	
    	stopBtn.click(function(){
			startBtn.enabled = true;
    		stopWatch();	
    	});
    	
    	showNorthBtn.click(function(){
    		navigator.compass.getCurrentHeading(onSuccess, onError);	
    	});    	
    }
    
    // Start watching the compass
    //
    function startWatch() {

        // Update compass every 2 seconds
        var options = { frequency: 2000 };

        watchID = navigator.compass.watchHeading(onStartSuccess, onError, options);
    }

    // Stop watching the compass
    function stopWatch() {
        if (watchID) {
            navigator.compass.clearWatch(watchID);
            watchID = null;
        }
    }
    
    // onStartSuccess
    function onStartSuccess(heading) {
        var arrow = $('#arrow');
        var arrowOrientation = 360 - heading.magneticHeading;
        arrow.css(
        	'-webkit-transform','rotate(' + arrowOrientation + 'deg)'
        );
    }    
    
	// onSuccess: Get the current heading
    function onSuccess(heading) {
        var arrow = $('#arrow');
        var arrowOrientation = 360 - heading.magneticHeading;
        arrow.css(
        	'-webkit-transform','rotate(' + arrowOrientation + 'deg)'
        );
		alert('Heading: ' + heading.magneticHeading);
    }

    // onError: Failed to get the heading
    function onError(compassError) {
        alert('Compass Error: ' + compassError.code);
    }