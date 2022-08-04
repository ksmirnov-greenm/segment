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
import { Header } from "./components/header";
import { Footer } from "./components/footer";


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
		console.log(patient);
	}

	useEffect(() => {
		setLoadPatients(true);
		fetch('/openemr',
			{
				method: "POST",
				body: new URLSearchParams({
					cmd: "get",
				}),
			}
		)
			.then(res => res.json())
			.then((patients) => {
				console.log('patient response', patients);
				setPatientsCollection(patients)
				setLoadPatients(false);
			})
	}, []);

	return (
		<Theme.Provider>
			<Header />
			<Flex marginLeft="200px" marginTop={"space100"} hAlignContent="left" vertical>

				<Heading as="h2" variant="heading20" padding="space20">Patient Info</Heading>
				{!loadPatients && <Box>

					<Box marginTop="8px" color="#8891AA" fontWeight="600" fontSize="14px" >
						Choose Patient
			</Box>
					<Box marginBottom="24px" width="300px">
						<Combobox
							backgroundColor="#F4F4F6"
							items={patientsCollection}
							placeholder="Click to choose patient"

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
								const { selectedItem } = changes;
								setPatient(selectedItem);
								setValue(`${selectedItem.firstName} ${selectedItem.lastName} (${selectedItem.dob})`);
							}}
						/>
					</Box>


					{patient.firstName && patient.lastName && patient.dob && <Box>
						<Box marginTop="8px" color="#8891AA" fontWeight="600" fontSize="14px" >
							Please update data for chosen patient
			</Box>
						<Box marginTop="8px" display="flex" columnGap="16px" marginBottom="24px">

							<div>
								<Input
									disabled="true"
									backgroundColor="#F4F4F6"
									aria-describedby="patient_help_text"
									id="patient_first_name"
									name="patient_first_name"
									type="text"
									placeholder="John"
									value={patient.firstName}
									onChange={(event) => updatePatient({ firstName: event.target.value })}
									required />
							</div>

							<div>
								<Input
									disabled="true"
									backgroundColor="#F4F4F6"
									aria-describedby="last_name_help_text"
									id="patient_last_name"
									name="patient_last_name"
									type="text"
									placeholder="Doe"
									value={patient.lastName}
									onChange={(event) => updatePatient({ lastName: event.target.value })}
									required />
							</div>

							<div>
								<Input
									disabled="true"
									backgroundColor="#F4F4F6"
									aria-describedby="dob_help_text"
									id="patient_dob"
									name="patient_dob"
									type="text"
									placeholder="01-01-2000"
									value={patient.dob}
									onChange={(event) => updatePatient({ dob: event.target.value })}
									required
								/>
							</div>
						</Box>

						<Box display="flex" columnGap="42px" >
							<div>
								<OpenEmrStateFlags
									text={'Allow Email'}
									selectedValue={patient.allowEmail}
									onSelectedChange={(selected) => updatePatient({ allowEmail: selected })}
								/>

								<OpenEmrStateFlags
									text={'Allow Mail Message'}
									selectedValue={patient.allowMailMessage}
									onSelectedChange={(selected) => updatePatient({ allowMailMessage: selected })}
								/>

								<OpenEmrStateFlags
									text={'Allow Voice Message'}
									selectedValue={patient.allowVoiceMessage}
									onSelectedChange={(selected) => updatePatient({ allowVoiceMessage: selected })}
								/>
							</div>
							<div>

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
							</div>
							<div>


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
							</div>


						</Box>
					</Box>}
			</Box>}
			</Flex>
				{patient.firstName && patient.lastName && patient.dob && <Flex margin="auto" marginLeft="200px">
					<Button
						variant="primary"
						onClick={submit}
						disabled={!patient.firstName && !patient.lastName && !patient.dob}
						loading={loading}
					>
						Submit
						</Button>
				</Flex>}

				{loadPatients && <Box marginLeft="200px" marginTop="10px" >
					<p>Load patients</p>
					<Spinner size="sizeIcon110" decorative={false} title="Loading" /></Box>}
				<Footer />
		</Theme.Provider>
			);
		}
