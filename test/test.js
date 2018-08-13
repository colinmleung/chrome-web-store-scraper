const ChromeWebStoreScraper = require('../src/chrome-web-store-scraper');

const { assert } = require('chai');
//const validURLRegExp = new RegExp('_^(?:(?:https?|ftp)://)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\x{00a1}-\x{ffff}0-9]+-?)*[a-z\x{00a1}-\x{ffff}0-9]+)(?:\.(?:[a-z\x{00a1}-\x{ffff}0-9]+-?)*[a-z\x{00a1}-\x{ffff}0-9]+)*(?:\.(?:[a-z\x{00a1}-\x{ffff}]{2,})))(?::\d{2,5})?(?:/[^\s]*)?$_iuS');
const validURLRegExp = /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm;

describe('Scraper', function() {

    describe('#constructor()', function() {
        it('Should have constructed correctly with searchCategories and searchFeatures defined', function() {
            const scraper = new ChromeWebStoreScraper();
            assert.notEqual(scraper.searchCategories, undefined);
            assert.notEqual(scraper.searchFeatures, undefined);
        });

        it('Should have a json of search categories with categories inside of it.', function() {
            const scraper = new ChromeWebStoreScraper();
            assert.isOk(Object.keys(scraper.searchCategories).length > 0);
        })

        it('Should have a json of search filters with filters inside of it.', function() {
            const scraper = new ChromeWebStoreScraper();
            assert.isOk(Object.keys(scraper.searchFeatures).length > 0);
        })
    });

    describe('#search()', function() {

        it('Must reject if invalid search category is provided', function () {
            const scraper = new ChromeWebStoreScraper();
            const fakeFilter = {searchFeatures : ['notARealFilter']}

            return scraper.search('searchString', fakeFilter).then(
                () => Promise.reject(new Error('Expected method to reject.')),
                err => assert.instanceOf(err, Error)
            );
S        })

        it('Must reject if search filter not passed as array', function() {
            const scraper = new ChromeWebStoreScraper();
            const invalidFilter = {searchFeatures : 'notAnArray'};

            return scraper.search('searchString', invalidFilter).then(
                () => Promise.reject(new Error('Expected method to reject.')),
                err => assert.instanceOf(err, Error)
            );
        });

        it('Must reject if invalid search category is provided', function () {
            const scraper = new ChromeWebStoreScraper();
            const fakeCategory =  {searchCategory : 'notARealCategory'}

            return scraper.search('searchString', fakeCategory).then(
                () => Promise.reject(new Error('Expected method to reject.')),
                err => assert.instanceOf(err, Error)
            );
        })
    })

    describe('#buildSearchURL()', function() {
        it('Must produce a valid URL with only a searchString', function() {
            const scraper = new ChromeWebStoreScraper();
            const searchTerm = 'A Test String';

            const searchURL = scraper.buildSearchURLString(searchTerm)
            assert.doesNotThrow(() => new URL(searchURL));
        });

        it('Must produce a valid URL with only one search filter option and search string', function() {
            const scraper = new ChromeWebStoreScraper();
            const searchTerm = 'A Test String';
            const options =  {searchFeatures : ['free']}

            const searchURL = scraper.buildSearchURLString(searchTerm, options)
            assert.doesNotThrow(() => new URL(searchURL));
        })

        it('Must produce a valid URL with multiple search filter option and search string', function() {
            const scraper = new ChromeWebStoreScraper();
            const searchTerm = 'A Test String';
            const options =  {searchFeatures : ['offline', 'byGoogle', 'free']}


            const searchURL = scraper.buildSearchURLString(searchTerm, options)
            assert.doesNotThrow(() => new URL(searchURL));
        })

        it('Must produce a valid URL with only search category option and search string', function() {
            const scraper = new ChromeWebStoreScraper();
            const searchTerm = 'A Test String';
            const options =  {searchCategory : 'fun'}

            const searchURL = scraper.buildSearchURLString(searchTerm, options)
            assert.doesNotThrow(() => new URL(searchURL));
        })
    })
});