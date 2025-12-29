if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "/NTI-Project/login.html";
}

var products = JSON.parse(localStorage.getItem("products")) || [
    { name: "Introduction to Algorithms", price: 499, img: "https://dufd1zz39gt0.cloudfront.net/wp-content/uploads/2022/06/08153355/Introduction-to-Algorithms-392x447.jpg"},
    { name: "C++ Primer", price: 599.99, img: "https://dufd1zz39gt0.cloudfront.net/wp-content/uploads/2021/02/08162352/C-Primer-scaled-205x275.jpg" },
    { name: "Automate the boring stuff with python", price: 199.99, img: "https://dufd1zz39gt0.cloudfront.net/wp-content/uploads/2025/06/08131634/Automate-the-Boring-Stuff-with-Python-392x518.jpg" },
];

function saveProducts() {
    localStorage.setItem("products", JSON.stringify(products));
}

function renderProducts() {
    var container = document.getElementById("products");
    if (!container) return; // skip if not on products page
    container.innerHTML = "";

    products.forEach(function(product, index) {
        var productHTML = `
            <div class="product">
                <img src="${product.img}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p class="price">$${product.price}</p>
                <button class="add-btn btn" onclick="addToCart(${index})">Add to Cart</button>
                <button class="remove-btn btn" onclick="removeProduct(${index})">Remove</button>
            </div>
        `;
        container.innerHTML += productHTML;
    });
}

function removeProduct(index) {
    Swal.fire({
        title: "Are you sure?",
        text: "This will remove " + products[index].name + " permanently.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, remove it!"
    }).then((result) => {
        if (result.isConfirmed) {
            products.splice(index, 1);
            saveProducts();
            renderProducts();
            Swal.fire("Removed!", "The product has been deleted.", "success");
        }
    });
}


function addToCart(index) {
    Swal.fire({
        title: "Good job!",
        text: "Added: " + products[index].name,
        icon: "success"
    });
}

// Handle Add Product form
var form = document.getElementById("addProductForm");
if (form) {
    form.addEventListener("submit", function(e) {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const price = parseFloat(document.getElementById("price").value);
        const img = document.getElementById("image").value;

        products.push({ name, price, img });
        saveProducts();
        form.reset();

    });
}

function logout() {
    localStorage.removeItem("loggedIn");
    window.location.href = "../..//NTI-Project/login.html";
}

renderProducts();
