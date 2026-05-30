let products = JSON.parse(localStorage.getItem("products")) || [];

function save() {
  localStorage.setItem("products", JSON.stringify(products));
}

function display(data = products) {
  let table = document.getElementById("table");
  table.innerHTML = "";

  let lowCount = 0;
  let inStockCount = 0;

  let inventoryValue = data.reduce(
    (total, product) => total + product.price * product.qty,
    0,
  );

  data.forEach((p, i) => {
    if (p.qty < 10) lowCount++;
    else inStockCount++;

    table.innerHTML += `
        <tr>
            <td>${i + 1}</td>
            <td>${p.name}</td>
            <td>₹${p.price}</td>
            <td>${p.qty}</td>
            <td>₹${p.price * p.qty}</td>
            <td>${p.category}</td>
            <td>
               <span class="${p.qty < 10 ? "low" : "stock"}">
                ${p.qty < 10 ? "Low ⚠️" : "In-stock ✅"}
              </span>
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
  document.getElementById("inStock").innerText = inStockCount;
  document.getElementById("inventoryvalues").innerText =
    "₹" + data.reduce((t, p) => t + p.price * p.qty, 0).toLocaleString("en-IN");
}

function addProduct() {
  let name = document.getElementById("name").value;
  let price = parseFloat(document.getElementById("price").value);
  let qty = parseInt(document.getElementById("qty").value);
  let category = document.getElementById("category").value;
  let total = price * qty;

  if (!name || !price || !qty) {
    alert("Fill all fields");
    return;
  }

  products.push({ name, price, qty, category });
  save();
  display();

  document.getElementById("name").value = "";
  document.getElementById("price").value = "";
  document.getElementById("qty").value = "";
}

function clearAll() {
  document.getElementById("name").value = "";
  document.getElementById("price").value = "";
  document.getElementById("qty").value = "";
  document.getElementById("category").selectedIndex = 0;
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
  let filtered = products.filter((p) => p.name.toLowerCase().includes(value));
  display(filtered);
}

function clearAll() 
{
  document.getElementById("name").value = "";
  document.getElementById("price").value = "";
  document.getElementById("qty").value = "";
  document.getElementById("category").selectedIndex = 0;
}
function sortProducts() 
{ 
  let sortValue = document.getElementById("sort"value;
  let sortedProducts = [...products];

  if (sortValue === "name") 
    { 
    sortedProducts.sort((a, b) => a.name.localCompare(b.name));
    }
  if (sortValue === "price")
     { 
      sortedProducts.sort((a, b) => a.price - b.price);  
     } 
  if (sortValue === "category") 
      { 
        sortedProducts.sort((a, b) => a.category.localCompare(b.category));
      }
       display(sortedProducts); 
      } 
   display();
 
            
