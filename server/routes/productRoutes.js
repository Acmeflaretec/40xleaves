const { Router } = require('express');
const router = Router();
const authorization = require("../middlewares/authorization");
const { addProduct, getProducts, deleteProduct, getProductById, updateProduct } = require('../controllers/productController');
const { upload } = require('../middlewares/multer');

// router.post('/', authorization, upload.array('images', 10), addProduct);
router.post('/', upload.array('images', 10), addProduct);
router.get('/', getProducts);
// router.delete('/:id', authorization, deleteProduct);
router.delete('/:id', deleteProduct);
router.get('/:id', getProductById);
// router.patch('/',authorization, upload.array('images', 10), updateProduct);
router.patch('/',upload.array('images', 10), updateProduct);

module.exports = router;
