const isParentIncluded = (sorted, master) => {
  for (const p of master) {
    if (!sorted.includes(p)) {
      return false;
    }
  }
  return true;
};

const execute = (tables, master = 'master', name = 'name') => {
  // Funny part, solving the dependency
  // Dont assume a starting point: let's check for all the tables without a master
  const sorted = tables.filter(t => !t[master]).map(t => t[name]);
  let unsorted = tables.filter(t => t[master]);

  if (sorted.length === tables.length) {
    return { order: sorted };
  }

  // For each element on unsortedTables, check if its masters have been sorted already
  // Iterate until unsortedTables length is 0 or when stuff cant be sorted or when
  // sortedTables has length == 0
  while (unsorted.length > 0) {
    for (const us of unsorted) {
      if (isParentIncluded(sorted, us[master])) {
        // Push element to sorted array
        sorted.push(us[name]);
        // Remove element from unsorted
        unsorted = unsorted.filter(u => u[name] !== us[name]);
      }
    }
  }

  return { order: sorted };
};

module.exports = {
  isParentIncluded,
  execute,
};
