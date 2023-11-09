export const advance = `
      query ($search: String, $type: MediaType, $status: MediaStatus, $genres: [String], $format: [MediaFormat], $tags: [String], $sort: [MediaSort], $page: Int, $perPage: Int) {
        Page (page: $page, perPage: $perPage) {
          pageInfo {
            total
            currentPage
            lastPage
            hasNextPage
          }
          media (search: $search, type: $type, status: $status, genre_in: $genres, format_in: $format, tag_in: $tags, sort: $sort, isAdult: false) {
            id
            title {
              english
              native 
              romaji
              userPreferred
            }
            type
            episodes
            status
            format
            season
            description
            genres
            coverImage {
              extraLarge
              color
            }
          }
        }
      }
    `;
