const { JSDOM } = require('jsdom')

async function crawlPage(baseURL, currentURL, pages) {
    const baseURLObj = new URL(baseURL)
    const currentURLObj = new URL(currentURL)
    if (baseURLObj.hostname !== currentURLObj.hostname) {
        return pages
    }

    const normCurrentURL = normalizeURL(currentURL)

    if (pages[normCurrentURL] > 0) {
        pages[normCurrentURL]++
        return pages
    }

    pages[normCurrentURL] = 1

    console.log(`crawling ${normCurrentURL}`)
    let respText = ''
    try {
        response = await fetch(currentURL)
        if (response.status > 399) {
            console.log(`Error code: ${response.status}`)
            return pages
        }
        const contentType = response.headers.get('content-type')
        if (!contentType.includes('text/html')) {
            console.log('No text or html content')
            return pages
        }
        respText = await response.text()
        //console.log(respText)
    } catch (error) {
        console.log(`Error: ${error}`)
    }

    const pageURLs = getURLsFromHTML(respText, baseURL)

    for (const newURL of pageURLs) {
        pages = await crawlPage(baseURL, newURL, pages)
    }
    return pages
}

function getURLsFromHTML(htmlBody, baseURL) {
    const allURLs = []
    const dom = new JSDOM(htmlBody)
    const aElements = dom.window.document.querySelectorAll('a')
    for (let a of aElements) {
        if (a.href.slice(0, 1) === '/') {
            allURLs.push(new URL(a.href, baseURL).href)
        } else {
            allURLs.push(new URL(a.href).href)
        }
    }
    return allURLs
}

function normalizeURL(url) {
    const urlObj = new URL(url)
    let normURL = `${urlObj.hostname}${urlObj.pathname}`
    if (normURL.length > 0 && normURL.slice(-1) === '/') {
        normURL = normURL.slice(0, -1)
    }
    return normURL
}

module.exports = {
    crawlPage,
    getURLsFromHTML,
    normalizeURL
}