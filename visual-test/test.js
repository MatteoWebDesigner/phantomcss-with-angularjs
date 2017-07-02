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
	
	casper.waitUntilVisible(".component", function() {
		
		casper.then(function() {
			phantomcss.screenshot(".component", "first component");
		});
		
		casper.then(function() {
			casper.click(".component button");
			
			phantomcss.screenshot(".component", "component open");
		});
	});
	
	casper.then(function now_check_the_screenshots() {
		phantomcss.compareAll();
	});

	casper.run(function () {
		console.log("\nTHE END.");
		casper.test.done();
	});
});