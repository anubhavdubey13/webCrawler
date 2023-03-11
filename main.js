const { crawlPage } = require('./crawl')

async function main() {
    const totalInputs = process.argv.length - 2

    if (totalInputs < 1) {
        console.log('No input provided')
        return
    } else if (totalInputs > 1) {
        console.log(`${totalInputs} inputs provided. Need just one`)
        return
    }
    const baseURL = process.argv[2]
    console.log(`started crawling at ${baseURL}`)
    const resultObj = await crawlPage(baseURL, baseURL, {})
    console.log(resultObj)

}

main()