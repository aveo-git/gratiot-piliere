/*
All those constants are put in a different file than Responsive.js so that vanilla-extract can use it.
(Responsive.js is client-side only; it uses window)
 */

export const miniMobile = '(max-width: 300px)';
export const mobile = '(max-width: 600px)';
export const tablet = '(min-width: 601px) and (max-width: 1023px)';
export const mobileTablet = '(max-width: 1023px)';
export const desktop = '(min-width: 1024px)';
export const landscape = 'screen and (orientation: landscape)';
export const iPad = 'only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (-webkit-min-device-pixel-ratio: 2)';
