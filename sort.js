const IsParentIncluded = (sorted, parent) => {
  for (let p of parent) {
    if (!sorted.includes(p)) {
      return false;
    }
  }
  return true;
}

exports.execute = (tables) => {

  // Funny part, solving the dependency
  // Dont assume a starting point: let's check for all the tables without a parent
  let sorted = tables.filter(t => !t.parent).map(t => t.name);
  let unsorted = tables.filter(t => t.parent);

  // For each element on unsortedTables, check if its parents have been sorted already
  // Iterate until unsortedTables length is 0 or when stuff cant be sorted or when sortedTables has length == 0
  while (unsorted.length > 0) {
    for (let us of unsorted) {
      if (IsParentIncluded(sorted, us.parent)) {
        // Push element to sorted array
        sorted.push(us.name)
        // Remove element from unsorted
        unsorted = unsorted.filter(u => u.name !== us.name)
      }
    }
  }

  return sorted
}
