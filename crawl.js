const { JSDOM } = require('jsdom')

async function crawlPage(baseURL, url, pages) {
    let respText = ''
    try {
        response = await fetch(url)
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
        console.log(respText)
    } catch (error) {
        console.log(`Error: ${error}`)
    }
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