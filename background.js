/* 
  Copyright 2021. Jefferson "jscher2000" Scher. License: MPL-2.0.
  v0.5 - initial design
*/

/**** Strip Out DNT Header from Intercepted Requests ****/

function stripDNT(details) { 
	// search for DNT in the header array
	var dntPos = details.requestHeaders.findIndex((h) => h.name.toLowerCase() === 'dnt');
	if (dntPos > -1) {
		// splice the DNT header out of the array
		details.requestHeaders.splice(dntPos, 1);
	}
	// dispatch the headers, we're done
	return { requestHeaders: details.requestHeaders };
}

/**** Set up webRequest listener ****/

browser.webRequest.onBeforeSendHeaders.addListener(
	stripDNT,
	{ urls: ["<all_urls>"] },
	["blocking", "requestHeaders"]
);		
