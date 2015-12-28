/* FCWindowController */

#import <Cocoa/Cocoa.h>
#import <WebKit/WebKit.h>
#import <iLifeControls/NFHUDWindow.h>

@interface FCWindowController : NSWindowController
{
	NSString *header;
	NSString *footer;
	NSMutableString *currentCode;
    IBOutlet NFHUDWindow *panel;
    IBOutlet NSTextView *playlistCode;
    IBOutlet WebView *webView;
	IBOutlet NSWindow *window;
}
- (void)setHTML:(NSString*)code;
- (IBAction)changePlaylist:(id)sender;
@end
