const Category = require("../database/models/category");
const SubCategory = require("../database/models/subCategory");
const Topic = require("../database/models/topic");

module.exports = {
  Query: {
    topics: async (_, { cursor, limit = 10, filter }) => {
      try {
        let query = {};

        query = {
          ...query,
          ...(filter && { category: { $in: [...filter] } }),
          ...(cursor && { _id: { $lt: cursor } }),
        };
        let topics = await Topic.find(query)
          .sort({ _id: -1 })
          .limit(limit + 1);
        const hasNextPage = topics.length > limit;
        topics = hasNextPage ? topics.slice(0, -1) : topics;

        const totalCount = await Topic.countDocuments();
        return {
          topicFeed: topics,
          totalCount,
          pageInfo: {
            endCursor: hasNextPage ? topics[topics.length - 1].id : null,
            hasNextPage,
          },
        };
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    topicById: (_, { id }) => {
      const topic = Topic.findById(id);
      return topic;
    },
    topicByCategory: (_, { categoryId }) => {
      const topicArray = Topic.find({ category: categoryId });
      return topicArray;
    },
    topicByCategoryAbbr: async (_, { abbr }) => {
      try {
        const { id } = await Category.findOne({ abbr });
        const topics = await Topic.find({ category: id });
        return topics;
      } catch (error) {
        console.log(error);
      }
    },
  },
  Mutation: {
    createTopic: async (_, { input }) => {
      try {
        const topic = new Topic({ ...input });
        const result = await topic.save();
        return result;
      } catch (error) {
        console.log(error);
      }
    },
    deleteTopic: async (_, { id }) => {
      try {
        const topic = await Topic.findByIdAndDelete(id);
        return topic;
      } catch (error) {
        console.log(error);
      }
    },
    updateTopic: async (_, { id, input }) => {
      try {
        const topic = await Topic.findByIdAndUpdate(
          id,
          { ...input },
          { new: true }
        );
        return topic;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
  // Field Level Resolver
  Topic: {
    category: async (parent) => {
      const category = await Category.findById(parent.category);
      return category;
    },
    subCategory: async (parent) => {
      const subCategory = await SubCategory.findById(parent.subCategory);
      return subCategory;
    },
  },
};
