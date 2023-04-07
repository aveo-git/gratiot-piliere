import { IconLicense, IconMap, IconPower, IconReceipt, IconShieldLock, IconUserCircle } from '@tabler/icons-react';
import { groupBy } from 'lodash';
import moment from 'moment';
import * as yup from 'yup'

moment.locale('fr')
moment.updateLocale('fr', {
    months : [
        "Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet",
        "Août", "Septembre", "Octobre", "Novembre", "Decembre"
    ],
    weekdays: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
});

export const DAY_FR = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
export const MONTH_FR = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"]

export const VAT = 20;
export const WIDTH_RIGHT_SECTION = 280
export const CURRENCY = '€'

export const padWithLeadingZeros = number => {
    return String(number).padStart(2, '0');
}

export const containerVariants = {
    top: { // animation is from bottom to top
        hidden: { opacity: 0, transform: 'translateY(10%)'},
        visible: { opacity: 1, transform:'translateY(0px)'}
    },
    bottom: { // animation is from top to bottom
        hidden: { opacity: 0, transform:'translateY(-10%)'},
        visible: { opacity: 1, transform:'translateY(0px)'}
    },
    left: { // animation is from right to left
        hidden: { opacity: 0, transform:'translateX(10%)'},
        visible: { opacity: 1, transform:'translateX(0px)'}
    },
    right: { // animation is from left to right
        hidden: { opacity: 0, transform:'translateX(-10%)'},
        visible: { opacity: 1, transform:'translateX(0px)'}
    }
};

export const getPriceBefore = number => {
    if(typeof number !== 'string') number = number+'';
    const numbers = number.split('.');
    return numbers[0]
}

export const getPriceAfter = number => {
    if(typeof number !== 'string') number = number+'';
    const numbers = number.split('.');
    if(numbers.length > 1) return numbers[1]
    else return '00'
}

//to capitalize only first letter
export function capitalizeFirstLetter(string, lowercaseFirst = false) {
	let usedString = string.toLowerCase();
	if (!usedString || !usedString.length) {
		return usedString;
	}

	if (lowercaseFirst) {
		usedString = usedString.toLowerCase();
	}

	return usedString.charAt(0).toUpperCase() + usedString.slice(1);
}

//to capitalize all first letter of each word
export function capitalizeCase(string) {
	if (!string) {
		return '';
	}
	string = string.trim(); // important
	if (!string.length) {
		return '';
	}
	return string.toLowerCase().split(' ').map(word =>
		word[0].toUpperCase() + word.substr(1)
	).join(' ');
}


export const numberFormat = value => {
	if (!value) return 0;
	const newVal = typeof value === 'number' && value % 1 !== 0 ? toDecimal(value) : parseInt(value, 10);
	return newVal || 0;
}

export const toDecimal = (value, afterComma = 2) => {
	if (!value) {
		return 0;
	} else if (typeof value === 'number') {
		return parseFloat(value.toFixed(afterComma));
	}
	// replace ',' to '.'
	const str = value.includes(',') ? value.replace(',', '.') : value;
	const res = parseFloat(str);
	if (!isNaN(res)) {
		return toDecimal(res, afterComma); // to get a good format decimal
	}
	return 0;
}

export function toInt(value) {
	return value ? parseInt(value, 10) : 0;
}

export const getValeurWithVAT = value => {
	return toDecimal(value / (1 + VAT / 100));
}

export const getTotal = (orders, withVAT = false) => {
	if(!orders) return 0;
    return orders.reduce((a, c) =>
        // a + c.quantity*(withVAT ? getValeurWithVAT(c?.price) : c?.price)
        a + (withVAT ? getValeurWithVAT(c?.price) : c?.price)
    , 0)
}

export function toBoolean(value) {
	return typeof value === "boolean" ? value : value === "true";
}

export const isEmpty = obj => {
	if(Array.isArray(obj)) return obj.length === 0
	return Object.keys(obj).length === 0 && obj.constructor === Object
}

// --------------------- MOMENT ------------------- //

