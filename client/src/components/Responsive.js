import React from 'react';
import Responsive from 'react-responsive';
import * as medias from './ResponsiveMedias';

//---- Tags for JSX ----//
export const Mobile = props => <Responsive {...props} maxWidth={600} />;
export const Tablet = props => <Responsive {...props} minWidth={601} maxWidth={1023} />;
export const MobileTablet = props => <Responsive {...props} maxWidth={1023} />;
export const TabletDesktop = props => <Responsive {...props} minWidth={601} />;
export const Desktop = props => <Responsive {...props} minWidth={1024} />;

//---- media queries for css-js ----//
const media = '@media ';
export const miniMobile = media + medias.miniMobile;
export const mobile = media + medias.mobile;
export const tablet = media + medias.tablet;
export const mobileTablet = media + medias.mobileTablet;
export const desktop = media + medias.desktop;
export const landscape = media + medias.landscape;
export const iPad = media + medias.iPad;

/**
 * has the advantage of being synchronous (unlike when we use redux)
 * @returns {string}
 */
export function getCurrentScreen() {
	let screen = 'desktop';
	const width = window.innerWidth;
	const height = window.innerHeight;
	// display screen for mobile
	if (width <= 600 && height <= 1024) {
		screen = 'mobile';
	}
	// display screen for tablet
	if (width > 600 && width < 1024 && height <= 1280) {
		screen = 'tablet';
	}

	return screen;
}

/*------ window size -------*/
/**
 * Return the width and the height of the window
 */
export function getWindowSize() {
	return {
		width: window.innerWidth,
		height: window.innerHeight
	};
}
