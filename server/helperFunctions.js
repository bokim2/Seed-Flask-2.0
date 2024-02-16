export function getPopularOptions (data, maxPerKey = 5){
    const uniqueValues = {};

    data.forEach(row => {
        Object.entries(row).forEach(([key, value])=> {
            if (!uniqueValues[key]){
                uniqueValues[key] = new Set()
            }
            if (uniqueValues[key].size < maxPerKey){
                uniqueValues[key].add(value)
            }
        })
    })
console.log('uniqueValues', uniqueValues)

Object.keys(uniqueValues).forEach(key => {
    uniqueValues[key] = [...uniqueValues[key]]
})
console.log('uniqueValues', uniqueValues)
return uniqueValues

}