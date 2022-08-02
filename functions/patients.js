exports.handler = async function (context, event, callback) {
	
	const patients = [
		{
			firstName: 'John',
			lastName: 'Doe',
			dob: '03-22-1981',
			allowEmail: 'Yes',
			allowMailMessage: 'Yes',
			allowVoiceMessage: 'Unassigned',
			allowPatientPortal: 'Unassigned',
			hipaaNoticeReceived: 'Unassigned',
			allowImmunizationRegistryUse: 'Unassigned',
			allowImmunizationInfoSharing: 'Unassigned',
			allowHealthInformationExchange: 'Unassigned',
		},
		{
			firstName: 'Mary',
			lastName: 'Sue',
			dob: '12-12-1999',
			allowEmail: 'No',
			allowMailMessage: 'No',
			allowVoiceMessage: 'Yes',
			allowPatientPortal: 'Yes',
			hipaaNoticeReceived: 'Unassigned',
			allowImmunizationRegistryUse: 'Unassigned',
			allowImmunizationInfoSharing: 'Unassigned',
			allowHealthInformationExchange: 'Unassigned',
		},
	]
	
	// Return the response object as JSON
	return callback(null, { patients });
};
