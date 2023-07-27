var nameInput = document.getElementById("productName");
var priceInput = document.getElementById("productPrice");
var categoryInput = document.getElementById("productCategory");
var descriptionInput = document.getElementById("productDescription");
var searchInput = document.getElementById("searchProduct")
var currentIndex = 0;

var productList = [];
if (localStorage.getItem("products") != null) {
    productList = JSON.parse(localStorage.getItem("products"))
    displayData()
}

function addProduct() {
    var product = {
        name: nameInput.value,
        price: priceInput.value,
        category: categoryInput.value,
        description: descriptionInput.value,
    }
    
    if (descriptionInput.value == "") {
        product.description = "-"
    }

    productList.push(product);
    localStorage.setItem("products", JSON.stringify(productList))
    displayData();
}

function clearForm() {
    nameInput.value = "";
    priceInput.value = "";
    categoryInput.value = "Mobile";
    descriptionInput.value = "";
}

function displayData() {
    temp = "";
    for (let i = 0; i < productList.length; i++) {
        temp += `<tr>
                    <td>${i+1}</td>
                    <td class="txt">${productList[i].name}</td>
                    <td>${productList[i].price}</td>
                    <td>${productList[i].category}</td>
                    <td>${productList[i].description}</td>
                    <td>
                        <button onclick="updateProduct(${i})" type="button" class="btn btn-outline-warning">UPDATE</button>
                    </td>
                    <td>
                        <button onclick="deleteProduct(${i})" type="button" class="btn btn-outline-danger">DELETE</button>
                    </td>
                </tr>` 
    }
    document.getElementById("tableBody").innerHTML = temp;
}

function deleteProduct(index) {
    productList.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(productList));
    displayData()
}

function updateProduct(index) {
    currentIndex = index;
    nameInput.value = productList[index].name;
    priceInput.value = productList[index].price;
    categoryInput.value = productList[index].category;
    if (productList[index].description == "-") {
        descriptionInput.value = ""
    }else {
        descriptionInput.value = productList[index].description;
    }
    document.getElementById("add").style.display = "none"
    document.getElementById("edit").style.display = "inline-block"

    var product = {
        name: nameInput.value,
        price: priceInput.value,
        category: categoryInput.value,
        description: descriptionInput.value,
    }

    if (descriptionInput.value == "") {
        product.description = "-"
    }

    productList.splice(index, 1, product);
    localStorage.setItem("products", JSON.stringify(productList));
    displayData()
}

function editProduct() {
    // 1)<
    // productList[currentIndex].name = nameInput.value;
    // productList[currentIndex].price = priceInput.value;
    // productList[currentIndex].category = categoryInput.value;
    // productList[currentIndex].description = descriptionInput.value;
    // >

    // 2)<
    var product = {
        name: nameInput.value,
        price: priceInput.value,
        category: categoryInput.value,
        description: descriptionInput.value,
    }

    if (descriptionInput.value == "") {
        product.description = "-"
    }

    productList[currentIndex] = product;
    // >

    localStorage.setItem("products", JSON.stringify(productList));
    displayData();

    document.getElementById("add").style.display = "inline-block"
    document.getElementById("edit").style.display = "none"
}

function search() {
    var searchValue = searchInput.value.toLowerCase();
    temp = "";
    for (let i = 0; i < productList.length; i++) {
        if (productList[i].name.toLowerCase().includes(searchValue) == true || productList[i].category.toLowerCase().includes(searchValue) == true) {
            temp += `<tr>
                    <td>${i+1}</td>
                    <td class="txt">${productList[i].name.toLowerCase().replace(searchValue, `<span class="text-danger">${searchValue}</span>`)}</td>
                    <td>${productList[i].price}</td>
                    <td>${productList[i].category.toLowerCase().replace(searchValue, `<span class="text-danger">${searchValue}</span>`)}</td>
                    <td>${productList[i].description}</td>
                    <td>
                        <button onclick="updateProduct(${i})" type="button" class="btn btn-outline-warning">UPDATE</button>
                    </td>
                    <td>
                        <button onclick="deleteProduct(${i})" type="button" class="btn btn-outline-danger">DELETE</button>
                    </td>
                </tr>` 
        } 
    }
    document.getElementById("tableBody").innerHTML = temp;
}

