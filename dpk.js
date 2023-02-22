const crypto = require("crypto");

// This is a cleaner version of the deterministicPartionKey function. The first way this is an improvement is by avoiding 
// many nested if statements. Nested if statements can make the code hard to look at because of the additional context of 
// keeping track of the state within any given if statement. By having all the if statements at the top level, we avoid this.
// An additional way why this code is an improvement is through the use of early return statements. When debugging this code,
// we can confidently determine the output at the early return without having to trace through the rest of the code that may
// or may not affect the eventual output. Finally, this code is more readable because of the addition of comments. Comments 
// help to explain what is going on in the code more quickly, even if the code is fairly straightforward. 


// event that may include a partitionKey property
//returns the partitionKey for a given input 
exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;

  //if no event, return trivial partition key
  if(!event){
    return TRIVIAL_PARTITION_KEY;
  } 
  //if no partitionKey, return stringified event
  if(!event.partitionKey){
    let stringified = JSON.stringify(event);
    return crypto.createHash("sha3-512").update(stringified).digest("hex");
  }

  //candidate partition key is either already a string or needs to be converted to a string 
  let candidate;
  if(typeof event.partitionKey !== 'string'){
    candidate = JSON.stringify(event.partitionKey);
  } else {
    candidate = event.partitionKey;
  }

  //if candidate isn't too long, return candidate 
  if(candidate.length <= MAX_PARTITION_KEY_LENGTH){
    return candidate;
  }
  //in this case, candidate is too long, so we need to take a hash of the candidate
  return crypto.createHash("sha3-512").update(candidate).digest("hex");

}
  

