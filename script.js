
let products = JSON.parse(localStorage.getItem("products")) || [];

//Save data
function save() { 
    localStorage.setItem("products", JSON.stringify(products));

}

// Display products
function display(data = products) {
    let table = document.getElementById("table");
    table.innerHTML = "";

    let lowCount = 0;

    data.forEach((p, i) => {
        if (p.qty < 5) lowCount++;

        table.innerHTML += `
        <tr>

            <td>${i+1}</td>
            <td>${p.name}</td>
            <td>₹${p.price}</td>
            <td>${p.qty}</td>
            <td>${p.category}</td>
            <td class="${p.qty < 5 ? 'low' : ''}">
                ${p.qty < 5 ? 'Low ⚠️' : 'in-stock'}
            </td> 
            <td>
                <button onclick="editProduct(${i})">Edit</button>
                <button onclick="deleteProduct(${i})">Delete</button>
            </td>
        </tr>
        `;
    });

    document.getElementById("totalItems").innerText = products.length;
    document.getElementById("lowStock").innerText = lowCount;
}
//Add Product
function addProduct() {
    let name = document.getElementById("name").value;
    let price = document.getElementById("price").value;
    let qty = document.getElementById("qty").value;
    let category = document.getElementById("category").value;

    if (!name || !price || !qty) {
        alert("Fill all fields");
        return;
    }

    products.push({ name, price, qty, category});
    save();
    display();

    document.getElementById("name").value = "";
    document.getElementById("price").value = "";
    document.getElementById("qty").value = "";
}

//Delete product
function deleteProduct(i) {
    products.splice(i, 1);
    save();
    display();
}

// Edit product
function editProduct(i) {
    let newQty = prompt("Enter new quantity:", products[i].qty);
    if (newQty != null) {
        products[i].qty = newQty;
        save();
        display();
    }
}

//Search products
function searchProduct() {
     
    let value = document.getElementById("search").value.toLowerCase();
    let filtered = products.filter(p =>
        p.name.toLowerCase().includes(value)
    );
    display(filtered);
}

//Initial load
display();
