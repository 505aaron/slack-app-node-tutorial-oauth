'use strict';

const Confidence = require('confidence');
const Config = require('./config');


const criteria = {
    env: process.env.NODE_ENV
};


const manifest = {
    $meta: 'This file defines the server configuration, connections, and plugin registrations.',
    server: {
        debug: {
            request: ['error']
        },
        connections: {
            routes: {
                security: true
            }
        }
    },
    connections: [{
        port: Config.get('/port/api'),
        labels: ['api']
    }],
    registrations: [
        {
            plugin: 'bell'
        },
        {
            plugin: 'hapi-auth-cookie'
        },
        {
            plugin: {
                register: './authProviders',
                options: {
                    $filter: 'env',
                    test: {
                        cookiePassword: 'a_test_password_for_bell',
                        slackSecret: 'supersecret',
                        slackClientId: 'myspecialidentifier',
                        slackVerificationToken: 'mytoken'
                    },
                    $default: {
                        cookiePassword: process.env.COOKIE_PASSWORD,
                        slackSecret: process.env.SLACK_SECRET,
                        slackClientId: process.env.SLACK_CLIENT_ID,
                        slackVerificationToken: process.env.SLACK_VERIFICATION_TOKEN
                    }
                }
            }
        },
        {
            plugin: {
                register: 'hapi-methods-injection',
                options: {
                    relativeTo: __dirname,
                    methods: [
                        {
                            prefix: 'models',
                            path: './server/models'
                        }
                    ]
                }
            }
        },
        {
            plugin: './server/api/'
        },
        {
            plugin: './server/api/authenticate',
            options: {
                routes: {
                    prefix: '/authenticate'
                }
            }
        }
    ]
};


const store = new Confidence.Store(manifest);


exports.get = function (key) {

    return store.get(key, criteria);
};


exports.meta = function (key) {

    return store.meta(key, criteria);
};
