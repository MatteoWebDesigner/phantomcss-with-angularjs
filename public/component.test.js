var fs = require( '../fs' );
var phantomcss = require( '../phantomcss.js' );

casper.
	start("http://127.0.0.1:8080/visualUnitTest/component").
	then(function(){
		
		// do something
		casper.click('.component__btn');
		
		// Take a screenshot of the UI component
		phantomcss.screenshot('.js-visual-unit-test', 'component-screenshoot');

	});