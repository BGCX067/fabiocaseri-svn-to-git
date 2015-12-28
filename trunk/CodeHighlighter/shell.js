CodeHighlighter.addStyle('shell',{
	comment : {
		exp  : /#[^\n]+/
	},
	brackets : {
		exp  : /\(|\)/
	},
	string : {
		exp  : /'[^']*'|"[^"]*"/
	},
	keywords : {
		exp  : /\b(cd|pwd|if|fi|case|esac|done|find|grep|sed|awk|chmod|chown|export|whereis|file|type|ps|nvram|ssh|history|head|sort|rm|svn|mv|cp|vi)\b/
	},
	/* Added by Shelly Fisher (shelly@agileevolved.com) */
	symbol : {
	  exp : /([^:])(:[A-Za-z0-9_!?]+)/
	}
});
