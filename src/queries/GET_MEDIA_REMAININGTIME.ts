export const GET_MEDIA_REMAINING_TIME = `
query ($id: Int) {
    Media(id: $id) {
        nextAiringEpisode {
            timeUntilAiring
        }
    }
}
`;
