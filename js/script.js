console.log("Welcome to Grocify");

// Fetching items from the document
const addBtn = document.getElementById('addBtn');
const alertBox = document.getElementById('alert');
const dairyBox = document.getElementById("dairyBox");
const vfBox = document.getElementById("vfBox");
const otherBox = document.getElementById("otherBox");

// Important Variables
let dairyData;
let vfData;
let otherData;
let obj;

// Function to show an alert
const showAlert = (message, isSuccess = true) => {
    const alertClass = isSuccess ? 'success' : 'danger';
    alertBox.innerHTML = `
        <div class="alert alert-${alertClass} alert-dismissible fade show" role="alert">
            <strong>${isSuccess ? 'Success' : 'Error'} |</strong> ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;
    
    setTimeout(() => {
        alertBox.innerHTML = '';
    }, 2500);
};

// Function to update LocalStorage
const updateLocalStorage = (data, key) => {
    const existingData = JSON.parse(localStorage.getItem(key)) || [];
    existingData.push(data);
    localStorage.setItem(key, JSON.stringify(existingData));
    showAlert('The item has been added successfully');
};

// Function to add item
const addItem = () => {
    const item = document.getElementById('item');
    const quantity = document.getElementById('quantity');
    const typeRadio = document.querySelector('input[name="itemType"]:checked');
    
    if (!item.value || !quantity.value || !typeRadio) {
        showAlert('Please fill all fields and select a type', false);
        return;
    }

    const itemType = typeRadio.value;
    obj = {
        "item": item.value,
        "quantity": quantity.value
    };
    
    updateLocalStorage(obj, itemType);
    
    item.value = '';
    quantity.value = '';
};

// Function to remove item
const removeItem = (itemType, index) => {
    const items = JSON.parse(localStorage.getItem(itemType));
    items.splice(index, 1);
    localStorage.setItem(itemType, JSON.stringify(items));
    showItems();

    showAlert("The item has been removed successfully!")
};

// Function to show items
const showItems = () => {
    const itemTypes = ['Dairy', 'Veggies&Fruits', 'Others'];

    itemTypes.forEach(itemType => {
        const itemsContainer = document.getElementById(`${itemType.toLowerCase()}Box`);
        const items = JSON.parse(localStorage.getItem(itemType)) || [];

        if (items.length === 0) {
            itemsContainer.innerHTML = `<p class="lead">No items are there!</p>`;
        } else {
            const itemsHtml = items.map((element, index) => `
                <tr>
                    <th>${element.item}</th>
                    <td>${element.quantity}</td>
                    <td>
                        <button type="button" class="btn btn-danger btn-sm" onclick="removeItem('${itemType}', ${index})">
                            Remove
                        </button>
                    </td>
                </tr>`
            ).join('');

            itemsContainer.innerHTML = itemsHtml;
        }
    });
};

// Implementation
addBtn.addEventListener('click', addItem);
showItems();
