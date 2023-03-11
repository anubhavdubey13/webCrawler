const { JSDOM } = require('jsdom')

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
    getURLsFromHTML,
    normalizeURL
}