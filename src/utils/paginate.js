const paginate = (data) => {
  return {
    items: data.docs,
    limit: data.limit,
    total_items: data.totalDocs,
    current_page: data.page,
    total_pages: data.totalPages
  }
}

export default {
  paginate
}