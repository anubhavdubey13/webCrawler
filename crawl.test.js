const { test, expect } = require('@jest/globals');
const { normalizeURL } = require('./crawl');

test('https://wagslane.dev/ returns as wagslane.dev', () => {
    expect(normalizeURL('https://wagslane.dev/')).toBe('wagslane.dev')
})

test('https://wagsLane.Dev/path returns as wagslane.dev/path', () => {
    expect(normalizeURL('https://wagsLane.Dev/path')).toBe('wagslane.dev/path')
})

test('https://wagsLane.Dev/path/get-set-go/abc.html/ returns as wagslane.dev/path/get-set-go/abc.html', () => {
    expect(normalizeURL('https://wagsLane.Dev/path/get-set-go/abc.html/')).toBe('wagslane.dev/path/get-set-go/abc.html')
})