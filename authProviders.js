'use strict';
const Joi = require('joi');
const Hoek = require('hoek');

// Declare internals

const internals = {};

exports.register = function (server, options, next) {

    const results = Joi.validate(options, internals.schema);
    Hoek.assert(!results.error, results.error);

    const settings = results.value;

    server.auth.strategy('slack', 'bell', {
        provider: 'slack',
        password: settings.cookiePassword,
        clientId: settings.slackClientId,
        clientSecret: settings.slackSecret,
        forceHttps: true,
        isSecure: true,
        scope: ['team:read']
    });

    next();
};

exports.register.attributes = {
    name: 'authProviders'
};

internals.schema = Joi.object({
    cookiePassword: Joi.string().required(),
    slackClientId: Joi.string().required(),
    slackSecret: Joi.string().required(),
    slackVerificationToken: Joi.string().required()
}).required();
