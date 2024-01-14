export async function getAllProducts() {
    const res = await fetch(`https://dummyjson.com/products`)
    const result = await res.json()

    return result
}

export async function getSingleProduct(adId) {
    const res = await fetch(`https://dummyjson.com/products/${adId}`)
    const result = await res.json()
    return result
}

// export {
//     getAllProducts,
//     getSingleProducts
// }