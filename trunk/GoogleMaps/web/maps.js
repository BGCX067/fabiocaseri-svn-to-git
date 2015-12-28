var UBIMap = {
	ZOOM_IN_URL: 'http://fabiocaseri.googlecode.com/svn/trunk/GoogleMaps/web/zoom-button.gif',
	ZOOM_IN_ACTIVED_URL: 'http://fabiocaseri.googlecode.com/svn/trunk/GoogleMaps/web/zoom-button-activated.gif',
	ZOOM_BACK_URL: 'http://fabiocaseri.googlecode.com/svn/trunk/GoogleMaps/web/zoom-back.gif'
};
UBIMap.BPU = {
	NAME: 'BPU',
	POINTS_FILE: 'bpu_json.txt',
	ICON_URL: 'http://fabiocaseri.googlecode.com/svn/trunk/GoogleMaps/web/bpu.gif',
	ICON_WIDTH: 25,
	ICON_HEIGHT: 15,
	ICON_URL_OFF: 'http://fabiocaseri.googlecode.com/svn/trunk/GoogleMaps/web/bpu_off.gif',
	SHADOW_URL: '',
	SHADOW_WIDTH: 25,
	SHADOW_HEIGHT: 15,
	BUTTON_ID: 'bpuButton',
	MARKERS: [],
	VISIBLE: false
};
UBIMap.BL = {
	NAME: 'BL',
	POINTS_FILE: 'bl_json.txt',
	ICON_URL: 'http://fabiocaseri.googlecode.com/svn/trunk/GoogleMaps/web/bl.gif',
	ICON_WIDTH: 25,
	ICON_HEIGHT: 24,
	ICON_URL_OFF: 'http://fabiocaseri.googlecode.com/svn/trunk/GoogleMaps/web/bl_off.gif',
	SHADOW_URL: '',
	SHADOW_WIDTH: 25,
	SHADOW_HEIGHT: 24,
	BUTTON_ID: 'blButton',
	MARKERS: [],
	VISIBLE: false
};

function UbiControl() {}
UbiControl.prototype = new GControl();
UbiControl.prototype.initialize = function(map) {
	var container = document.createElement('div');
	var bpuDiv = document.createElement('div');
	bpuDiv.id = UBIMap.BPU.BUTTON_ID;
	this.setButtonStyle_(bpuDiv);
	container.appendChild(bpuDiv);
	bpuDiv.innerHTML = UBIMap.BPU.NAME + ' <em>(' + UBIMap.BPU.MARKERS.length + ')</em><br/><img src="' + UBIMap.BPU.ICON_URL_OFF + '" title="' + UBIMap.BPU.NAME + '" alt="' + UBIMap.BPU.NAME + '" />';
  	GEvent.addDomListener(bpuDiv, 'click', function() {
		toggleMarkers(UBIMap.BPU);
		updateButton(UBIMap.BPU);
  	});
	var blDiv = document.createElement('div');
	blDiv.id = UBIMap.BL.BUTTON_ID;
	this.setButtonStyle_(blDiv);
	container.appendChild(blDiv);
	blDiv.innerHTML = UBIMap.BL.NAME + ' <em>(' + UBIMap.BL.MARKERS.length + ')</em><br/><img src="' + UBIMap.BL.ICON_URL_OFF + '" title="' + UBIMap.BL.NAME + '" alt="' + UBIMap.BL.NAME + '" />';
	GEvent.addDomListener(blDiv, 'click', function() {
		toggleMarkers(UBIMap.BL);
		updateButton(UBIMap.BL);
	});
	map.getContainer().appendChild(container);
	return container;
};
UbiControl.prototype.getDefaultPosition = function() {
  return new GControlPosition(G_ANCHOR_TOP_LEFT, new GSize(100, 7));
};
UbiControl.prototype.setButtonStyle_ = function(button) {
	button.style.textDecoration = 'none';
	button.style.color = '#999';
	button.style.backgroundColor = '#FFF';
	button.style.font = 'small Arial';
	button.style.border = '1px solid #AAA';
	button.style.borderBottom = '1px solid #555';
	button.style.borderRight = '1px solid #555';
	button.style.padding = '1px';
	button.style.marginBottom = '3px';
	button.style.textAlign = 'center';
	button.style.width = '6em';
	button.style.cursor = 'pointer';
};

