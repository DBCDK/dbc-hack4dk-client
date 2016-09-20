/**
 * @file: This is a sample client created for use during Hack4DK 2016. It uses a test version of the Open Platform as a datasource.
 */

// Third party modules
const request = require('superagent');

// Variables relating to contact with the server
const token = 'a4516e74f16b7b2d3f7f3eb6cac35b2b07575345'; // This token expires shortly after Hack4DK
const base = 'https://openplatform.dbc.dk/v1';

// some default values
const dFields = [];
const dPretty = true;
const dPids = [];
const dQ = '"unix"';
const dOffset = 0;
const dLimit = 10;
const dSort = 'rank_frequency';
const dAgencyIds = [];
const dBranchIds = [];
const dLikes = [];
const dDislikes = [];
const dKnown = [];
const dDiscard = [];

/**
 * Internal method used to call the open platform to reduce code duplication.
 * @param {String}url
 * @param {Object}req
 * @returns {Promise}
 */
function opr(url = '', req = {}) {
  return new Promise((resolve, reject) => {
    request
      .post(`${base}${url}`)
      .send(req)
      .set({
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      })
      .end((err, res) => {
        if (err || !res.ok) {
          reject(err || !res.ok);
        }
        else {
          resolve(res.body);
        }
      });
  });
}

/**
 *
 * @param {Array}fields
 * @param {Boolean}pretty
 * @param {Array}pids
 * @returns {Promise}
 */
function work(fields = dFields, pretty = dPretty, pids = []) {
  return opr('/work', {
    fields,
    pretty,
    pids
  });
}

/**
 *
 * @param {Array}fields
 * @param {Boolean}pretty
 * @param {String}q
 * @param {Int}offset
 * @param {Int}limit
 * @param {String}sort
 * @returns {Promise}
 */
function search(fields = dFields, pretty = dPretty, q = dQ, offset = dOffset, limit = dLimit, sort = dSort) {
  return opr('/search', {
    fields,
    pretty,
    q,
    offset,
    limit,
    sort
  });
}

/**
 *
 * @param {Array}fields
 * @param {Boolean}pretty
 * @param {String}q
 * @param {Int}limit
 * @returns {Promise}
 */
function facets(fields = dFields, pretty = dPretty, q = dQ, limit = dLimit) {
  return opr('/facets', {
    fields,
    pretty,
    q,
    limit
  });
}

/**
 *
 * @param {Array}fields
 * @param {Boolean}pretty
 * @param {Array}agencyIds
 * @param {Array}branchIds
 * @returns {Promise}
 */
function libraries(fields = dFields, pretty = dPretty, agencyIds = dAgencyIds, branchIds = dBranchIds) {
  return opr('/libraries', {
    fields,
    pretty,
    agencyIds,
    branchIds
  });
}

/**
 *
 * @param {Array}fields
 * @param {Boolean}pretty
 * @param pids
 * @param {String}recommender
 * @param {Array}like
 * @param {Array}dislike
 * @param {Array}known
 * @param {Int}limit
 * @returns {Promise}
 */
function rank(fields = dFields, pretty = dPretty, pids = dPids, recommender = dRecommender, like = dLikes, dislike = dDislikes, known = dKnown, limit = dLimit) {
  return opr('/rank', {
    fields,
    pretty,
    recommender,
    like,
    dislike,
    known,
    limit
  });
}

/**
 *
 * @param {Array}fields
 * @param {Boolean}pretty
 * @param {String}recommender
 * @param {Array}like
 * @param {Array}dislike
 * @param {Array}known
 * @param {Array}discard
 * @param {Int}limit
 * @returns {Promise}
 */
function recommend(fields = dFields, pretty = dPretty, like = dLikes, dislike = dDislikes, known = dKnown, discard = dDiscard, limit = dLimit) {
  return opr('/recommend', {
    fields,
    pretty,
    recommender: 'default',
    like,
    dislike,
    known,
    discard,
    limit
  });
}

/**
 *
 * @param {Array}fields
 * @param {Boolean}pretty
 * @param {String}recommender
 * @param {Array}like
 * @param {Array}dislike
 * @param {Array}known
 * @param {Array}discard
 * @param {Int}limit
 * @returns {Promise}
 */
function popRecommend(fields = dFields, pretty = dPretty, like = dLikes, dislike = dDislikes, known = dKnown, discard = dDiscard, limit = dLimit) {
  return opr('/recommend', {
    fields,
    pretty,
    recommender: 'popular',
    like,
    dislike,
    known,
    discard,
    limit
  });
}

/**
 *
 * @param {Array}fields
 * @param {Boolean}pretty
 * @param {String}q
 * @param {Int}limit
 * @returns {Promise}
 */
function librarySuggest(fields = dFields, pretty = dPretty, q = dQ, limit = dLimit) {
  return opr('/suggest', {
    fields,
    pretty,
    q,
    limit,
    type: 'library'
  });
}

/**
 *
 * @param {Array}fields
 * @param {Boolean}pretty
 * @param {String}q
 * @param {Int}limit
 * @returns {Promise}
 */
function titleSuggest(fields = dFields, pretty = dPretty, q = dQ, limit = dLimit) {
  return opr('/suggest', {
    fields,
    pretty,
    q,
    limit,
    type: 'title'
  });
}

/**
 *
 * @param {Array}fields
 * @param {Boolean}pretty
 * @param {String}q
 * @param {Int}limit
 * @returns {Promise}
 */
function subjectSuggest(fields = dFields, pretty = dPretty, q = dQ, limit = dLimit) {
  return opr('/suggest', {
    fields,
    pretty,
    q,
    limit,
    type: 'subject'
  });
}

/**
 *
 * @param {Array}fields
 * @param {Boolean}pretty
 * @param {String}q
 * @param {Int}limit
 * @returns {Promise}
 */
function creatorSuggest(fields = dFields, pretty = dPretty, q = dQ, limit = dLimit) {
  return opr('/suggest', {
    fields,
    pretty,
    q,
    limit,
    type: 'creator'
  });
}

// Export the available methods.
module.exports = {
  work,
  search,
  facets,
  libraries,
  rank,
  recommend,
  librarySuggest,
  titleSuggest,
  subjectSuggest,
  creatorSuggest
};
