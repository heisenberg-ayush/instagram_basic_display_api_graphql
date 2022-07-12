const { gql } = require("apollo-server-express");

const AccessTokenResponse = gql `
  type AccessTokenResponse {
    access_token: String!
    user_id: Float!
  }
`;

const LongLivedAccessToken = gql `
  type LongLivedAccessToken {
    access_token: String!
    token_type: String!
    expires_in: Float!
  }
`;

const ProfileData = gql `
  type ProfileData {
    account_type: String!
    id: String!
    media_count: Int!
    username: String!
  }
`;

const MediaData = gql `
  scalar Date
  type MediaData {
    caption: String
    id: String
    media_type: String
    media_url: String
    children: [MediaData]
    permalink: String
    thumbnail_url: String
    timestamp: Date
    username: String
  }
`;

const Query = gql `
  type Query {
    getShortLivedAccessToken: AccessTokenResponse
    getLongLivedAccessToken: LongLivedAccessToken
    getProfileData: ProfileData
    getUserMediaData: [MediaData]
  }
`;

module.exports = [
    AccessTokenResponse,
    LongLivedAccessToken,
    ProfileData,
    MediaData,
    Query,
];