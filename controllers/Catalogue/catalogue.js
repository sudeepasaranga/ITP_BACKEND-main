const router = require('express').Router();
let Catalogue = require('../../models/CatelogModel/catalogue.model');

/* GET all categories.('http://localhost:8081/api/catalogue/catalogue/getallcategories')  */

router.route('/getallcategories').get((_req, res) => {
    Catalogue.find()
        .then(category => res.json(category))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Add new Category. ('http://localhost:8081/api/catalogue/catalogue/addnewcategory')

router.route("/addnewcategory").post((req,res)=>{

    const categoryName = req.body.categoryName;
    const description = req.body.description;
    const itemVariations = req.body.itemVariations;

    const newCategory = new Catalogue({
        categoryName, 
        description,
        itemVariations

    })

    newCategory.save()  
    .then(()=>{res.json("Successfully add new category !!") // status
    }).catch(err => res.status(400).json('Error: ' + err));  //display err
});

// Update Category ('http://localhost:8081/api/catalogue/catalogue/updatecategory')
router.route('/updatecategory/:id').put((req, res) => {
    const id = req.params.id;

    Catalogue.findByIdAndUpdate(id)
        .then(catalogue => {
            if (!catalogue) {
                return res.status(404).json('Category not found');
            }

            catalogue.categoryName = req.body.categoryName;
            catalogue.description = req.body.description;
            catalogue.itemVariations = req.body.itemVariations;

            catalogue.save()
                .then(() => res.json('Category updated successfully!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

//Remove category  ('http://localhost:8081/api/catalogue/catalogue/removecategory')

router.route('/removecategory/:id').delete((req, res) => {
    Catalogue.findByIdAndDelete(req.params.id)
        .then(() => res.json(' Successfully remove category !'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//view one payment  ('http://localhost:8081/api/catalogue/catalogue/viewcategorybyid')

router.route('/viewcategorybyid/:id').get((req, res) => {
    Catalogue.findById(req.params.id)
        .then(category => res.json(category))
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;