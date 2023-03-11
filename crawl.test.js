const { test, expect } = require('@jest/globals');
const { getURLsFromHTML, normalizeURL } = require('./crawl');

// tests for getURLsFromHTML
const htmlBody = `<html>
<body>
    <a href="https://wagslane.dev"><span>Go to Boot.dev</span></a>
    <a href="/path"></a>
    <a href="/project/tags/"></a>
</body>
</html>`

const baseURL = "https://wagslane.dev"

test(`URLs ["https://wagslane.dev/", "/path", "/project/tags/"] are returned as 
    ["https://wagslane.dev/", "https://wagslane.dev/path", "https://wagslane.dev/project/tags/"] `, () => {
    expect(getURLsFromHTML(htmlBody, baseURL)).toEqual(["https://wagslane.dev/", "https://wagslane.dev/path", "https://wagslane.dev/project/tags/"])
})

test('Length of returned array should be equal to the number of <a> tags in htmlBody', () => {
    expect(getURLsFromHTML(htmlBody, baseURL).length).toBe([...htmlBody.matchAll('</a>')].length)
})

// tests for normalizeURL
test('https://wagslane.dev/ returns as wagslane.dev', () => {
    expect(normalizeURL('https://wagslane.dev/')).toBe('wagslane.dev')
})

test('https://wagsLane.Dev/path returns as wagslane.dev/path', () => {
    expect(normalizeURL('https://wagsLane.Dev/path')).toBe('wagslane.dev/path')
})

test('https://wagsLane.Dev/path/get-set-go/abc.html/ returns as wagslane.dev/path/get-set-go/abc.html', () => {
    expect(normalizeURL('https://wagsLane.Dev/path/get-set-go/abc.html/')).toBe('wagslane.dev/path/get-set-go/abc.html')
})