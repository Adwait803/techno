const ContentBasedRecommender = require('../index.js');
const posts = require('../fixtures/sample-documents');
const tags = require('../fixtures/sample-document-tags');


const tagMap = tags.reduce((acc, tag) => {
  acc[tag.id] = tag;
  return acc;
}, {});

const recommender = new ContentBasedRecommender();

recommender.trainBidirectional(posts, tags);
var psts = [];
for (let post of posts) {
  const relatedTags = recommender.getSimilarDocuments(post.id);
  const tags = relatedTags.map(t => tagMap[t.id].content);
  if (tags.length > 0) {
    psts.push({posts: post.id,posts: post.content});
  }
  
  
  var fs = require('fs');

  
  var json = JSON.stringify(psts);

  fs.writeFile("output.json", json, 'utf8', function (err) {
    if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
    }});
}


