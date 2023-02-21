export const padWithLeadingZeros = number => {
    return String(number).padStart(2, '0');
}

export const containerVariants = {
    top: { // animation is from bottom to top
        hidden: { opacity: 0, transform: 'translateY(50%)'},
        visible: { opacity: 1, transform:'translateY(0px)'}
    },
    bottom: { // animation is from top to bottom
        hidden: { opacity: 0, transform:'translateY(-50%)'},
        visible: { opacity: 1, transform:'translateY(0px)'}
    },
    left: { // animation is from right to left
        hidden: { opacity: 0, transform:'translateX(50%)'},
        visible: { opacity: 1, transform:'translateX(0px)'}
    },
    right: { // animation is from left to right
        hidden: { opacity: 0, transform:'translateX(-50%)'},
        visible: { opacity: 1, transform:'translateX(0px)'}
    }
};

export const getPriceBefore = number => {
    if(typeof number !== 'string') return;
    const numbers = number.split('.');
    return numbers[0]
}

export const getPriceAfter = number => {
    if(typeof number !== 'string') return;
    const numbers = number.split('.');
    if(numbers.length > 1) return numbers[1]
    else return '00'
}

export const ordersInitial = [
    {
        id: '01agaura',
        nom: 'Brut Rose',
        description: 'Ce Rosé est constitué de 83% de vin blanc et 17% de vin de la suite je ne sais plus quoi dire mais je veux des phrases tres tres longues',
        quantity: 1,
        price: 33.99,
        image: 'null'
    },
    {
        id: '02agaura',
        nom: 'Millesime 2015',
        description: 'Ce Rosé est constitué de 83% de vin blanc',
        quantity: 2,
        price: 31.45,
        image: 'null'
    },
    {
        id: '03agaura',
        nom: 'Brut tradition',
        description: 'Ce Rosé est constitué de 83% de vin blanc et 17% de vin de la suite je ne sais plus quoi dire mais je veux des phrases tres tres longues',
        quantity: 1,
        price: 10,
        image: 'null'
    }
]
