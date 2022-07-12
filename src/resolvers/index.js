// get the defined function(s)
const {
    getShortLivedAccessToken,
    getLongLivedAccessToken,
    getProfileData,
    getUserMediaData,
} = require("./instagram");

// general query object
const Query = {
    Query: {
        getShortLivedAccessToken: () => getShortLivedAccessToken(),
        getLongLivedAccessToken: () => getLongLivedAccessToken(),
        getProfileData: () => getProfileData(),
        getUserMediaData: () => getUserMediaData(),
    },
};

// export the Query object
module.exports = Query;