(function() {
	function addLoadEvent(func) {
		var oldonload = window.onload;
		if(typeof window.onload != 'function') {
			window.onload = func;
		} else {
			window.onload = function() {
				oldonload();
				func();
			}
		}
	}
	function requestContent(src) {
		var script = document.createElement('script');
		script.src = src;
		if(arguments[1]) { script.onload = arguments[1]; }
		document.getElementsByTagName('head')[0].appendChild(script);
	}
	function cleanAndColor() {
		if(navigator.appName != 'Microsoft Internet Explorer') {
			var codes = document.getElementsByTagName('code');
			for(var i=0; i < codes.length; i++) {
				var p = codes[i];
				p.innerHTML = p.innerHTML.split('\n\n').join('\n');
			}
		}
	};
	addLoadEvent(cleanAndColor);
	var baseUrl = 'http://fabiocaseri.googlecode.com';
	var codeHighlightUrl = baseUrl + '/svn/trunk/CodeHighlighter/';
	requestContent(codeHighlightUrl + 'code_highlighter.js');
	var languages = ['css','html','javascript','objc','perl','ruby','shell'];
	for(var i = 0; i < languages.length; i++) {
		requestContent(codeHighlightUrl + languages[i] + '.js');
	}
})();