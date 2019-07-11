const request = require('request');
const server = require('../../src/server');
const base = 'http://localhost:3000/';

describe('routes : static', () => {
    describe('GET /', () => {
        it('should return status code 200', (done) => {
            request.get(base, (err, res, body) => {
                expect(res.statusCode).toBe(200);
                done();
            });
        });
    });
    describe('GET /macro', () => {
        it('should return status code 200', (done) => {
            request.get('http://localhost:3000/marco', (err, res, body) => {
                expect(res.statusCode).toBe(200);
                done()
            })
        })
        it('should contain "polo" in response', (done) => {
            request.get('http://localhost:3000/marco', (err, res, body) => {
                expect(res.body).toContain('polo');
                done()
            })
        })
    })
});