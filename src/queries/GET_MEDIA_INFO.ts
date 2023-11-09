export const GET_MEDIA_INFO = `
query ($id: Int) {
    Media(id: $id) {
        idMal
        id
        type
        title {
            romaji
            english
            native
        }
        coverImage {
            extraLarge
            large
            color
        }
        bannerImage
        description
        episodes
        nextAiringEpisode {
            episode
            airingAt
            timeUntilAiring
        }
        averageScore
        popularity
        status
        startDate {
            year
        }
        duration
        studios {
            nodes{
            name
        }
        }
        genres
        relations {
            edges {
                relationType
                node {
                    id
                type
                status
                title {
                    romaji
                    english
                    userPreferred
                }
                coverImage {
                    extraLarge
                    large
                    color
                }
                }
            }
        }
        recommendations {
                nodes {
                    mediaRecommendation {
                        id
                        title {
                            romaji
                        }
                        coverImage {
                            extraLarge
                            large
                        }
                        episodes
                        status
                        format
                        description
                        genres
                    }
            }
        }
    }
}
`;
