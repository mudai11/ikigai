/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "gogocdn.net",
      "img.flawlessfiles.com",
      "image.tmdb.org",
      "s4.anilist.co",
      "i.redd.it",
      "res.cloudinary.com",
    ],
  },
  staticPageGenerationTimeout: 1000,
};

module.exports = nextConfig;
