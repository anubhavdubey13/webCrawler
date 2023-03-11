const { JSDOM } = require('jsdom')

function getURLsFromHTML(htmlBody, baseURL) {
    return [baseURL, baseURL, baseURL]
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