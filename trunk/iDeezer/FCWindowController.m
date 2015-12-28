#import "FCWindowController.h"

@implementation FCWindowController

- (id)init
{
	if (self = [super init]) {
		header = [[NSString alloc] initWithString:@"<html><head><style type=\"text/css\">*{margin:0;padding:0}body{background-color:#E0E0E0}</style></head><body>"];
		footer = [[NSString alloc] initWithString:@"</body></html>"];
		currentCode = [[NSMutableString alloc] initWithString:@""];
	}
	return self;
}

- (void)awakeFromNib
{
	[window center];
	[self setHTML:@""];
	[self changePlaylist:self];
	[NSApp setDelegate:self];
}

- (void)dealloc
{
	[super dealloc];
}

- (BOOL)applicationShouldTerminateAfterLastWindowClosed:(id)sender
{
  return YES;
}

- (void)setHTML:(NSString*)code
{
	NSMutableString *content = [[NSMutableString alloc] initWithString:@""];
	[content appendString:header];
	[content appendString:code];
	[content appendString:footer];
	[[webView mainFrame] loadHTMLString:content baseURL:nil];
	[content release];
}

- (IBAction)changePlaylist:(id)sender
{
	NSString *code = [playlistCode string];
	if([code length] > 0) {
		if(![code isEqualToString:currentCode]) {
			NSLog(@"CHANGING PLAYLIST: %@", code);
			[currentCode setString:code];
			[self setHTML:code];
		}
		[panel close];
	}
}

@end
