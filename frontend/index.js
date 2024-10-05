import { backend } from 'declarations/backend';

document.addEventListener('DOMContentLoaded', async () => {
  const shoppingList = document.getElementById('shopping-list');
  const addItemForm = document.getElementById('add-item-form');
  const newItemInput = document.getElementById('new-item');

  // Function to render the shopping list
  async function renderShoppingList() {
    const items = await backend.getItems();
    shoppingList.innerHTML = '';
    items.forEach(item => {
      const li = document.createElement('li');
      li.className = `shopping-item ${item.completed ? 'completed' : ''}`;
      li.innerHTML = `
        <span>${item.text}</span>
        <button class="delete-btn"><i class="fas fa-trash"></i></button>
      `;
      li.addEventListener('click', () => toggleItem(item.id));
      li.querySelector('.delete-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        deleteItem(item.id);
      });
      shoppingList.appendChild(li);
    });
  }

  // Function to add a new item
  async function addItem(text) {
    await backend.addItem(text);
    newItemInput.value = '';
    renderShoppingList();
  }

  // Function to toggle item completion
  async function toggleItem(id) {
    await backend.toggleCompleted(id);
    renderShoppingList();
  }

  // Function to delete an item
  async function deleteItem(id) {
    await backend.deleteItem(id);
    renderShoppingList();
  }

  // Event listener for adding a new item
  addItemForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = newItemInput.value.trim();
    if (text) {
      addItem(text);
    }
  });

  // Initial render
  renderShoppingList();
});
