export const generateTwoDimensionalArray = (firstDimension: Number, secondDimension: Number) => {
    return Array.from(Array(firstDimension), () => new Array(secondDimension))
}
