
let tables = [];

let tableNames = []

let items = []

const loadTableData = async () => {
    await fetch("./tables.json")
    .then(response => response.json())
    .then(data => {
        tables = data;
    })
    tables.map(table => tableNames.push(table.name));

console.log("Names ", tableNames)
    showTables();
}

const itemsData = async () => {
    await fetch("./items.json")
    .then(response => response.json())
    .then(data => {
        items = data;
    })
    showItems();
}

loadTableData();
itemsData();

const showTables = () => {
    let tableCard = tables.map(table => {
        return `
        <div id="t${table.id}" class="tableitem" ondrop="drop(event, this)" ondragover="allowDrop(event)">
            <div class="content">
                <div class="header">${table.name}</div>
                <div class="meta">Total Price : ${table.total}</div>
            </div>
            <div> <button onclick="showTable('t${table.id}')"> View Order Details </button> </div>
            <div> <button onclick="resetTable('t${table.id}')"> Reset Table </button> </div>
            <div id="show${table.id}"> </div>
        </div>
        `
    })

    let allTables = "";
    for(let i = 0; i < tableCard.length; ++i) {
        allTables += tableCard[i];
    }

    document.getElementById("table").innerHTML = allTables;
} 

const showItems = () => {
    let itemCards = items.map(item => {
        return `
        <div id="i${item.id}" class="card" draggable="true" ondragstart="drag(event)">
            <div class="item">
                <div class="header">${item.name}</div>
                <div class="price"> Price : ${item.price}</div>
            </div>
        </div>  `
    })

    let allItems = "";
    for(let i = 0; i < itemCards.length; ++i) {
        allItems += itemCards[i];
    }

    document.getElementById("items").innerHTML = allItems;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(event, target) {
    event.preventDefault();
    let itemId = parseInt(event.dataTransfer.getData("text").substr(1));
    let tableId = parseInt(target.id.substr(1));
    let exist = false;
    tables[tableId - 1].items.map(item => {
        if(item.id === itemId) {
            alert("Already added");
            exist = true;
        }
    })
    if(!exist) {
        items.map((item) => {
            
            if(item.id === itemId) {
                tables[tableId - 1].items.push(JSON.parse(JSON.stringify(item)));
                tables[tableId - 1].total += item.price;
                console.log(tables[tableId - 1].items, "dfg");
                showTables();
            }
        })
    }
}

const tableSearch = () => {
    var searchfilter = document.getElementById("tablesearch").value;
    searchfilter = searchfilter.toLowerCase();

    let result = '';
    tables.map(table => {
        if(table.name.includes(searchfilter)) {
            result += `
                <div id="t${table.id}" class="tableitem" ondrop="drop(event, this)" ondragover="allowDrop(event)">
                    <div class="content">
                        <div class="header">${table.name}</div>
                        <div class="meta">Total Price : ${table.total}</div>
                    </div>
                    <div> <button onclick="showTable('t${table.id}')"> View Order Details </button> </div>
                    <div> <button onclick="resetTable('t${table.id}')"> Reset Table </button> </div>
                    <div id="show${table.id}"> </div>
                </div>
            `
        }
    })

    document.getElementById("table").innerHTML = result;
}

const itemSearch = () => {
    var searchFilter = document.getElementById("tosearch").value;
    searchFilter = searchFilter.toLowerCase();

    let result = "";
    items.map(item => {
        if(item.name.includes(searchFilter)) {
            result += `
            <div id="i${item.id}" class="card" draggable="true" ondragstart="drag(event)">
                <div class="item">
                    <div class="header">${item.name}</div>
                    <div class="price"> Price : ${item.price}</div>
                </div>
            </div>
            `;
        }
    })

    document.getElementById("items").innerHTML = result;
}

const showTable = (id) => {

    let tableId = id.substr(1);
    let result = '';

    tables[tableId - 1].items.map(item => {
        result += `
            <div>
                <tr>
                    <td>${item.name}</td>
                    <td> <input type="number" min="1" max="5" value="${item.quantity}" onchange="setQuantity(this, ${tableId}, ${item.id})"> </td>
                    <td>${item.price}</td>
                    <td> <button onclick="deleteItem(${item.id}, ${tableId})"> Delete </button> </td>
                </tr>
            </div>
        `;
    })

    document.getElementById(`show${tableId}`).innerHTML = result;
}

const setQuantity = (e, tableId, itemId) => {

    let noOfItems = e.value;

    tables[tableId - 1].items.map(item => {
        if(item.id === itemId) {
            if(item.quantity < noOfItems) {
                console.log("Inc");
                tables[tableId - 1].total += (noOfItems - 1) * item.price;
                item.quantity = noOfItems;
            } else if(item.quantity > noOfItems) {
                items.map(i => {
                    if(i.id === itemId) {
                        console.log(i.quantity, "Quan");
                    }
                })
                tables[tableId - 1].total -= (item.quantity - noOfItems) * item.price;
                item.quantity = noOfItems;
            }
        }
    })

    showTables();
    showTable(`t${tableId}`);
}

const resetTable = (id) => {

    let tableId = id.substr(1);

    tables[tableId - 1].items = [];
    tables[tableId - 1].total = 0;

    showTables();

}

const deleteItem = (itemId, tableId) => {

    let price = tables[tableId - 1].items.map(item => {
        if(item.id === itemId) {
            return item.price;
        }
    })

    let quantity;
    tables[tableId - 1].items.map(item => {
        if(item.id === itemId) {
            quantity = item.quantity;
        }
    })

    price = price[0];

    let newItems = tables[tableId - 1].items.filter(item => {
        return item.id !== itemId;         
    })

    tables[tableId - 1].items = newItems;
    tables[tableId - 1].total -= quantity * price;

    showTables();
    showTable(`t${tableId}`);
}