'use strict';

exports.register = function (server, options, next) {

    server.route({
        method: 'GET',
        path: '/',
        config: {
            handler: function (request, reply) {

                return request.server.methods.models.slack.getToken().then((token) => {

                    return fetch(`https://slack.com/api/team.info?token=${token}`);
                }).then((response) => {

                    return reply(response.json());
                }).catch(reply);
            }
        }
    });

    next();
};

exports.register.attributes = {
    name: 'api'
};
