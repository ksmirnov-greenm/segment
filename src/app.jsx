import React, { useState } from 'react';
import {Box, Button, Checkbox, Flex, Heading, HelpText, Input, Label} from "@twilio-paste/core";
import { Theme } from '@twilio-paste/theme';
import { OpenEmrStateFlags } from "./components/openemr-state-flags";
import { PatientModel } from "./models/patient.model";

export default function App() {
	
	const [patient, setPatient] = useState(new PatientModel());
	
	const submit = () => {
		window.analytics.identify(patient);
	}
	
	const updatePatient = (newValue) => {
		setPatient(Object.assign({}, patient, newValue))
	}
	
	return (
		<Theme.Provider>
			<Flex marginTop={"space100"} hAlignContent="center" vertical>
				<Heading as="h2" variant="heading20" padding="space40">Patient Info</Heading>
			</Flex>
			<Flex margin="auto" width={"800px"}>
				<Flex>
					<Box
						padding="space40"
						width="400px"
						height="500px"
						display="flex"
						flexDirection="column"
						justifyContent="space-between"
					>
						<div>
							<Label htmlFor="patient_name" required>Name</Label>
							<Input
								aria-describedby="patient_help_text"
								id="patient_name"
								name="patient_name"
								type="text"
								placeholder="John"
								value={patient.name}
								onChange={(event) => updatePatient({ name: event.target.value })}
								required/>
							<HelpText id="patient_help_text">Enter your name</HelpText>
						</div>
						
						<div>
							<Label htmlFor="patient_family_name" required>Family Name</Label>
							<Input
								aria-describedby="family_name_help_text"
								id="patient_family_name"
								name="patient_family_name"
								type="text"
								placeholder="Doe"
								value={patient.familyName}
								onChange={(event) => updatePatient({ familyName: event.target.value })}
								required/>
							<HelpText id="family_name_help_text">Enter your family name</HelpText>
						</div>
						
						<div>
							<Label htmlFor="patient_dob" required>Date of Birth</Label>
							<Input
								aria-describedby="dob_help_text"
								id="patient_dob"
								name="patient_dob"
								type="text"
								placeholder="01-01-2000"
								value={patient.dob}
								onChange={(event) => updatePatient({ dob: event.target.value })}
								required
							/>
							<HelpText id="dob_help_text">Enter your date of birth</HelpText>
						</div>
						
						<Checkbox
							id="allowSms"
							value="allowSms"
							name="allowSms"
							checked={patient.allowSms}
							onChange={(event) => updatePatient({ allowSms: event.target.value })}
						>
							Allow to send sms
						</Checkbox>
						
						<br/>
						<Button
							variant="primary"
							onClick={submit}
							disabled={!patient.name && !patient.familyName && !patient.dob}
						>
							Submit
						</Button>
					</Box>
				</Flex>
				<Flex>
					<Box
						padding="space40"
						width="400px"
					>
						<OpenEmrStateFlags
							text={'Allow Email'}
							selectedValue={patient.allowEmail}
							onSelectedChange={(selected) => updatePatient({ allowEmail: selected })}
						/>
						
						<OpenEmrStateFlags
							text={'Allow Mail Message'}
							selectedValue={patient.allowMailMessage }
							onSelectedChange={(selected) => {
								console.log('selected Allow Mail Message', selected);
								
								updatePatient({ allowMailMessage: selected })
							}}
						/>
						
						<OpenEmrStateFlags
							text={'Allow Voice Message'}
							selectedValue={patient.allowVoiceMessage}
							onSelectedChange={(selected) => updatePatient({ allowVoiceMessage: selected })}
						/>
						
						<OpenEmrStateFlags
							text={'Allow Patient Portal'}
							selectedValue={patient.allowPatientPortal}
							onSelectedChange={(selected) => updatePatient({ allowPatientPortal: selected })}
						/>
						
						<OpenEmrStateFlags
							text={'Hipaa Notice Received'}
							selectedValue={patient.hipaaNoticeReceived}
							onSelectedChange={(selected) => updatePatient({ hipaaNoticeReceived: selected })}
						/>
						
						<OpenEmrStateFlags
							text={'Allow Immunization Registry Use'}
							selectedValue={patient.allowImmunizationRegistryUse}
							onSelectedChange={(selected) => updatePatient({ allowImmunizationRegistryUse: selected })}
						/>
						
						<OpenEmrStateFlags
							text={'Allow Immunization Info Sharing'}
							selectedValue={patient.allowImmunizationInfoSharing}
							onSelectedChange={(selected) => updatePatient({ allowImmunizationInfoSharing: selected })}
						/>
						
						<OpenEmrStateFlags
							text={'Allow Health Information Exchange'}
							selectedValue={patient.allowHealthInformationExchange}
							onSelectedChange={(selected) => updatePatient({ allowHealthInformationExchange: selected })}
						/>
					</Box>
				</Flex>
			</Flex>
		</Theme.Provider>
	);
}
