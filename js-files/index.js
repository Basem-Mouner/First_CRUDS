//=====================نظام ادارة المنتجات==========================
//==============================================================
//======================CRUDS SYSTEM=================================
//================CREATE READ UPDATE DELETE SEARCH=======================
//==============================================================
//==============================================================

{


    const productName = document.getElementById('productName');
    const productPrice = document.getElementById('productPrice');
    const productCategory = document.getElementById('productCategory');
    const productdescription = document.getElementById('productdes');
    const productImg = document.getElementById('productImg');
    const search_Product = document.getElementById('SearchProduct');
    const form = document.forms[0];
    //select by traversal
    let reset = document.body.children[1].children[0].children[3];

    // productContainer:Array to put anew item added inside it 
    let productContainer;
    // THIS GLOBAL VAR TO catch idex in product contanier array when do ubdate  and make update at the same index 
    let currentIndex;

    //****************REFRESH CHEACK IF PRODUCT CONTANIER ONTAIN PRODUCT OR NOT*************** 
    //AT REFRESH THE GLOBAL PRODUCT CONTANIER WILL LOADED SO MUST CHECK ON IT 
    if (localStorage.getItem('product') !== null) {
        productContainer = JSON.parse(localStorage.getItem('product'));
        displayProduct(productContainer);
    } else {
        productContainer = [];
    }
    //****************REFRESH CHEACK IF PRODUCT CONTANIER ONTAIN PRODUCT OR NOT*************** 

    // ===========================ADD NEW PRODUCT==========================
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        addProduct();
    });

    function addProduct() {

        var newProduct = {
                code: productName.value,
                price: productPrice.value,
                cat: productCategory.value,
                des: productdescription.value,
                image: `assests/images/${productImg.files[0]?.name}`
            }
            //if at normal add product put else when do ubdate operation
        if (document.getElementById('addBtn').innerHTML === 'Add Product') {
            productContainer.push(newProduct);
        } else {

            var old_Image = productContainer[currentIndex].image;
            productContainer.splice(currentIndex, 1, newProduct)
            document.getElementById('addBtn').innerHTML = 'Add Product';

            // هنا بقولة لو بتعدل ومادخلتش صورة جديدة اعرض اللي كان موجودة غير كدة فاكيد هايكون في فاليو فاهتروح للدسبلاي وهاتتعرض
            if (productContainer[currentIndex].image == `assests/images/undefined`) {
                productContainer[currentIndex].image = old_Image;
            }

        }



        console.log('new opject is : ');
        console.log(newProduct);
        console.log('Array productContainer now  is :');
        console.log(productContainer);


        //set add effect in local storage
        localStorage.setItem('product', JSON.stringify(productContainer));
        clearForm();
        //display on document array of product contanier which contain objects
        displayProduct(productContainer);
    }
    // ===========================ADD NEW PRODUCT===========================

    // ===========================CLEAR===========================

    reset.addEventListener('click', function(e) { clearForm(); });

    function clearForm() {
        productName.value = null;
        productPrice.value = null;
        productdescription.value = null;
        productCategory.value = null;
        productImg.value = null;
    }
    // ===========================CLEAR===========================

    // ===========================DISPLAY NEW PRODUCT===========================
    function displayProduct(Array) {
        var box_contanier = '';

        for (var i = 0; i < Array.length; i++) {

            box_contanier += `
            <div class="outer-product-Item col-sm-6 col-lg-3 col-md-4 ">
                        <div class="inner-Pruduct-Item text-center   border border-2 border-info p-1 rounded-3 bg-dark bg-opacity-75">
                            <img src="${Array[i].image}" class="w-75 rounded-circle  m-2 " alt="image-product">
                            <h2 class="fs-5 text-primary">product Name: <span class="fs-6">${Array[i].code}</span></h2>
                            <h2 class="fs-5 text-primary">product price: <span class="fs-6">${Array[i].price}</span></h2>
                            <h2 class="fs-5 text-primary">product cat: <span class="fs-6">${Array[i].cat}</span></h2>
                            <h2 class="fs-5 text-primary">product desc: <span class="fs-6">${Array[i].des}</span></h2>
                            <div class="d-flex">
                                <button onclick="deleteProduct(${i})" class="btn btn-outline-danger my-3 w-50 p-0 ms-2">Delete<i class="fa fa-trash mx-1"></i></button>
                                <button onclick="updateProduct(${i})" class="btn btn-outline-warning my-3 p-0 w-50 mx-1">Update<i class="fa fa-edit ms-2"></i></button>
                            </div>
                        </div>
                    </div>
            `
        }
        document.getElementById('productFormItems').innerHTML = box_contanier;
    }
    // ===========================DISPLAY NEW PRODUCT==========================

    // ===========================DELETE Item=========================================
    function deleteProduct(index) {
        productContainer.splice(index, 1);
        // ===========================DELETE EFFECT ON DOCUMENT DISPLAY=================
        displayProduct(productContainer);
        // ===========================DELETE EFFECT ON LOCAL STORAGE==to make effect at refresh=======================================
        localStorage.setItem('product', JSON.stringify(productContainer));
    }
    // ===========================DELETE Item=========================================

    // ===========================UPDATE DATA Item========================================
    function updateProduct(index) {
        currentIndex = index;

        productName.value = productContainer[index].code;
        productPrice.value = productContainer[index].price;
        productCategory.value = productContainer[index].cat;
        productdescription.value = productContainer[index].des;

        document.getElementById('addBtn').innerHTML = 'Update';
    }
    // ===========================UPDATE DATAItem=========================================


    // ===========================SEARCH DATA Item========================================
    function searchProduct() {

        var term = search_Product.value;
        var box_contanier = '';
        var searchBackupArray = [];
        for (var i = 0; i < productContainer.length; i++) {
            if (productContainer[i].code.toLowerCase().includes(term.toLowerCase())) {
                searchBackupArray.push(productContainer[i]);
                displayProduct(searchBackupArray);
            }
        }

    }
    // ===========================SEARCH DATAItem=========================================

    // ===========================validation DATA input========================================
    function validateInputs(element) {

        var regex = {
            productName: /^[A-Z].{3}/gm,
            productPrice: /^[1-9]([0-9]|[0-9][0-9]|[0-9][0-9][0-9])?/gm,
            productdes: /^.{6,}$/,
            productCategory: /^(mobile|tv|laptop|screen)$/
        };
        if (regex[element.id].test(element.value)) {

            element.classList.add('is-valid');
            element.classList.remove('is-invalid');
            element.nextElementSibling.classList.replace('d-block', 'd-none');
            return true;
        } else {
            element.classList.add('is-invalid');
            element.classList.remove('is-valid');
            element.nextElementSibling.classList.replace('d-none', 'd-block');
            return false;
        }

    }
}
// ==========================End validation DATA input=======================================