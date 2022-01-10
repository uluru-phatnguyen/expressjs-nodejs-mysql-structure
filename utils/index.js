/**
 * getRequestPagination
 * @param {Object} queryString
 *
 * @returns {Object} { limit, offset, page }
 */
const getRequestPagination = (queryString) => {
  let limit = parseInt(queryString?.limit ?? 100);
  limit = !isNaN(limit) && limit > 0 ? limit : null;

  let page = parseInt(queryString?.page ?? 1);
  page = !isNaN(page) && page > 0 ? page : 1;

  const offset = limit ? limit * (page - 1) : null;

  return { limit, offset, page };
};

module.exports = {
  getRequestPagination,
};
