import React from 'react';
import {styled} from "@twilio-paste/styling-library";
import {Button} from "@twilio-paste/core";
import {Link} from "./link";

const Styles = styled.footer`
  position: absolute;
  width: 100%; //1440px;
  height: 113px;
  //bottom: 10px;
	display: flex;
  background: #E1E3EA;
	padding: 28px 120px 22px 128px;
	justify-content: space-between;
	.left-column {
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
    span {
      color: #606B85;
      display: inline-flex;
      font-family: 'Inter', san-serif;
      font-style: normal;
      font-weight: 600;
      font-size: 12px;
      margin-right: 30px;
    }
	}
	.right-column {
    display: flex;
		align-items: center;
		.text {
      font-weight: 500;
      font-size: 16px;
      line-height: 19px;
      color: #606B85;
			margin-right: 52px;
      font-family: 'Inter', san-serif;
      font-style: normal;
    }
	}
`;
export const Footer = () => {
	
	const linkHandler = (e) => e.preventDefault();
	
	return <Styles>
		<div className="left-column">
			<div>
				<svg width="116" height="25" viewBox="0 0 116 25" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
					<rect x="32.5" y="0.833008" width="75" height="12.5" fill="url(#pattern0)"/>
					<rect x="31.6667" y="12.5" width="84.1667" height="12.5" fill="url(#pattern1)"/>
					<path d="M24.9915 7.81514V3.12606C24.9915 1.4025 23.5875 0 21.8431 0H17.1205C15.3931 0 13.9806 1.4025 13.9806 3.12606V10.5441C13.9806 10.7638 14.1593 10.9327 14.372 10.9327H21.8431C23.579 10.9327 24.9915 9.53025 24.9915 7.80669V7.81514Z" fill="#008CFF"/>
					<path d="M13.9806 14.4469V21.8649C13.9806 23.5885 15.3931 24.991 17.129 24.991H21.8516C23.5875 24.991 25 23.5885 25 21.8649V17.1759C25 15.4523 23.5875 14.0498 21.8516 14.0498H14.3805C14.1593 14.0498 13.9891 14.2272 13.9891 14.4385L13.9806 14.4469Z" fill="#008CFF"/>
					<path d="M0 17.185V21.8741C0 23.5977 1.41253 25.0002 3.1484 25.0002H7.871C9.60687 25.0002 11.0194 23.5977 11.0194 21.8741V14.4561C11.0194 14.2364 10.8407 14.0674 10.628 14.0674H3.1484C1.41253 14.059 0 15.4615 0 17.185Z" fill="#008CFF"/>
					<path d="M11.0109 10.5441V3.12606C11.0109 1.4025 9.60687 0 7.871 0H3.1484C1.41253 0 0 1.4025 0 3.12606V7.81514C0 9.5387 1.41253 10.9412 3.1484 10.9412H10.6195C10.8407 10.9412 11.0109 10.7638 11.0109 10.5526V10.5441Z" fill="#008CFF"/>
					<defs>
						<pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
							<use xlinkHref="#image0_2751_31544" transform="translate(-0.245313) scale(0.00520833 0.03125)"/>
						</pattern>
						<pattern id="pattern1" patternContentUnits="objectBoundingBox" width="1" height="1">
							<use xlinkHref="#image0_2751_31544" transform="translate(-1.12949) scale(0.00464109 0.03125)"/>
						</pattern>
						<image id="image0_2751_31544" width="459" height="32" xlinkHref="data:image/png;base64,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"/>
					</defs>
				</svg>
			</div>
			<div>
				<span>&copy; Cloud City Healthcare</span>
				<Link href="" onClick={linkHandler}>Privacy Policy</Link>
				<Link href="" onClick={linkHandler}>Terms of Service</Link>
			</div>
		
		</div>
		<div className="right-column">
			<span className="text">Need some help? Chat with us</span>
			<Button variant="primary" size="rounded_small">
				Chat with us
			</Button>
		</div>
	</Styles>
}
