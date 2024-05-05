//Global variable
var productNameInput = document.getElementById('productName');//Input kolo
var productPriceInput = document.getElementById('productPrice');//Input kolo
var productCategoryInput = document.getElementById('productCategory');//Input kolo
var productDescInput = document.getElementById('productDesc');//Input kolo
var updateBtn=document.getElementById('updateBtn');
var addBtn=document.getElementById('addBtn');
var currentIndex = 0; //
var productsContainer = []; // an array to store all prodect

// to check if product is exist on local storage
if(localStorage.getItem('product')!=null) {
    productsContainer=JSON.parse(localStorage.getItem('product'));
displayProduct(productsContainer);

}
// validation to insert product name 
function validateName(){
    var regex=/^[A-Z][a-z]{3,8}$/;
    return regex.test(productNameInput.value);
    }

// Add product
function addProduct() {
if(validateName(productNameInput.value)){

    var product = {
        name: productNameInput.value,
        price: productPriceInput.value,
        category: productCategoryInput.value,
        desc: productDescInput.value
    }
    productsContainer.push(product);
    localStorage.setItem("product",JSON.stringify(productsContainer))
    displayProduct(productsContainer);
    clearForm();
    console.log("hello");
}
else{
alert('Product name must start with captil char then form 3 to 8 char by maximum')
}
}

// Clear Form after insert or add
function clearForm(){
productNameInput.value="";
productPriceInput.value="";
productCategoryInput.value="";
productDescInput.value="";

}
// Display all product
function displayProduct(arr){
  var cartons =``;
    for(var i=0; i<arr.length;i++){
cartons +=`<tr>
<td>${arr[i].name}</td>
<td>${arr[i].price}</td>
<td>${arr[i].category}</td>
<td>${arr[i].desc}</td>
<td> <button  onclick="setFormForUpdate(${i});" class=" btn btn-warning btn-sm" > update</button></td>
<td> <button onclick="deleteProduct(${i});"  class="btn btn-danger btn-sm"> delete</button></td>

</tr>`; }
document.getElementById('tableBody').innerHTML=cartons;

}
// Delete product
function deleteProduct(product){
productsContainer.splice(product,1);
localStorage.setItem("product",JSON.stringify(productsContainer))

displayProduct(productsContainer)
}

// Search about product by name 
function searchProduct(term){
    var matchedProduct=[];
    for(var i=0;i<productsContainer.length;i++){
        if(productsContainer[i].name.toLowerCase().includes(term.toLowerCase())===true){
            matchedProduct.push(productsContainer[i]);
        }
    }
    displayProduct(matchedProduct);
}

// set form to update
function setFormForUpdate(i){
    currentIndex = i;
    addBtn.classList.replace('d-block','d-none');
    updateBtn.classList.replace('d-none','d-block');
    productNameInput.value=productsContainer[i].name;
    productPriceInput.value=productsContainer[i].price;
    productCategoryInput.value=productsContainer[i].category;
    productDescInput.value=productsContainer[i].desc;

}

// Update Product
function update(){
  if(validateName(productNameInput.value))
  {
    productsContainer[currentIndex].name =  productNameInput.value;
    productsContainer[currentIndex].price = productPriceInput.value;
    productsContainer[currentIndex].category = productCategoryInput.value;
    productsContainer[currentIndex].desc = productDescInput.value;
    localStorage.setItem("product",JSON.stringify(productsContainer));
    updateBtn.classList.replace('d-block','d-none');
    addBtn.classList.replace('d-none','d-block');
    clearForm();
    displayProduct(productsContainer);
  }
  

  else{
    alert('Product name must start with captil char then form 3 to 8 char by maximum')
    }

}
