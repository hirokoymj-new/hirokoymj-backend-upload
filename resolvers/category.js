const Category = require("../database/models/category");

module.exports = {
  Query: {
    categories: async (_, { cursor, limit = 10, filter }) => {
      try {
        let query = {};

        query = {
          ...query,
          ...(filter && { _id: { $in: [...filter] } }),
          ...(cursor && { _id: { $lt: cursor } }),
        };
        let categories = await Category.find(query)
          .sort({ _id: -1 })
          .limit(limit + 1);

        const hasNextPage = categories.length > limit;
        categories = hasNextPage ? categories.slice(0, -1) : categories;

        const totalCount = await Category.countDocuments();

        return {
          categoryFeed: categories,
          totalCount,
          pageInfo: {
            endCursor: hasNextPage
              ? categories[categories.length - 1].id
              : null,
            hasNextPage,
          },
        };
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    categoryById: (_, { id }) => {
      const category = Category.findById(id);
      return category;
    },
    categoryAll: async () => {
      try {
        const category = await Category.find().sort({ name: "asc" });
        return category;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
  Mutation: {
    createCategory: async (_, { input }) => {
      try {
        const newCategory = new Category({ ...input });
        const result = await newCategory.save();
        return result;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    updateCategory: async (_, { id, input }) => {
      try {
        const category = await Category.findByIdAndUpdate(
          id,
          { ...input },
          { new: true }
        );
        return category;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    deleteCategory: async (_, { id }) => {
      try {
        const category = await Category.findByIdAndDelete(id);
        return category;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
};
