// بيحسب السعر بعد الخصم
export const calculateDiscountedPrice = (price, discount) => {
    if (!discount) return price
    return +(price - (price * discount) / 100).toFixed(2)
}

// بيحسب نسبة الخصم لو مش موجودة
export const calculateDiscountPercent = (original, current) => {
    if (!original || original <= current) return 0
    return Math.round(((original - current) / original) * 100)
}