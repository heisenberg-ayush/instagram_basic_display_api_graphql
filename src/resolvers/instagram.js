const { UserInputError } = require("apollo-server-express");
const { get } = require("axios").default;
const { post } = require("request");
const { promisify } = require("util");
require("dotenv").config();

const postAsync = promisify(post);

async function getShortLivedAccessToken() {
    // sending the request.
    let { body, statusCode } = await postAsync({
        url: `https://api.instagram.com/oauth/access_token `,
        formData: {
            client_id: process.env.INSTAGRAM_APP_ID,
            client_secret: process.env.INSTAGRAM_APP_SECRET,
            redirect_uri: "https://httpstat.us/200",
            code: process.env.AUTHORIZATION_CODE,
            grant_type: "authorization_code",
        },
        headers: {
            "content-type": "multipart/form-data",
            host: "api.instagram.com",
        },
    });

    // getting the response.
    let response = JSON.parse(body);

    // checking the status code for error.
    if (statusCode !== 200) {
        let error_message = response.error_message;
        // if error exists, sending the error.
        return new UserInputError(error_message);
    }

    // if no error exists, returning the response.
    return response;
}

// getting a long lived access token
async function getLongLivedAccessToken() {
    let response;

    try {
        // send a request to the API
        response = await get("https://graph.instagram.com/access_token", {
            params: {
                grant_type: "ig_exchange_token",
                client_secret: process.env.INSTAGRAM_APP_SECRET,
                access_token: process.env.SHORT_LIVED_AT,
            },
            headers: {
                host: "graph.instagram.com",
            },
        });
    } catch (error) {
        // If an error occurs, return it.
        return new UserInputError(error);
    }

    // If no error, get the response and return it.
    response = response["data"];
    return response;
}

// getting profile data
async function getProfileData() {
    let response;
    // send request to the API
    try {
        response = await get("https://graph.instagram.com/me", {
            params: {
                fields: "id,username,media_count,account_type",
                access_token: process.env.LONG_LIVED_AT,
            },
            headers: {
                host: "graph.instagram.com",
            },
        });
    } catch (error) {
        // catch and return the error
        return new UserInputError(error);
    }

    // get the data and return it.
    response = response["data"];
    return response;
}

// getting media data
async function getUserMediaData() {
    let response;

    // sending request to API
    try {
        response = await get("https://graph.instagram.com/me/media", {
            params: {
                fields: "id,caption,media_url,media_type,children,permalink,thumbnail_url,timestamp,username",
                access_token: process.env.LONG_LIVED_AT,
            },
            headers: {
                host: "graph.instagram.com",
            },
        });
    } catch (error) {
        // Catching an error, and returning it.
        return new UserInputError(error);
    }

    // If no error, returning the response.
    response = response["data"];
    return response.data;
}

module.exports = {
    getShortLivedAccessToken,
    getLongLivedAccessToken,
    getProfileData,
    getUserMediaData,
};