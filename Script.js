document.addEventListener("DOMContentLoaded", () => {
  const shoppingList = JSON.parse(localStorage.getItem("shoppingList")) || [];
  const listContainer = document.getElementById("shoppingList");
  const itemInput = document.getElementById("itemInput");
  const addItemButton = document.getElementById("addItem");
  const clearListButton = document.getElementById("clearList");

  // Render the shopping list
  const renderList = () => {
    listContainer.innerHTML = ""; // Clear current list
    shoppingList.forEach((item, index) => {
      const li = document.createElement("li");
      li.textContent = item.name;
      li.className = item.purchased ? "purchased" : "";
      li.addEventListener("click", () => togglePurchased(index));
      li.addEventListener("dblclick", () => editItem(index));
      listContainer.appendChild(li);
    });
    localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
  };

  // Add new item
  const addItem = () => {
    const itemName = itemInput.value.trim();
    if (itemName) {
      shoppingList.push({ name: itemName, purchased: false });
      itemInput.value = ""; // Clear input field
      renderList();
    }
  };

  // Toggle purchased status
  const togglePurchased = (index) => {
    shoppingList[index].purchased = !shoppingList[index].purchased;
    renderList();
  };

  // Edit item
  const editItem = (index) => {
    const newName = prompt("Edit item:", shoppingList[index].name);
    if (newName !== null && newName.trim() !== "") {
      shoppingList[index].name = newName.trim();
      renderList();
    }
  };

  // Clear list
  const clearList = () => {
    shoppingList.length = 0; // Empty the array
    renderList();
  };

  // Event Listeners
  addItemButton.addEventListener("click", addItem);
  itemInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addItem();
  });
  clearListButton.addEventListener("click", clearList);

  // Initial Render
  renderList();
});
