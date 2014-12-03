$(function () {
	'use strict';
	// first we need a slider to work with
	var $slider2 = $("#slider2").slider({ max: 20 , value: 10 });

// and then we can apply pips to it!
	$slider2.slider("pips");
});
