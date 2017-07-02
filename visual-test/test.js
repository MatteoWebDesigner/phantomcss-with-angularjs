var phantomcss = require("phantomcss");

// start a casper test
casper.test.begin("First test", function (test) {
	
	phantomcss.init({
		rebase: casper.cli.get("rebase"),
		screenshotRoot: fs.absolute( fs.workingDirectory + "/visual-test/screenshots_base" ),
		failedComparisonsRoot: fs.absolute( fs.workingDirectory + "/visual-test/screenshots_failures" )
	});
	
	casper.start("http://localhost:8080");

	casper.viewport(1024, 768);
	
	/// page visual test START ///
	casper.thenOpen('http://localhost:8080/');
	
	casper.waitUntilVisible("body", function() {
		casper.then(function() {
			phantomcss.screenshot("body", "body");
		});
	});
	/// page visual test END ///

	/// component visual unit test START ///
	casper.thenOpen("http://localhost:8080/visual-unit-test/component");
	
	casper.waitUntilVisible("body", function() {
		casper.then(function() {
			phantomcss.screenshot("body", "body");
		});
	});
	
	casper.waitUntilVisible(".component", function() {
		
		casper.then(function() {
			phantomcss.screenshot(".component", "component");
		});
		
		casper.then(function() {
			casper.click(".component button");
			
			phantomcss.screenshot(".component", "component open");
		});
	});
	/// component visual unit test END ///
	
	casper.then(function now_check_the_screenshots() {
		phantomcss.compareAll();
	});

	casper.run(function () {
		console.log("\nTHE END.");
		casper.test.done();
	});
});