/* eslint-disable no-undef */
const fetch = require("node-fetch");
const Headers = require("node-fetch").Headers;

exports.handler = async function (context, event, callback) {
	context.OPENEMR_NGROK_HOSTNAME = 'kzaviryukha.ngrok.io'; //https://kzaviryukha.ngrok.io/
	const response = new Twilio.Response();
	response.appendHeader("Access-Control-Allow-Origin", "*");
	response.appendHeader("Access-Control-Allow-Methods", "OPTIONS, POST");
	response.appendHeader("Content-Type", "application/json");
	response.appendHeader(
		"Access-Control-Allow-Headers",
		"Content-Type, Authorization, Content-Length, X-Requested-With, User-Agent"
	);
	response.setStatusCode(200);

	try {
		const registerOpenEmrResult = await registerOpenEmr(context);

		if (registerOpenEmrResult.error) {
			console.error(registerOpenEmrResult.errorObject);
			response.setStatusCode(400);
			response.setBody("There was an error registering the OpenEMR client.");
			return callback(null, response);
		}

		const client_id = registerOpenEmrResult.result;

		const openEmrAuthResult = await ehrAuth(context, client_id);

		if (openEmrAuthResult.error) {
			console.error(openEmrAuthResult.errorObject);
			response.setStatusCode(400);
			response.setBody("There was an error authenticating the OpenEMR client.");
			return callback(null, response);
		}

		const access_token_info = openEmrAuthResult.result;

		if (!event.cmd) {
			return {
				error: true,
				errorObject: "No cmd included.",
			};
		}
		if (event.cmd == 'get') {
			const patients = await getPatients(
				context,
				access_token_info,
				client_id,
				event
			);
			response.setBody(patients);
		} else if (event.cmd == 'save') {
			const patient = await updatePatient(
				context,
				access_token_info,
				client_id,
				event
			);

			response.setBody(patient);
		}

		return callback(null, response);
	} catch (err) {
		console.log(err, response);
		response.setStatusCode(500);
		response.setBody(err);
		return callback(null, response);
	}
};

const registerOpenEmr = (context) => {
	const body = {
		application_type: "private",
		client_name: "hls-api-client",
		token_endpoint_auth_method: "client_secret_post",
		redirect_uris: ["http://localhost:3000"],
		post_logout_redirect_uris: ["http://localhost:3000"],
		initiate_login_uri: "http://localhost:3000",
		username: "admin",
		password: "pass",
		scope:
			"openid offline_access api:oemr api:fhir api:port user/allergy.read user/allergy.write user/appointment.read user/appointment.write user/dental_issue.read user/dental_issue.write user/document.read user/document.write user/drug.read user/encounter.read user/encounter.write user/facility.read user/facility.write user/immunization.read user/insurance.read user/insurance.write user/insurance_company.read user/insurance_company.write user/insurance_type.read user/list.read user/medical_problem.read user/medical_problem.write user/medication.read user/medication.write user/message.write user/patient.read user/patient.write user/practitioner.read user/practitioner.write user/prescription.read user/procedure.read user/soap_note.read user/soap_note.write user/surgery.read user/surgery.write user/vital.read user/vital.write user/AllergyIntolerance.read user/CareTeam.read user/Condition.read user/Coverage.read user/Encounter.read user/Immunization.read user/Location.read user/Medication.read user/MedicationRequest.read user/Observation.read user/Organization.read user/Organization.write user/Patient.read user/Patient.write user/Practitioner.read user/Practitioner.write user/PractitionerRole.read user/Procedure.read patient/encounter.read patient/patient.read patient/AllergyIntolerance.read patient/CareTeam.read patient/Condition.read patient/Encounter.read patient/Immunization.read patient/MedicationRequest.read patient/Observation.read patient/Patient.read patient/Procedure.read",
	};
	return fetch(
		`http://${context.OPENEMR_NGROK_HOSTNAME}/oauth2/default/registration`,
		{
			body: JSON.stringify(body),
			headers: new Headers({ "content-type": "application/json" }),
			method: "POST",
		}
	)
		.then((resp) => resp.json())
		.then(({ client_id }) => {
			return { error: false, result: client_id };
		})
		.catch((err) => {
			return { error: true, errorObject: err };
		});
};