// toDateString exemple:  Vendredi 2 Septembre (with capitalize first letter)
export function toDateString(value) {
	// return toMoment(value).format('dddd D MMMM').split(' ').map(word => word[0].toUpperCase() + word.slice(1)).join(' ');
	return toMoment(value).format('D MMMM YYYY').split(' ').map(word => word[0].toUpperCase() + word.slice(1)).join(' ');
}

export function getStringdate(value) {
	return `${toDateString(value) + `, à ` + toHourString(value)}`;
}

export function toHourString(value) {
	// return toMoment(value).format('dddd D MMMM').split(' ').map(word => word[0].toUpperCase() + word.slice(1)).join(' ');
	return toMoment(value).format('h:mm').split(' ').map(word => word[0].toUpperCase() + word.slice(1)).join(' ');
}

export function toDateFormatString(momentOrDateOrString) {
	return toMoment(momentOrDateOrString).format('YYYY-MM-DD');
}
export function toShortDateString(momentOrDateOrString, format = 'short') {
	const formatStr = format === 'short' ? 'DD/MM/YY' : 'DD/MM/YYYY';
	return toMoment(momentOrDateOrString).format(formatStr);
}
export function toLongDateString(momentOrDateOrString) {
	return toMoment(momentOrDateOrString).format('DD MMMM YYYY');
}

export function toDateBadFormat(momentOrDateOrString) {
	return toMoment(momentOrDateOrString).format('YYYY/MM/DD');
}

export function toDate(dateOrString) {
	if (typeof dateOrString === 'string') {
		let [year, month, day] = dateOrString.split("-");
		if (dateOrString.includes('/')) {
			// french date DD/MM/YY
			[day, month, year] = dateOrString.split("/");
		}
		return new Date(toInt(year), month - 1, toInt(day));

	} else if (typeof dateOrString === 'number') { // it's a timestamp
		return new Date(dateOrString * 1000);

	} else {
		return dateOrString;
	}
}

export function toDayOfWeek(dateOrString) {
	return dateOrString ? toDate(dateOrString).getDay() : undefined;
}

export function toMoment(momentOrDateOrString) {
	if (momentOrDateOrString == null) {
		return moment();
	} else if (moment.isMoment(momentOrDateOrString)) {
		//---- moment ----//
		return momentOrDateOrString;
	} else if (typeof momentOrDateOrString === 'string') {
		//---- string ----//
		return moment(momentOrDateOrString, 'YYYY-MM-DD');
	} else {
		//---- date ----//
		return moment(momentOrDateOrString);
	}
}

export function getDayName(dateOrString, capitalized = true) {
	const date = toDate(dateOrString);
	let day = moment(date).format('dddd');
	capitalized && (day = capitalizeFirstLetter(day));
	return day;
}

export function getMonthName(dateOrString, capitalized = true) {
	const date = toDate(dateOrString);
	let month = moment(date).format('MMMM');
	capitalized && (month = capitalizeFirstLetter(month));
	return month;
}

export function formatDate(dateOrString, { withDayName = true, withYear = true, lowerCaseOnDayName = false } = {}) {
	if (!dateOrString) {
		return '';
	}
	const date = toDate(dateOrString);

	const dayAndMonth = date.getDate() + (date.getDate() === 1 ? 'er' : '') + ' ' + getMonthName(date, false);

	//---- parts construction ----//
	const parts = [];
	if (withDayName) {
		let dayName = getDayName(date);
		if (lowerCaseOnDayName) {
			dayName = dayName.toLowerCase();
		}
		parts.push(dayName);
	}
	parts.push(dayAndMonth);
	withYear && parts.push(date.getFullYear());

	return parts.join(' ');
}

export function isBeforeToday(date) {
	if (date == null) return false;
	return moment().diff(date) <= 0;
}

export function getNearestDay(dates) {
	if (dates == null) return '';
	let nearestDate;
		// check plus proche date
	dates.forEach(date => {
		let diff = toMoment(date).diff(toMoment(), 'days');
		if (diff > 0) {
			if (nearestDate) {
				if (toMoment(date).diff(toMoment(nearestDate), 'days') < 0) {
					nearestDate = date;
				}
			} 
			else {
				nearestDate = date;
			}
		}
	});
	return nearestDate;
}

