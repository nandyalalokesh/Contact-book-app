const contactForm = document.getElementById('contactForm');
const contactList = document.getElementById('contactList');
const API_URL = 'http://localhost:5000/contacts';

function addContactToDOM(contact) {
  const li = document.createElement('li');

  const nameEl = document.createElement('div');
  nameEl.textContent = `Name: ${contact.name}`;

  const emailEl = document.createElement('div');
  emailEl.textContent = `Email: ${contact.email}`;

  const phoneEl = document.createElement('div');
  phoneEl.textContent = `Phone: ${contact.phone}`;

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.onclick = async () => {
    await deleteContact(contact.id, li);
  };

  li.appendChild(nameEl);
  li.appendChild(emailEl);
  li.appendChild(phoneEl);
  li.appendChild(deleteBtn);

  contactList.appendChild(li);
}


async function fetchContacts() {
  const res = await fetch(API_URL);
  const data = await res.json();
  contactList.innerHTML = ''; 
  data.forEach(contact => addContactToDOM(contact));
}

async function addContact(contact) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(contact)
  });
  const newContact = await res.json();
  addContactToDOM(newContact);
}

async function deleteContact(id, liElement) {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  liElement.remove();
}

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d{10}$/;

  if (!emailRegex.test(email)) return alert('Enter a valid email');
  if (!phoneRegex.test(phone)) return alert('Enter a 10-digit phone number');

  const contact = { name, email, phone };

  await addContact(contact);

  contactForm.reset();
});

window.addEventListener('DOMContentLoaded', fetchContacts);
