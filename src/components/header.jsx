import React from 'react';
import {styled} from "@twilio-paste/styling-library";
import {Button} from "@twilio-paste/core";
import {Link} from "./link";

const Styles = styled.div`
  width: 100%; // 1440px;
  height: 70px;
  display: flex;
  padding: 20px 27px;
  justify-content: space-between;
  box-shadow: 0 2px 4px rgba(18, 28, 45, 0.1);

  .nav-container {
    display: flex;
    align-items: center;

    svg {
      margin-right: 24px
    }
  }

  [data-paste-element="BUTTON"] {
    line-height: 0.25;
  }
`;
export const Header = () => {
	
	const linkHandler = (e) => e.preventDefault();
	
	return <Styles>
		<div className="nav-container">
			<svg width="139" height="30" viewBox="0 0 139 30" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
				<rect x="39" y="1" width="90" height="15" fill="url(#pattern0)"/>
				<rect x="38" y="15" width="101" height="15" fill="url(#pattern1)"/>
				<path d="M29.9898 9.37817V3.75127C29.9898 1.683 28.305 0 26.2117 0H20.5446C18.4718 0 16.7767 1.683 16.7767 3.75127V12.6529C16.7767 12.9165 16.9912 13.1193 17.2464 13.1193H26.2117C28.2948 13.1193 29.9898 11.4363 29.9898 9.36803V9.37817Z" fill="#008CFF"/>
				<path d="M16.7767 17.3369V26.2385C16.7767 28.3068 18.4718 29.9898 20.5548 29.9898H26.2219C28.305 29.9898 30 28.3068 30 26.2385V20.6116C30 18.5434 28.305 16.8604 26.2219 16.8604H17.2567C16.9912 16.8604 16.7869 17.0733 16.7869 17.3267L16.7767 17.3369Z" fill="#008CFF"/>
				<path d="M0 20.622V26.2489C0 28.3172 1.69503 30.0002 3.77808 30.0002H9.4452C11.5283 30.0002 13.2233 28.3172 13.2233 26.2489V17.3473C13.2233 17.0837 13.0088 16.8809 12.7536 16.8809H3.77808C1.69503 16.8708 0 18.5538 0 20.622Z" fill="#008CFF"/>
				<path d="M13.2131 12.6529V3.75127C13.2131 1.683 11.5283 0 9.4452 0H3.77808C1.69503 0 0 1.683 0 3.75127V9.37817C0 11.4464 1.69503 13.1294 3.77808 13.1294H12.7434C13.0088 13.1294 13.2131 12.9165 13.2131 12.6631V12.6529Z" fill="#008CFF"/>
				<defs>
					<pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
						<use xlinkHref="#image0_2772_8581" transform="translate(-0.245313) scale(0.00520833 0.03125)"/>
					</pattern>
					<pattern id="pattern1" patternContentUnits="objectBoundingBox" width="1" height="1">
						<use xlinkHref="#image0_2772_8581" transform="translate(-1.12949) scale(0.00464109 0.03125)"/>
					</pattern>
					<image id="image0_2772_8581" width="459" height="32" xlinkHref="data:image/png;base64,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"/>
				</defs>
			</svg>
			
			<Link href="" onClick={linkHandler}>Find a Doctor</Link>
			<Link href="" onClick={linkHandler}>Locations & Directions</Link>
			<Link href="" onClick={linkHandler}>Careers</Link>
			<Link href="" onClick={linkHandler}>Contact us</Link>
		</div>
		
		<Button variant="primary">
			<svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M10.84 6.58297C10.7117 6.58297 10.5775 6.54214 10.4492 6.51297C10.1893 6.4557 9.93389 6.37967 9.685 6.28547C9.41438 6.18702 9.11692 6.19213 8.84984 6.29983C8.58277 6.40752 8.36496 6.61017 8.23833 6.8688L8.11 7.1313C7.54183 6.81524 7.01974 6.42269 6.55833 5.96464C6.10028 5.50323 5.70773 4.98114 5.39166 4.41297L5.63667 4.24964C5.8953 4.12301 6.09795 3.9052 6.20564 3.63812C6.31334 3.37105 6.31845 3.07359 6.22 2.80297C6.12738 2.55355 6.05138 2.29827 5.9925 2.0388C5.96333 1.91047 5.94 1.7763 5.9225 1.64214C5.85166 1.23125 5.63645 0.859154 5.31561 0.592861C4.99478 0.326568 4.5894 0.183577 4.1725 0.189638H2.4225C2.1711 0.187278 1.92214 0.239113 1.69258 0.341614C1.46301 0.444116 1.25823 0.594878 1.09217 0.783636C0.926102 0.972394 0.80266 1.19472 0.730241 1.43547C0.657822 1.67622 0.638127 1.92976 0.672498 2.1788C0.983262 4.62261 2.09935 6.89323 3.84446 8.63201C5.58958 10.3708 7.86424 11.4786 10.3092 11.7805H10.5308C10.961 11.7811 11.3763 11.6233 11.6975 11.3371C11.882 11.1721 12.0295 10.9697 12.13 10.7435C12.2306 10.5172 12.282 10.2722 12.2808 10.0246V8.27464C12.2737 7.86945 12.1261 7.47929 11.8634 7.17078C11.6006 6.86226 11.2389 6.6545 10.84 6.58297ZM11.1317 10.083C11.1316 10.1658 11.1138 10.2476 11.0796 10.3231C11.0454 10.3985 10.9956 10.4658 10.9333 10.5205C10.8682 10.5767 10.7919 10.6188 10.7096 10.6439C10.6272 10.669 10.5405 10.6766 10.455 10.6663C8.27036 10.3862 6.24114 9.38675 4.68742 7.82564C3.1337 6.26453 2.1439 4.23058 1.87416 2.04464C1.86488 1.95919 1.87302 1.87275 1.89808 1.79053C1.92315 1.70832 1.96462 1.63204 2.02 1.5663C2.07466 1.50408 2.14195 1.45421 2.21739 1.42001C2.29282 1.38582 2.37467 1.36808 2.4575 1.36797H4.2075C4.34315 1.36495 4.47561 1.40932 4.58208 1.49343C4.68855 1.57754 4.76237 1.69614 4.79083 1.8288C4.81416 1.98825 4.84333 2.14575 4.87833 2.3013C4.94572 2.60881 5.0354 2.91099 5.14666 3.20547L4.33 3.58464C4.26017 3.61668 4.19736 3.66219 4.14517 3.71857C4.09299 3.77495 4.05245 3.84108 4.02589 3.91317C3.99933 3.98526 3.98727 4.06188 3.99041 4.13864C3.99355 4.2154 4.01181 4.29079 4.04416 4.36047C4.8837 6.15874 6.32922 7.60427 8.1275 8.4438C8.26952 8.50215 8.42881 8.50215 8.57083 8.4438C8.64358 8.41778 8.71044 8.37757 8.76752 8.3255C8.82459 8.27343 8.87076 8.21053 8.90333 8.14047L9.265 7.3238C9.56656 7.43165 9.87434 7.52126 10.1867 7.59214C10.3422 7.62714 10.4997 7.6563 10.6592 7.67964C10.7918 7.7081 10.9104 7.78192 10.9945 7.88839C11.0787 7.99486 11.123 8.12732 11.12 8.26297L11.1317 10.083Z" fill="white"/>
			</svg>
			Patient Portal
		</Button>
		
	</Styles>
}
