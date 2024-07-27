const getSortCriteria = (sortQuery) => {
  const sortCriteria = {
    "by-newest-first": { createdAt: -1 },
    "by-oldest-first": { createdAt: 1 },
    "by-name": { title: 1 },
    "by-category": { category: 1 },
  };

  return sortCriteria[sortQuery] || {};
};

module.exports = {
  getSortCriteria,
}
