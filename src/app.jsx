import React, { useEffect, useState } from 'react';
import {
	Box,
	Button,
	Flex,
	Heading,
	HelpText,
	Input,
	Label,
	Spinner,
	Combobox,
	MediaObject,
	MediaBody, Text
} from "@twilio-paste/core";
import { Theme } from '@twilio-paste/theme';
import { OpenEmrStateFlags } from "./components/openemr-state-flags";
import { PatientModel } from "./models/patient.model";

export default function App() {
	
	const [patient, setPatient] = useState(new PatientModel());
	const [patientsCollection, setPatientsCollection] = useState([]);
	const [value, setValue] = React.useState('');
	
	const [loadPatients, setLoadPatients] = useState(false);
	const [loading, setLoading] = useState(false);
	
	const submit = () => {
		setLoading(true);
		console.log('patient', patient);
		window.analytics.identify(patient)
			.then(() => {
				setLoading(false)
				// setPatient(new PatientModel());
			});
	}
	
	const updatePatient = (newValue) => {
		setPatient(Object.assign({}, patient, newValue))
	}
	
	useEffect(() => {
		setLoadPatients(true);
		fetch('/patients')
			.then(res => res.json())
			.then(({ patients }) => {
				console.log('patient response', patients);
				setPatientsCollection(patients)
				setLoadPatients(false);
			})
	}, []);
	
	return (
		<Theme.Provider>
			
			<Flex marginTop={"space100"} hAlignContent="center" vertical>
				<Heading as="h2" variant="heading20" padding="space40">Patient Info</Heading>
				{loadPatients && <p>Load patients collection</p>}
				{loadPatients && <Spinner size="sizeIcon110" decorative={false} title="Loading" />}
			</Flex>
			{!loadPatients && <Flex margin="auto" width={"800px"}>
				<Flex>
					<Box
						padding="space40"
						width="400px"
						height="500px"
						display="flex"
						flexDirection="column"
						justifyContent="space-between"
					>
						
						<Combobox
							items={patientsCollection}
							labelText="Select a patient"
							optionTemplate={(item) => (
								<MediaObject verticalAlign="center">
									<MediaBody>
										<Text as="span" fontStyle="italic" color="colorTextWeak">
											{item.firstName} {item.lastName}
										</Text>
										<Text as="span">
											({item.dob})
										</Text>
									</MediaBody>
								</MediaObject>
							)}
							selectedItem={patient}
							inputValue={value}
							onSelectedItemChange={changes => {
								const {selectedItem} = changes;
								setPatient(selectedItem);
								setValue(`${selectedItem.firstName} ${selectedItem.lastName} (${selectedItem.dob})`);
							}}
						/>
						
						<div>
							<Label htmlFor="patient_first_name" required>First Name</Label>
							<Input
								aria-describedby="patient_help_text"
								id="patient_first_name"
								name="patient_first_name"
								type="text"
								placeholder="John"
								value={patient.firstName}
								onChange={(event) => updatePatient({ firstName: event.target.value })}
								required/>
							<HelpText id="patient_help_text">Enter your first name</HelpText>
						</div>
						
						<div>
							<Label htmlFor="patient_last_name" required>Last Name</Label>
							<Input
								aria-describedby="last_name_help_text"
								id="patient_last_name"
								name="patient_last_name"
								type="text"
								placeholder="Doe"
								value={patient.lastName}
								onChange={(event) => updatePatient({ lastName: event.target.value })}
								required/>
							<HelpText id="last_name_help_text">Enter your family name</HelpText>
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
						
						{/*<Checkbox
							id="allowSms"
							value="allowSms"
							name="allowSms"
							checked={patient.allowSms}
							onChange={(event) => updatePatient({ allowSms: event.target.checked })}
						>
							Allow to send sms
						</Checkbox>*/}
						
						<Button
							variant="primary"
							onClick={submit}
							disabled={!patient.firstName && !patient.lastName && !patient.dob}
							loading={loading}
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
							onSelectedChange={(selected) => updatePatient({ allowMailMessage: selected })}
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
			</Flex>}
		</Theme.Provider>
	);
}
