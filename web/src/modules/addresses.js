
export const getMinifyAddress = (address) => {
    const start = address.substring(0, 4)
    const end = address.substring(address.length - 5, address.length - 1)
    return `${start}...${end}`
}
