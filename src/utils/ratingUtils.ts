export const getRatingGrade = (rating?: number) => {
    if (!rating) {
        return 'notrated'
    }
    if (rating < 40) {
        return 'mediocre'
    }
    if (rating < 70) {
        return 'average'
    }
    return 'great'
}