const ehrAuth = (context, client_id) => {
	if (client_id === undefined) {
		response.setStatusCode(400);
		response.setBody("client_id was not provided.");
		return callback(null, response);
	}

	const body = {
		client_id,
		grant_type: "password",
		user_role: "users",
		username: "admin",
		password: "pass",
		scope:
			"openid offline_access api:oemr api:fhir api:port user/allergy.read user/allergy.write user/appointment.read user/appointment.write user/dental_issue.read user/dental_issue.write user/document.read user/document.write user/drug.read user/encounter.read user/encounter.write user/facility.read user/facility.write user/immunization.read user/insurance.read user/insurance.write user/insurance_company.read user/insurance_company.write user/insurance_type.read user/list.read user/medical_problem.read user/medical_problem.write user/medication.read user/medication.write user/message.write user/patient.read user/patient.write user/practitioner.read user/practitioner.write user/prescription.read user/procedure.read user/soap_note.read user/soap_note.write user/surgery.read user/surgery.write user/vital.read user/vital.write user/AllergyIntolerance.read user/CareTeam.read user/Condition.read user/Encounter.read user/Immunization.read user/Location.read user/Medication.read user/MedicationRequest.read user/Observation.read user/Organization.read user/Organization.write user/Patient.read user/Patient.write user/Practitioner.read user/Practitioner.write user/PractitionerRole.read user/Procedure.read patient/encounter.read patient/patient.read patient/Encounter.read patient/Patient.read",
	};

	return fetch(`http://${context.OPENEMR_NGROK_HOSTNAME}/oauth2/default/token`, {
		body: new URLSearchParams(body),
		headers: new Headers({
			"Content-Type": "application/x-www-form-urlencoded",
		}),
		method: "POST",
	})
		.then((resp) => resp.json())
		.then((resp) => {
			if (resp.error) {
				const statusCode =
					resp.error_description && resp.error_description === "Bad Request"
						? 400
						: 500;
				return { error: true, errorObject: resp.error };
			} else {
				const { access_token, expires_in, refresh_token } = resp;
				console.log(`Access token expires in ${expires_in}`);
				return {
					error: false,
					result: {
						access_token,
						expires_in,
						refresh_token,
					},
				};
			}
		});
};

const getPatients = (context, access_token_info, client_id, event) => {
	const { access_token } = access_token_info;
	//	console.log(access_token);
	return fetch(
		`http://${context.OPENEMR_NGROK_HOSTNAME}/apis/default/api/patient`,
		{
			headers: new Headers({ Authorization: `Bearer ${access_token}` }),
		}
	)
		.then((resp) => { return resp.json() })
		.then((data) => {
			console.log('DATA');
			console.log(data);
			//TODO: map to right names and remove not used data
			return transform_patient_response(data.data);
		});
};

//TODO: adjust to segment destination function
const updatePatient = (context, access_token_info, client_id, event) => {
	const { access_token } = access_token_info;

	const fname = event.firstName;
	const lname = event.lastName;
	const dob = event.dob;

	//validation
	if (!lname || !fname || !dob) {
		return {
			error: true,
			errorObject: "fname, lname, or dob missing.",
		};
	}

	return fetch(
		`http://${context.OPENEMR_NGROK_HOSTNAME}/apis/default/api/patient?fname=${fname}&lname=${lname}&DOB=${dob}`,
		{
			headers: new Headers({ Authorization: `Bearer ${access_token}` }),
		}
	)
		.then((resp) => resp.json())
		.then((data) => {
			if (data.data.length < 1) {
				return 'Patient not found!';
			}
			const updatedData = {};
			updatedData.hipaa_notice = map_flag_in(event.hipaaNoticeReceived);
			//data.data.hipaa_allowsms = 'NO'; //some internal issue,also does not work in app
			updatedData.hipaa_allowemail = map_flag_in(event.allowEmail);
			updatedData.hipaa_mail = map_flag_in(event.allowMailMessage);
			updatedData.hipaa_voice = map_flag_in(event.allowVoiceMessage);
			updatedData.allow_imm_reg_use = map_flag_in(event.allowImmunizationRegistryUse);
			updatedData.allow_imm_info_share = map_flag_in(event.allowImmunizationInfoSharing);
			updatedData.allow_health_info_ex = map_flag_in(event.allowHealthInformationExchange);
			updatedData.allow_patient_portal = map_flag_in(event.allowPatientPortal);

			return fetch(
				`http://${context.OPENEMR_NGROK_HOSTNAME}/apis/default/api/patient/${data.data[0].uuid}`,
				{
					body: JSON.stringify(updatedData),
					method: "PUT",
					headers: new Headers({ Authorization: `Bearer ${access_token}` }),
				}
			)
				.then((resp) => resp.json())
				.then((data) => {
					return data.data;
				});
		});
};

function map_flag_in(value) {
	return value == 'Unassigned' ? '' : value.toUpperCase();
}

function map_flag_out(value) {
	return value == '' ? 'Unassigned' : value[0].toUpperCase() + value.slice(1).toLowerCase();
}

function transform_patient_response(patients) {
	const ret = [];
	patients.forEach(patient => {
		ret.push({
			firstName: patient.fname,
			lastName: patient.lname,
			dob: patient.DOB,
			// allowSms: true,
			allowEmail: map_flag_out(patient.hipaa_allowemail),
			allowMailMessage: map_flag_out(patient.hipaa_mail),
			allowVoiceMessage: map_flag_out(patient.hipaa_voice),
			allowPatientPortal: map_flag_out(patient.allow_patient_portal),
			hipaaNoticeReceived: map_flag_out(patient.hipaa_notice),
			allowImmunizationRegistryUse: map_flag_out(patient.allow_imm_reg_use),
			allowImmunizationInfoSharing: map_flag_out(patient.allow_imm_info_share),
			allowHealthInformationExchange: map_flag_out(patient.allow_health_info_ex)
		});
	});

	return ret;
} 
