/**
 * @file: This is a sample client created for use during Hack4DK 2016.
 * It uses a test version of the Open Platform as a datasource.
 */

// Third party modules
const request = require('superagent');

// Variables relating to contact with the server
const token = 'a4516e74f16b7b2d3f7f3eb6cac35b2b07575345'; // This token expires shortly after Hack4DK
const base = 'https://openplatform.dbc.dk/v1';

// some default values
const dFields = null;
const dPids = [];
const dQ = '"unix"';
const dOffset = 0;
const dLimit = 10;
const dSort = 'rank_frequency';
const dAgencyIds = null;
const dBranchIds = null;
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
    const payload = {};
    Object.keys(req).forEach(objectKey => {
      const v = req[objectKey];
      if (v || typeof v === typeof false) {
        payload[objectKey] = v;
      }
    });

    request
      .post(`${base}${url}?access_token=${token}`)
      // .set('Content-Type', 'application/json')
      .send(payload)
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
 * Gets one or more works from an array for Primary object Identifiers (Get these from search or recommend).
 * @param {Array}fields
 * @param {Array}pids
 * @returns {Promise}
 */
function work(fields = dFields, pids = []) {
  return opr('/work', {
    fields,
    pids
  });
}

/**
 * Searches works based on CQL query.
 * @param {Array}fields
 * @param {String}q
 * @param {Int}offset
 * @param {Int}limit
 * @param {String}sort
 * @returns {Promise}
 */
function search(fields = dFields, q = dQ, offset = dOffset, limit = dLimit, sort = dSort) {
  return opr('/search', {
    fields,
    q,
    offset,
    limit,
    sort
  });
}

/**
 * Gets facets for a CQL query
 * @param {Array}fields
 * @param {String}q
 * @param {Int}limit
 * @returns {Promise}
 */
function facets(fields = dFields, q = dQ, limit = dLimit) {
  return opr('/facets', {
    fields,
    q,
    limit
  });
}

/**
 * Gets a list of danish Libraries, reduces list by agency or branch ids.
 * @param {Array}fields
 * @param {Array}agencyIds
 * @param {Array}branchIds
 * @returns {Promise}
 */
function libraries(fields = dFields, agencyIds = dAgencyIds, branchIds = dBranchIds) {
  return opr('/libraries', {
    fields,
    agencyIds,
    branchIds
  });
}

/**
 * Ranks an array of pids based on recommender logic.
 * @param {Array}fields
 * @param {Array}pids
 * @param {String}recommender
 * @param {Array}like
 * @param {Array}dislike
 * @param {Array}known
 * @param {Int}limit
 * @returns {Promise}
 */
function rank(fields = dFields, pids = dPids, recommender = 'default', like = dLikes, dislike = dDislikes, known = dKnown, limit = dLimit) {
  return opr('/rank', {
    fields,
    pids,
    recommender,
    like,
    dislike,
    known,
    limit
  });
}

/**
 * Recommends works based on likes or dislikes.
 * @param {Array}fields
 * @param {Array}like
 * @param {Array}dislike
 * @param {Array}known
 * @param {Array}discard
 * @param {Int}limit
 * @returns {Promise}
 */
function recommend(fields = dFields, like = dLikes, dislike = dDislikes, known = dKnown, discard = dDiscard, limit = dLimit) {
  return opr('/recommend', {
    fields,
    recommender: 'default',
    like,
    dislike,
    known,
    discard,
    limit
  });
}

/**
 * Recommends works based on popular titles.
 * @param {Array}fields
 * @param {Array}like
 * @param {Array}dislike
 * @param {Array}known
 * @param {Array}discard
 * @param {Int}limit
 * @returns {Promise}
 */
function popRecommend(fields = dFields, like = dLikes, dislike = dDislikes, known = dKnown, discard = dDiscard, limit = dLimit) {
  return opr('/recommend', {
    fields,
    recommender: 'popular',
    like,
    dislike,
    known,
    discard,
    limit
  });
}

/**
 * Suggests libraries based on a query.
 * @param {Array}fields
 * @param {String}q
 * @param {Int}limit
 * @returns {Promise}
 */
function librarySuggest(fields = dFields, q = dQ, limit = dLimit) {
  return opr('/suggest', {
    fields,
    q,
    limit,
    type: 'library'
  });
}

/**
 * Suggests work titles based on a query.
 * @param {Array}fields
 * @param {String}q
 * @param {Int}limit
 * @returns {Promise}
 */
function titleSuggest(fields = dFields, q = dQ, limit = dLimit) {
  return opr('/suggest', {
    fields,
    q,
    limit,
    type: 'title'
  });
}

/**
 * Suggests subjects based on a query.
 * @param {Array}fields
 * @param {String}q
 * @param {Int}limit
 * @returns {Promise}
 */
function subjectSuggest(fields = dFields, q = dQ, limit = dLimit) {
  return opr('/suggest', {
    fields,
    q,
    limit,
    type: 'subject'
  });
}

/**
 * Suggests authors or creators based on a query.
 * @param {Array}fields
 * @param {String}q
 * @param {Int}limit
 * @returns {Promise}
 */
function creatorSuggest(fields = dFields, q = dQ, limit = dLimit) {
  return opr('/suggest', {
    fields,
    q,
    limit,
    type: 'creator'
  });
}

// Export the available methods.
const methods = module.exports = {
  work,
  search,
  facets,
  libraries,
  rank,
  recommend,
  popRecommend,
  librarySuggest,
  titleSuggest,
  subjectSuggest,
  creatorSuggest
};

if (typeof window !== 'undefined') {
  window.OpenPlatform = methods;
}
