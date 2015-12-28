CodeHighlighter.addStyle('objc',{
	comment : {
		exp  : /(\/\/[^\n]*(\n|$))|(\/\*[^*]*\*+([^\/][^*]*\*+)*\/)/
	},
	brackets : {
		exp  : /\(|\)/
	},
	string : {
		exp  : /@"[^"]*"/
	},
	keywords : {
		exp  : /\b(arguments|break|case|continue|default|delete|do|else|false|for|function|if|in|instanceof|new|null|return|switch|this|true|typeof|var|void|while|with|BOOL)\b/
	},
	global : {
		exp  : /\b(NSObject|NSString|NSMutableString|NSUserDefaults|NSArray|NSMutableArray|NSDictionary|NSMutableDictionary|NSNumber|UIKit|UIApplication|UIHardware|UIView)\b/
	}
});