const request = require('request');

const { generateHistoryOffsets } = require('./uber-utils');

class UberClient {
    constructor () {
        this.client_id = process.env.CLIENT_ID;
        this.client_secret = process.env.CLIENT_SECRET;
        this.server_token = process.env.SERVER_TOKEN;
        this.redirect_uri = process.env.REDIRECT_URI;

        this.uber_login_endpoint = `https://login.uber.com/oauth/v2/authorize?response_type=code&client_id=${this.client_id}&scope=profile%20profile%20history&redirect_uri=${this.redirect_uri}`;
        this.uber_token_endpoint = 'https://login.uber.com/oauth/v2/token';
        this.uber_base_endpoint = 'https://api.uber.com/v1.2';
    }

    createAccessToken (code) {
        return getAccessToken(code)
            .then((response) => {
                const { access_token } = response;

                return access_token;
            });
    }

    getAccessToken (code) {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            form: { 
                code,
                client_id: this.client_id,
                client_secret: this.client_secret,
                redirect_uri: this.redirect_uri,
                grant_type: 'authorization_code'
            },
        }

        return new Promise((resolve, reject) => {
            request(this.uber_token_endpoint, options, (error, response, body) => {
                if (error) {
                    return reject(error);
                }
                resolve(JSON.parse(body));
            });
        });
    }

    getEndpoint (endpoint, accessToken) {
        const options = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Accept-Language': 'en_US',
                'Content-Type': 'application/json'
            },
        }

        return new Promise((resolve, reject) => {
            request(`${this.uber_base_endpoint}/${endpoint}`, options, (error, response, body) => {
                if (error) {
                    return reject(error);
                }
                resolve(JSON.parse(body));
            });
        });
    }

    getMe (accessToken) {
        return this.getEndpoint('me', accessToken);
    }

    getHistory (offset, accessToken) {
        return this.getEndpoint(`history?limit=50&offset=${offset}`, accessToken);
    }

    getAllRides (accessToken) {
        return this.getHistory(0, accessToken)
            .then((response) => {
                const { history, count } = response;
                const remainingHistories = this.getRemainingHistories(count, accessToken);
                remainingHistories.unshift(history);

                return Promise.all(remainingHistories);
            })
            .then((results) => {
                return results.reduce((trips, result) => trips.concat(result.history));
            });
    }

    getRemainingHistories (count, accessToken) {
        return generateHistoryOffsets(count).map((offset) => this.getHistory(offset, accessToken));
    }
}

module.exports = new UberClient();
