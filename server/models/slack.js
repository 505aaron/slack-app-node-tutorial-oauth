'use strict';

// Replace with something more persistent.
let tokenStorage;

module.exports.saveToken = function (token) {

    tokenStorage = token;
    return Promise.resolve();
};

module.exports.getToken = function () {

    if (tokenStorage) {
        return Promise.resolve(tokenStorage);
    }

    return Promise.reject(new Error('Token not found, re-authenticate.'));
};
