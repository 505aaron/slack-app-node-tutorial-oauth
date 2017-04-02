'use strict';

const Lab = require('lab');
const Config = require('../../../config');
const Hapi = require('hapi');
const FetchMock = require('fetch-mock');
const IndexPlugin = require('../../../server/api/index');
const Chai = require('chai');
const Sinon = require('sinon');
const SinonChai = require('sinon-chai');

const lab = (exports.lab = Lab.script());
const expect = Chai.expect;
Chai.use(SinonChai);

let request;
let server;
let slackMethods;

Sinon
    .assert
    .expose(Chai.assert, { prefix: '' });

lab.beforeEach((done) => {

    const plugins = [IndexPlugin];
    slackMethods = {
        getToken: Sinon.stub()
    };

    server = new Hapi.Server();

    server.method('models.slack.getToken', slackMethods.getToken);
    server.connection({
        port: Config.get('/port/api')
    });
    server.register(plugins, (err) => {

        if (err) {
            return done(err);
        }

        done();
    });
});

lab.after((done) => {

    FetchMock.restore();
    done();
});

lab
    .experiment('Index Plugin', () => {

        lab.beforeEach((done) => {

            request = {
                method: 'GET',
                url: '/'
            };

            done();
        });

        lab.test('it errors when no token', (done) => {

            server.methods.models.slack.getToken.rejects();

            server.inject(request, (response) => {

                expect(response.statusCode)
                    .to
                    .equal(500);

                done();
            });
        });

        lab.test('it fetches the team when there is a token', (done) => {

            server.methods.models.slack.getToken.resolves('token');

            FetchMock.get('*', { test: 'Hello' });
            server.inject(request, (response) => {

                expect(response.statusCode)
                    .to
                    .equal(200);

                expect(response.result)
                    .to
                    .have
                    .property('test')
                    .and.to.equal('Hello');

                done();
            });
        });
    });
