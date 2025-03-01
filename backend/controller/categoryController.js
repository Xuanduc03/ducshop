const Category = require("../models/category");



//Lấy danh sách danh mục cha + danh mục con
module.exports.getCategoriesWithChildren = async (req, res) => {
    try {
        // Lấy tất cả danh mục cha
        const categories = await Category.find({ parentCategory: null })
            .populate({
                path: "parentCategory",
                select: "name"
            });

        // Lấy danh mục con theo danh mục cha
        const categoriesWithChildren = await Promise.all(
            categories.map(async (category) => {
                const children = await Category.find({ parentCategory: category._id });
                return { ...category.toObject(), children };
            })
        );

        res.status(200).json({ success: true, data: categoriesWithChildren });
    } catch (error) {
        res.status(500).json({ success: false, message: "Lỗi server", error });
    }
};

module.exports.getSubcategories = async (req, res) => {
    try {
        const { parentId } = req.params;

        const subcategories = await Category.find({ parentCategory: parentId });

        if (!subcategories.length) {
            return res.status(404).json({ success: false, message: "Không có danh mục con nào" });
        }

        res.status(200).json({ success: true, data: subcategories });
    } catch (error) {
        res.status(500).json({ success: false, message: "Lỗi server", error });
    }
};

module.exports.getDetailCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({ success: false, message: "Không tìm thấy danh mục" });
        }

        res.status(200).json({ success: true, data: category });
    } catch (error) {
        res.status(500).json({ success: false, message: "Lỗi server", error });
    }
};


// Thêm mới category
module.exports.createCategory = async (req, res) => {
    try {
        const { name, description, image, parentCategory } = req.body;

        // Kiểm tra trùng tên danh mục
        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            return res.status(400).json({ success: false, message: "Tên danh mục đã tồn tại" });
        }

        const category = new Category({ name, description, image, parentCategory });
        await category.save();

        res.status(201).json({ success: true, message: "Thêm danh mục thành công", data: category });
    } catch (error) {
        res.status(500).json({ success: false, message: "Lỗi server", error });
    }
};


// Cập nhật category
exports.updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, image, parentCategory } = req.body;

        // Kiểm tra xem danh mục có tồn tại không
        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({ success: false, message: "Không tìm thấy danh mục" });
        }

        // Cập nhật danh mục
        category.name = name || category.name;
        category.description = description || category.description;
        category.image = image || category.image;
        category.parentCategory = parentCategory || null; // Nếu null => trở thành danh mục cha

        await category.save();
        res.status(200).json({ success: true, message: "Cập nhật danh mục thành công", data: category });
    } catch (error) {
        res.status(500).json({ success: false, message: "Lỗi server", error });
    }
};


// Xóa category
exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        // Kiểm tra xem danh mục có tồn tại không
        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({ success: false, message: "Không tìm thấy danh mục" });
        }

        // Xóa tất cả danh mục con của danh mục cha
        await Category.deleteMany({ parentCategory: id });

        // Xóa danh mục cha
        await Category.findByIdAndDelete(id);

        res.status(200).json({ success: true, message: "Xóa danh mục và danh mục con thành công" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Lỗi server", error });
    }
};
