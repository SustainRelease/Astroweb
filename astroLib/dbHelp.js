
function orQuery (keyName, valArray) {
  var bQuery = {
    "$or": [{}]
  }
  bQuery["$or"] = valArray.map(function (val) {
    return {[keyName]: val}
  })
  return bQuery;
}

module.exports.orQuery = orQuery;
