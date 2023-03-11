function printReport(pages) {
    console.log('\nPrinting the report...\n')
    const sortedArr = sortObjToArr(pages)
    //console.log(sortedArr)
    for (const arr of sortedArr) {
        console.log(`Found ${arr[1]} internal links to ${arr[0]}`)
    }
}

function sortObjToArr(obj) {
    let sortable = []
    for (const key in obj) {
        sortable.push([key, obj[key]])
    }
    //console.log(sortable)
    sortable.sort(function (a, b) { //this is copied, will understand logic later
        return  b[1] - a[1]
    })
    return sortable
}

module.exports = {
    printReport
}
