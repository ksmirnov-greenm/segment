import {OPEN_EMR_STATE_VALUES} from "./constants";

export class PatientModel {
	firstName = '';
	lastName = '';
	dob = '';
	allowSms = true;
	allowEmail = OPEN_EMR_STATE_VALUES.unassigned;
	allowMailMessage = OPEN_EMR_STATE_VALUES.unassigned;
	allowVoiceMessage = OPEN_EMR_STATE_VALUES.unassigned;
	allowPatientPortal = OPEN_EMR_STATE_VALUES.unassigned;
	hipaaNoticeReceived = OPEN_EMR_STATE_VALUES.unassigned;
	allowImmunizationRegistryUse = OPEN_EMR_STATE_VALUES.unassigned;
	allowImmunizationInfoSharing = OPEN_EMR_STATE_VALUES.unassigned;
	allowHealthInformationExchange = OPEN_EMR_STATE_VALUES.unassigned;
}
