'use strict';

exports.register = function (server, options, next) {

    server.route({
        method: '*',
        path: '/',
        config: {
            auth: 'slack',
            handler: function (request, reply) {

                const account = request.auth.credentials;
                const profile = account.profile;

                request.server.log([
                        'oauth', 'slack'
                    ], { slackTeamUrl: account.profile.raw.url });

                return request.server.methods.models.slack.saveToken(profile.access_token)
                    .then(() => {

                        reply.redirect('/authenticate/success');
                    })
                    .catch(reply);
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/success',
        handler: function (request, reply) {

            reply('SUCCESS');
        }
    });

    next();
};

exports.register.attributes = {
    name: 'authenticate'
};
