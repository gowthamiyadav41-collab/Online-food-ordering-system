// Shopping Cart
let cart = [];

// Add item to cart
function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    displayCart();

    alert(name + " added to cart!");
}

// Display cart items
function displayCart() {
    const cartItems = document.getElementById("cart-items");
    const totalElement = document.getElementById("total");

    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty.</p>";
        totalElement.textContent = "0";
        return;
    }

    let total = 0;

    cart.forEach((item, index) => {

        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const div = document.createElement("div");

        div.innerHTML = `
            <p>
                <strong>${item.name}</strong>
                - ₹${item.price}
                × ${item.quantity}
                = ₹${itemTotal}
            </p>

            <button onclick="increaseQuantity(${index})">+</button>

            <button onclick="decreaseQuantity(${index})">-</button>

            <button onclick="removeItem(${index})">
                Remove
            </button>

            <hr>
        `;

        cartItems.appendChild(div);
    });

    totalElement.textContent = total;
}

// Increase quantity
function increaseQuantity(index) {
    cart[index].quantity++;
    displayCart();
}

// Decrease quantity
function decreaseQuantity(index) {

    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    } else {
        cart.splice(index, 1);
    }

    displayCart();
}

// Remove item from cart
function removeItem(index) {
    cart.splice(index, 1);
    displayCart();
}

// Place Order button
function placeOrder() {

    if (cart.length === 0) {
        alert("Your cart is empty. Please add some food first.");
        return;
    }

    document.getElementById("customer").scrollIntoView({
        behavior: "smooth"
    });
}

// Confirm Order
document.getElementById("order-form").addEventListener("submit", function(event) {

    event.preventDefault();

    if (cart.length === 0) {
        alert("Please add food to your cart before placing an order.");
        return;
    }

    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;

    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
    });

    alert(
        "🎉 Order Confirmed!\n\n" +
        "Customer: " + name + "\n" +
        "Phone: " + phone + "\n" +
        "Address: " + address + "\n" +
        "Total Amount: ₹" + total + "\n\n" +
        "Thank you for ordering! 🍔"
    );

    // Clear cart after order
    cart = [];
    displayCart();

    // Clear form
    document.getElementById("order-form").reset();
});
