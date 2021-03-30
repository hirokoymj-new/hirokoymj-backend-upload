const { GraphQLUpload } = require("graphql-upload");
const path = require("path");
const fs = require("fs");

const Photo = require("../database/models/photo");

const generateRandomString = (length) => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

module.exports = {
  Upload: GraphQLUpload,

  Query: {
    uploads: (parent, args) => {},
    photos: async (_, { location }) => {
      try {
        const result = await Photo.find({
          location,
        });
        return result;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
  Mutation: {
    singleUpload: async (parent, { file, location }) => {
      const { filename, createReadStream } = await file;
      const { ext } = path.parse(filename);
      const randomName = generateRandomString(12) + ext;

      const stream = createReadStream();
      const pathName = path.join(__dirname, `../public/images/${randomName}`);
      await stream.pipe(fs.createWriteStream(pathName));

      const newPhoto = new Photo({ fileName: randomName, location });
      const result = await newPhoto.save();
      const url = `${process.env.HOST}images/${randomName}`;

      return {
        url,
      };
    },
  },
};
