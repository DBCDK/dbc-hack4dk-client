# dbc-hack4dk-client
This is a client written for use during Hack4DK 2016.
Don't forget to read the DBC readme for terms of use during Hack4DK 2016, you can find them here.

## Up and running
This library has two approaches, either you can import it directly as a node js module, or you can include it in a script tag.

### In the browser
A browser bundle can be found in the bin folder of this repository, this module writes an object to window.OpenPlatform that includes all the supported methods.
You can also find the bundled module via this URL: https://s3-eu-west-1.amazonaws.com/hack4dk/dbc.hack4dk.bundle.js

### Via NPM
You can get this module via npm, just run: `npm i --save dbc-hack4dk`

## Supported methods
You can see documentation for the supported methods in the API by visiting [the API](https://openplatform.dbc.dk/v1/).
The implemented methods are documented here. All methods accepts null as a valid argument for non-required fields.
The first arguments of all methods is the fields argument, this specifies what fields to include (these vary depending on api endpoint).
All the methods return a promise, read more about promises [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).

### search
The search method searches via OpenPlatform in a database of materials (mostly books, movies, music, etc.).

Arguments:
 * {Array} fields - Used to include or exclude fields as defined by the API
 * {String} q - A CQL query to search with.
 * {Int} offset - Starting index.
 * {Int} limit - How many results to return.
 * {String} sort - Which sorting algorithm to use.

Example:
```javascript
// the null here represents default fields, and we query for materials matching "Unix".
OpenPlatform.search(null, 'Unix').then(results => {
  results.data.forEach(material => {
    console.log(material);
  });
});
```

### work
The work methods gets a work from a PID. This is often used in conjunction with search or recommend.
Get a list of available fields for work [here](https://github.com/DBCDK/serviceprovider/blob/master/doc/work-context.jsonld).

Arguments:
 * {Array} fields - Used to include or exclude fields as defined by the API
 * {Array} pids - An array of pids to get.

Example:
```javascript
// We ask OpenPlatform to get a work with PID "870970-basis:04260864", but we only want the PID, the title and the extent.
OpenPlatform.work(['pid', 'titleFull', 'extent'], ['870970-basis:04260864']).then(results => {
  const upp = results.data[0];
  console.log(upp);
});
```

### facets
The facets method gets the facets associated with a query, these can be used in CQL to limit a search.

Arguments:
 * {Array} fields - Used to include or exclude fields as defined by the API
 * {String} q - A CQL query to search with.
 * {Int} limit - How many results to return.

Example:
```javascript
OpenPlatform.facets(null, 'Unix').then(results => {
  const creators = results.data.creator;
  console.log(creators);

  const years = results.data.date;
  console.log(years);

  const form = results.data.form;
  console.log(form);

  const language = results.data.language;
  console.log(language);

  const subjects = results.data.subject;
  console.log(subjects);
});
```

### libraries
This method lists libraries, if you don't provide any arguments you get all of them. You can filter the libraries by library id.

Arguments:
 * {Array} fields - Used to include or exclude fields as defined by the API
 * {Array} agencyIds - A list of agency identifiers to include.
 * {Array} branchIds - A list of branch identifiers to include.

Example:
```javascript
OpenPlatform.libraries().then(results => {
  const firstLibrary = results.data[0].agencyName;
  console.log(firstLibrary);
});
```

### rank
This method ranks an array of Pids based on a recommender.

Arguments:
 * {Array} fields - Used to include or exclude fields as defined by the API
 * {Array} pids - An array of pids to rank.
 * {String} recommender - Name of the recommender you want to use.
 * {Array} like - An array of pids the user likes.
 * {Array} dislike - An array of pids the user dislikes.
 * {Array} known - An array of pids that the user has shown interest in.
 * {Int} limit - How many results to return.

Example:
```javascript
OpenPlatform.rank(
  null, // Get default fields
  ['870970-basis:07227752', '870970-basis:08005133', '870970-basis:04090977', '870970-basis:40547509'], // Pids to rank
  'popular', // Use the pop recommender
  ['870970-basis:41974745', '870970-basis:40547509'] // my likes
).then(results => {
  results.data.forEach(pid => console.log(pid));
});
```

### recommend
This method recommends works based on pids.

Arguments:
 * {Array} fields - Used to include or exclude fields as defined by the API
 * {Array} like - An array of pids the user likes.
 * {Array} dislike - An array of pids the user dislikes.
 * {Array} known - An array of pids that the user has shown interest in.
 * {Array} discard - An array of pids to discard from any results.
 * {Int} limit - How many results to return.

Example:
```javascript
OpenPlatform.recommend(
  null, // Get default fields
  ['870970-basis:28290853', '870970-basis:52085330'] // my likes
).then(results => {
  results.data.forEach(briefWork => {
    console.log(`${briefWork.pid}: ${briefWork.title}`);
  });
});
```

### popRecommend
This method recommends works based on pids, but it uses a different recommender engine.

Arguments:
 * {Array} fields - Used to include or exclude fields as defined by the API
 * {Array} like - An array of pids the user likes.
 * {Array} dislike - An array of pids the user dislikes.
 * {Array} known - An array of pids that the user has shown interest in.
 * {Array} discard - An array of pids to discard from any results.
 * {Int} limit - How many results to return.

Example:
```javascript
OpenPlatform.popRecommend(
  null, // Get default fields
  ['870970-basis:28290853', '870970-basis:52085330'] // my likes
).then(results => {
  results.data.forEach(briefWork => {
    console.log(`${briefWork.pid}: ${briefWork.title}`);
  });
});
```

### librarySuggest
This method suggest libraries based on a query.

Arguments:
 * {Array} fields - Used to include or exclude fields as defined by the API
 * {String} q - A string query to suggest upon.
 * {Int} limit - How many results to return.

Example:
```javascript
OpenPlatform.librarySuggest(['branchId', 'term'], 'Alberts').then(results => {
  results.data.forEach(library => {
    console.log(`${library.branchId}: ${library.term}`);
  });
});
```

### titleSuggest
This method suggests works based on a query.

Arguments:
 * {Array} fields - Used to include or exclude fields as defined by the API
 * {String} q - A string query to suggest upon.
 * {Int} limit - How many results to return.

Example:
```javascript
OpenPlatform.titleSuggest(['pid', 'term'], 'Harry').then(results => {
  results.data.forEach(work => {
    console.log(`${work.pid}: ${work.term}`);
  });
});
```

### subjectSuggest
This method suggests subjects based on a query.

Arguments:
 * {Array} fields - Used to include or exclude fields as defined by the API
 * {String} q - A string query to suggest upon.
 * {Int} limit - How many results to return.

Example:
```javascript
OpenPlatform.subjectSuggest(['term'], 'Harry').then(results => {
  results.data.forEach(subject => {
    console.log(`${subject.term}`);
  });
});
```

### creatorSuggest
This method suggests authors and creators based on a query.

Arguments:
 * {Array} fields - Used to include or exclude fields as defined by the API
 * {String} q - A string query to suggest upon.
 * {Int} limit - How many results to return.

Example:
```javascript
OpenPlatform.creatorSuggest(['term'], 'Harry').then(results => {
  results.data.forEach(creator => {
    console.log(`${creator.term}`);
  });
});
```

## How do I get permanent access?
If you build a killer app or site during Hack4DK, or even just something for fun, don't be afraid to request permanent access to the API.
Currently we have two entryways into the system, either you can go to your local library, and request access via them, or you can apply through DDB (Danskernes Digitale Bibliotek).
