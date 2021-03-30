const Category = require("../database/models/category");
const SubCategory = require("../database/models/subCategory");

module.exports = {
  Query: {
    subCategories: async (_, { cursor, limit = 10, filter }) => {
      try {
        let query = {};

        query = {
          ...query,
          ...(filter && { category: { $in: [...filter] } }),
          ...(cursor && { _id: { $lt: cursor } }),
        };

        let subCategories = await SubCategory.find(query)
          .sort({ _id: -1 })
          .limit(limit + 1);

        const hasNextPage = subCategories.length > limit;
        subCategories = hasNextPage
          ? subCategories.slice(0, -1)
          : subCategories;

        const totalCount = await SubCategory.countDocuments();
        return {
          subCategoryFeed: subCategories,
          totalCount,
          pageInfo: {
            endCursor: hasNextPage
              ? subCategories[subCategories.length - 1].id
              : null,
            hasNextPage,
          },
        };
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    subCategoryById: (_, { id }) => {
      const subCategory = SubCategory.findById(id);
      return subCategory;
    },
    subCategoryByCategory: async (_, { categoryId }) => {
      try {
        const subCategoryArray = await SubCategory.find({
          category: categoryId,
        }).sort({ order: -1 });
        return subCategoryArray;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
  Mutation: {
    createSubCategory: async (_, { input }) => {
      try {
        const subCategory = new SubCategory({ ...input });
        const result = await subCategory.save();
        return result;
      } catch (error) {
        console.log(error);
      }
    },
    updateSubCategory: async (_, { id, input }) => {
      try {
        const subCategory = await SubCategory.findByIdAndUpdate(
          id,
          { ...input },
          { new: true }
        );
        return subCategory;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    deleteSubCategory: async (_, { id }) => {
      try {
        const subCategory = await SubCategory.findByIdAndDelete(id);
        return subCategory;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
  // Field Level Resolver
  SubCategory: {
    category: async (parent) => {
      const category = await Category.findById(parent.category);
      return category;
    },
  },
};
