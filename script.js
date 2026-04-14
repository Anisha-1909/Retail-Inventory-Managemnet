
let products = JSON.parse(localStorage.getItem("products")) || [];


function save() { 
    localStorage.setItem("products", JSON.stringify(products));

}

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
            <td>₹${p.price*p.qty}</td>
            <td>${p.category}</td>
            <td class="${p.qty < 10 ? 'low' : ''}">
                ${p.qty < 10 ? 'Low ⚠️' : 'in-stock ✅'}
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

function addProduct() {
    let name = document.getElementById("name").value;
    let price = parseFloat(document.getElementById("price").value);
    let qty = parseInt(document.getElementById("qty").value);
    let category = document.getElementById("category").value;
    let total =price*qty;
    
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


function deleteProduct(i) {
    products.splice(i, 1);
    save();
    display();
}


function editProduct(i) {
    let newQty = prompt("Enter new quantity:", products[i].qty);
    if (newQty != null) {
        products[i].qty = newQty;
        save();
        display();
    }
}


function searchProduct() {
     
    let value = document.getElementById("search").value.toLowerCase();
    let filtered = products.filter(p =>
        p.name.toLowerCase().includes(value)
    );
    display(filtered);
}

//Initial load
display();