// -------------------------------------------- //

export const minifyId = id => {
	return id.split('-')[0]
}

export const MENU_PROFIL = [
	{id: 1, title: 'Général', icon: <IconUserCircle />, disabled: false, to: 'general'},
	{id: 2, title: 'Modifier mon mot de passe', icon: <IconShieldLock />, disabled: false, to: 'security'},
	{id: 3, title: 'Choisir mon lieu de livraison', icon: <IconMap />, disabled: false, to: 'choise-shipping'},
	{id: 4, title: 'Consulter mes factures', icon: <IconReceipt />, disabled: false, to: 'bills'},
	{id: 5, title: 'Consulter historique', icon: <IconLicense />, disabled: true, to: 'history'},
	{id: 6, title: 'Déconnexion', icon: <IconPower />, disabled: false, to: 'logout'},
]

export const parseToView = (data) => ({ ...JSON.parse(JSON.stringify(data.attributes)), id: data?.id, objectId: data?.id });

export const parseUser = (user) => {
	return {
		id: user.id,
		lastName: user.get('lastName'),
		firstName: user.get('firstName'),
		email: user.get('email'),
		username: user.get('username')
	}
}

export const lastPath = (path) => {
	return path.substring(path.lastIndexOf('/') + 1)
}

export const groupByIdforCart = (arr, sorted = true) => {
	const arrGrouped = groupBy(arr, (arr) => arr.product?.objectId)
	
    let best_data = []
    for (const [, value] of Object.entries(arrGrouped)) {
		best_data.push({count: value.length, createdAt: value[0]?.product?.createdAt, product: value[0]?.product})
    }
    best_data = sorted ? best_data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)) : best_data;
	
	return best_data;
}

export const groupById = (arr, sorted = true) => {
	const arrGrouped = groupBy(arr, (arr) => arr.objectId)

    let best_data = []
    for (const [, value] of Object.entries(arrGrouped)) {
        best_data.push({count: value.length, createdAt: value[0]?.createdAt, product: value[0]})
    }
    best_data = sorted ? best_data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)) : best_data;

	return best_data;
}

export const groupProductByCategory = (arr, sorted = true) => {
	const arrGrouped = groupBy(arr, (arr) => arr.category)

    let best_data = []
    for (const [key, value] of Object.entries(arrGrouped)) {
        best_data.push({count: value.length, category: key, product: value})
    }
    best_data = sorted ? best_data.sort((a, b) => a.category.localeCompare(b.category)) : best_data;

	return best_data;
}

export const groupOrderByMonth = (arr, reverted = true) => {
	
	let best_data = MONTH_FR.map(month => {
		const arrFiltered = arr.filter(item => month === getMonthName(item.createdAt))
		return {month: month+' '+toMoment(arrFiltered.order?.[0].createdAd).format('YYYY'), order: arrFiltered}
	})

    best_data = reverted ? best_data : best_data;

	return best_data;
}

// YUP SCHEMA
export const yupRequired = {
	string: yup.string().required(),
	email: yup.string().email().required(),
	phone: yup
    .string()
    .matches(
      /^\+?\d{1,3}[- ]?\d{3,4}[- ]?\d{4}$/,
      'Invalid phone number'
    )
    .required('Phone number is required')
}

export const passwordSchema = yup.string()
.matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}$/, 'Mot de passe incorrect, assurez-vous que les regles sont respectés.')
.min(8, 'Password must be at least 8 characters long')
.required('Password is required');

export const loginSchema = yup.object().shape({
	username: yupRequired.string,
	password: passwordSchema
})

export const signupSchema = yup.object().shape({
	lastName: yupRequired.string,
	firstName: yupRequired.string,
	email: yupRequired.email,
	mobile: yupRequired.phone,
	address: yupRequired.string,
	password: yup.string().min(8)
})