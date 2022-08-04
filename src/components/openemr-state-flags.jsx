import React, {useEffect, useState} from 'react';
import { Radio, RadioGroup } from "@twilio-paste/core";
import {OPEN_EMR_STATE_VALUES} from "../models/constants";
import {v4 as uuidV4} from 'uuid';

import {styled} from '@twilio-paste/styling-library';

const Styles = styled.div`
	[data-paste-element="RADIO_GROUP"] {
		margin-bottom: 25px;
		font-size: 12px!important;

	}
	[data-paste-element="MEDIA_BODY"] {
		font-size: 12px;
	}
	[data-paste-element="RADIO_LABEL_TEXT"] {
		font-size: 12px;
	}
	[data-paste-element="RADIO_GROUP_SET"] {
		display: flex;
		justify-content: space-between;
	}
`;

export const OpenEmrStateFlags = ({
  text,
  selectedValue = OPEN_EMR_STATE_VALUES.unassigned,
  onSelectedChange = () => {}
}) => {
	
	return (
		<Styles>
			<RadioGroup
				name={text}
				legend={text}
				value={selectedValue}
				onChange={newValue => {
					onSelectedChange(newValue);
				}}
			>
				<Radio
					id={`${text.replace(' ', '-')}-${OPEN_EMR_STATE_VALUES.yes}`}
					value={OPEN_EMR_STATE_VALUES.yes}
					name={text}>
					{OPEN_EMR_STATE_VALUES.yes}
				</Radio>
				<Radio
					id={`${text.replace(' ', '-')}-${OPEN_EMR_STATE_VALUES.no}`}
					value={OPEN_EMR_STATE_VALUES.no}
					name={text}>
					{OPEN_EMR_STATE_VALUES.no}
				</Radio>
				<Radio
					id={`${text.replace(' ', '-')}-${OPEN_EMR_STATE_VALUES.unassigned}`}
					value={OPEN_EMR_STATE_VALUES.unassigned}
					name={text}>
					{OPEN_EMR_STATE_VALUES.unassigned}
				</Radio>
			</RadioGroup>
		</Styles>
	);
};
