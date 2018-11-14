const twit = require('twit');
const index = require('./index');

const T = new twit({
    consumer_key:         'jaec1gzjvUEH3m0rBzI0lesWe',
    consumer_secret:      'Yl2ruQYn4yAI92cCrQ7E1ycdoF8a5kJJxKB1KkJ0EekvzqXvPg',
    access_token:         '3003116730-sL8ICd3r19woBjqwqmlgXasNzMzhwJj5Ej6iO9Q',
    access_token_secret:  'PXLnuElROCTOjNAyEwEOap7sDamKrTFI42apzrGYOi7Km',
    timeout_ms:           60*1000,
    strictSSL:            true,
});

module.exports = {
    query(query, callback) {
        const params = {geocode: "40.177200,44.503490,20km"};

        T.get("search/tweets", params, function(err, data) {
            if (err) {
                console.log('ERROR: ', err);
                callback(null);
            }
            else {
                callback(data.statuses);
            }
            console.log(data.statuses, "statuses");
        });
    }
};