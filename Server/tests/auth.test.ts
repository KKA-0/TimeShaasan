import {describe, expect, test, beforeEach} from '@jest/globals';
const request = require('supertest');
const app = require('./../server')

describe('Auth Tests', () => {

    // beforeEach(() => {

    // });

    test('POST /user', () => {
        
        // 
        request(app)
            .post('/user')
            .expect('Content-Type', /json/)
            .expect('Content-Length', '30')
            .expect(200)
            .end(function(err, res) {
                if (err) throw err;
            });
    });
  });