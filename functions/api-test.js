exports.handler = async function (context, event, callback) {
/*	const response = new Twilio.Response();
	response.appendHeader('Content-Type', 'application/json');
	response.setStatusCode(200);
	response.setBody({ success: true });
	callback(response);*/
	// Get the primary and secondary phone numbers, if set
	const primary = 'There is no primary number';
	const secondary ='There is no secondary number!';
	
	// Build our response object
	const response = {
		phone_numbers: {
			primary,
			backup: secondary,
		},
	};
	
	// Return the response object as JSON
	return callback(null, response);
};
