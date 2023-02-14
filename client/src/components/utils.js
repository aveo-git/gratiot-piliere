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