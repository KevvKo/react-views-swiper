export const isBoundary = (currentIndex: number, translation: number, maxIndex: number): boolean => {
    return (
            currentIndex === 0 && translation > 0 
        ||  currentIndex === maxIndex && translation < 0
    )
}
export default isBoundary;