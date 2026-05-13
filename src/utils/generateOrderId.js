export const generateOrderNumber = () => {
    const random = Math.floor(Math.random() * 9000000) + 1000000
    return `LX-${random}`
}