function onLoad() {
	var map = new GMap2(document.getElementById('map'));
	map.addControl(new GLargeMapControl());
	map.addControl(new GMapTypeControl());
	map.addControl(new GScaleControl());
	map.addControl(new GOverviewMapControl());
	var otherOpts = {
		buttonHTML: '<img alt="Zoom In" title="Zoom In" src="' + UBIMap.ZOOM_IN_URL + '" />',
		buttonZoomingHTML:'<img alt="Zoom In" title="Zoom In" src="' + UBIMap.ZOOM_IN_ACTIVED_URL + '" />',
		buttonStartingStyle: {width:'24px',height:'24px'},
		buttonStyle: {width:'24px', height:'24px'},
		backButtonHTML: '<img alt="Zoom Back Out" title="Zoom Back Out" src="' + UBIMap.ZOOM_BACK_URL + '" />',  
		backButtonStyle: {display:'none',marginTop:'5px',width:'24px', height:'24px'},
		backButtonEnabled: true, 
		overlayRemoveTime: 4000
	};
	map.addControl(new DragZoomControl({}, otherOpts, {}), new GControlPosition(G_ANCHOR_TOP_LEFT,new GSize(70, 6)));
	map.addControl(new UbiControl());
	map.enableScrollWheelZoom();
	//map.setCenter(new GLatLng(45.708337, 9.668655), 10);
	map.setCenter(new GLatLng(42.654101,12.425097), 6);
	loadPoints(map);
}

function loadPoints(map) {
	GDownloadUrl(UBIMap.BPU.POINTS_FILE, function(data, responseCode) {
		parsePoints(data, responseCode, map, UBIMap.BPU, UBIMap.BPU.VISIBLE);
		updateButton(UBIMap.BPU);
	});
	GDownloadUrl(UBIMap.BL.POINTS_FILE, function(data, responseCode) {
		parsePoints(data, responseCode, map, UBIMap.BL, UBIMap.BL.VISIBLE);
		updateButton(UBIMap.BL);
	});
}

function parsePoints(data, responseCode, map, group, show) {
	var points = (eval('(' + data + ')')).filiali;
	for(var i = 0; i < points.length; i++) {
		var p = points[i];
		if(typeof(p.lat) !== 'undefined' && typeof(p.lng) !== 'undefined') {
			var marker = createMarker(p, group);
			group.MARKERS.push(marker);
			map.addOverlay(marker);
			if(!show) {
				marker.hide();
			}
		}
	}
}

function createMarker(p, group) {
	var icon = new GIcon();
	icon.image = group.ICON_URL;
	//icon.shadow = group.SHADOW_URL;
	icon.iconSize = new GSize(group.ICON_WIDTH, group.ICON_HEIGHT);
	//icon.shadowSize = new GSize(group.SHADOW_WIDTH, group.SHADOW_HEIGHT);
	var iconPoint = new GPoint(Math.floor(group.ICON_WIDTH / 2), Math.floor(group.ICON_HEIGHT / 2));
	icon.iconAnchor = iconPoint;
	icon.infoWindowAnchor = iconPoint;
	var marker = new GMarker(new GLatLng(p.lat, p.lng), icon);
	GEvent.addListener(marker, "click", function() {
		marker.openInfoWindowHtml('<h4>' + p.banca + '</h4>' + p.nome + '<br/>' + p.indirizzo);
	});
	return marker;
}

function toggleMarkers(b) {
	for(var i = 0; i < b.MARKERS.length; i++) {
		(b.VISIBLE) ? b.MARKERS[i].hide() : b.MARKERS[i].show();
	}
	b.VISIBLE = !b.VISIBLE;
}
function updateButton(b) {
	var button = document.getElementById(b.BUTTON_ID);
	if(b.VISIBLE) {
		button.innerHTML = b.NAME + ' <em>(' + b.MARKERS.length + ')</em><br/><img src="' + b.ICON_URL + '" title="' + b.NAME + '" alt="' + b.NAME + '" />';;
		button.style.border = '1px solid #555';
		button.style.borderBottom = '1px solid #AAA';
		button.style.borderRight = '1px solid #AAA';
		button.style.color = '#000';
	} else {
		button.innerHTML = b.NAME + ' <em>(' + b.MARKERS.length + ')</em><br/><img src="' + b.ICON_URL_OFF + '" title="' + b.NAME + '" alt="' + b.NAME + '" />';;
		button.style.border = '1px solid #AAA';
		button.style.borderBottom = '1px solid #555';
		button.style.borderRight = '1px solid #555';
		button.style.color = '#999';
	}
}