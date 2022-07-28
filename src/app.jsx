import React, {useState} from 'react';
import {Box, Button, Checkbox, Heading, HelpText, Input, Label} from "@twilio-paste/core";
import {Theme} from '@twilio-paste/theme';


export default function App() {
	
	const [name, setName] = useState('');
	const [familyName, setFamilyName] = useState('');
	const [dob, setDob] = useState('');
	const [checked, setChecked] = useState(true);
	
	
	const submit = () => {
		console.log('submit', name, familyName, dob, checked);
		window.analytics.identify(`${name}-${familyName}-${dob}`,{
			firstName: name,
			lastName: familyName,
			birthday: dob,
			sendSms: checked
		});
	}
	
	return (
		<Theme.Provider>
			<Box width={400} margin={'auto'} marginTop={'space100'}>
				<Heading as="h2" variant="heading20">Patient Info</Heading>
				<form>
					<Label htmlFor="patient_name" required>Name</Label>
					<Input
						aria-describedby="patient_help_text"
						id="patient_name"
						name="patient_name"
						type="text"
						placeholder="John"
						value={name}
						onChange={(event) => {
							setName(event.target.value);
						}}
						required/>
					<HelpText id="patient_help_text">Enter your name</HelpText>
					
					<Label htmlFor="patient_family_name" required>Family Name</Label>
					<Input
						aria-describedby="family_name_help_text"
						id="patient_family_name"
						name="patient_family_name"
						type="text"
						placeholder="Doe"
						value={familyName}
						onChange={(event) => {
							setFamilyName(event.target.value);
						}}
						required/>
					<HelpText id="family_name_help_text">Enter your family name</HelpText>
					
					<Label htmlFor="patient_dob" required>Date of Birth</Label>
					<Input
						aria-describedby="dob_help_text"
						id="patient_dob"
						name="patient_dob"
						type="text"
						placeholder="01-01-2000"
						value={dob}
						onChange={(event) => {
							setDob(event.target.value);
						}}
						required
					/>
					<HelpText id="dob_help_text">Enter your date of birth</HelpText>
					
					<Checkbox
						id="controlled"
						value="controlled"
						name="controlled"
						checked={checked}
						onChange={(event) => {
							setChecked(event.target.checked);
						}}
					>
						Allow to send sms
					</Checkbox>
					<br/>
					<Button
						variant="primary"
						onClick={submit}
						disabled={!name && !familyName && !dob}
					>
						Submit
					</Button>
				</form>
			</Box>
		</Theme.Provider>
	);
}
