console.log("Welcome to Grocify");

// Fethcing items form the document
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

// Function to show an alert of success
const showError = () => {
    alertBox.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
    <strong>Error |</strong> Please see your field entries and checkboxes
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>`;

    setTimeout(() => {
        alertBox.innerHTML = '';
    }, 2500);
};

// Function to show an alert of success
const showSuccess = () => {
    alertBox.innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
    <strong>Success |</strong> The item has been added successfully
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>`;

    setTimeout(() => {
        alertBox.innerHTML = '';
    }, 2500);
};

// function to update LocalStorage
const update = (obj, type) => {
    switch (type) {
        case 'dairy':
            if (localStorage.getItem('Dairy') == undefined) {
                dairyData = [];
            } else {
                dairyData = JSON.parse(localStorage.getItem('Dairy'));
            }

            dairyData.push(obj);
            localStorage.setItem('Dairy', JSON.stringify(dairyData));

            showSuccess();
            break;

        case 'vF':
            if (localStorage.getItem('Veggies&Fruits') == undefined) {
                vfData = [];
            } else {
                vfData = JSON.parse(localStorage.getItem('Dairy'));
            }

            vfData.push(obj);
            localStorage.setItem('Veggies&Fruits', JSON.stringify(vfData));

            showSuccess();
            break;

        case 'other':
            if (localStorage.getItem('Others') == undefined) {
                otherData = [];
            } else {
                otherData = JSON.parse(localStorage.getItem('Others'));
            }

            otherData.push(obj);
            localStorage.setItem('Others', JSON.stringify(otherData));

            showSuccess();
            break;

        default:
            break;
    }
};
// Function to add item
const addItem = () => {
    let item = document.getElementById('item');
    let quentity = document.getElementById('quantity');

    if (item.value == '' || quentity.value == '') {
        showError();
    }

    let type;
    const dairyRadio = document.getElementById('dairy');
    const vfRadio = document.getElementById('vF');
    const otherRadio = document.getElementById('other');
    if (dairyRadio.checked) {
        type = dairyRadio.value;
    } else if (vfRadio.checked) {
        type = vfRadio.value;
    } else if (otherRadio.checked) {
        type = otherRadio.value;
    } else {
        showError();
    }

    obj = {
        "item":item.value,
        "quantity":quentity.value
    };
    update(obj, type);
    showItems();
    item.value = '';
    quentity.value = '';
};

// Function to remove item
const removeItem = (itemType, index) => {
    const items = JSON.parse(localStorage.getItem(itemType));
    items.splice(index, 1);
    localStorage.setItem(itemType, JSON.stringify(items));
    showItems();
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
// Implementaion
// Add Item
addBtn.addEventListener('click', addItem);

// Show updates
showItems();
