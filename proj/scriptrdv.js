
const modalWrapper = document.querySelector('.modal-wrapper');
// modal add
const addModal = document.querySelector('.add-modal');
const addModalForm = document.querySelector('.add-modal .form');

// modal edit
const editModal = document.querySelector('.edit-modal');
const editModalForm = document.querySelector('.edit-modal .form');

const btnAdd = document.querySelector('.btn-add');

const tableUsers = document.querySelector('.table-users');

let id;

// Create element and render users
const renderUser = doc => {
  const tr = `
    <tr data-id='${doc.id}'>
      <td>${doc.data().Nom}</td>
      <td>${doc.data().Prenom}</td>
      <td>${doc.data().Email}</td>
      <td>${doc.data().Date}</td>
      <td>
        <button class="btn btn-edit">Modifier</button>
        <button class="btn btn-delete">Supprimer</button>
      </td>
    </tr>
  `;
  tableUsers.insertAdjacentHTML('beforeend', tr);

  // Click edit user
  const btnEdit = document.querySelector(`[data-id='${doc.id}'] .btn-edit`);
  btnEdit.addEventListener('click', () => {
    editModal.classList.add('modal-show');

    id = doc.id;
    editModalForm.Nom.value = doc.data().Nom;
    editModalForm.Prenom.value = doc.data().Prenom;
    editModalForm.Email.value = doc.data().Email;
    editModalForm.Date.value = doc.data().Date;

  });

  // Click delete user
  const btnDelete = document.querySelector(`[data-id='${doc.id}'] .btn-delete`);
  btnDelete.addEventListener('click', () => {
    db.collection('rdv').doc(`${doc.id}`).delete().then(() => {
      console.log('Document succesfully deleted!');
    }).catch(err => {
      console.log('Error removing document', err);
    });
  });

}

// Click add user button
btnAdd.addEventListener('click', () => {
  addModal.classList.add('modal-show');

  addModalForm.Nom.value = '';
  addModalForm.Prenom.value = '';
  addModalForm.Email.value = '';
  addModalForm.Date.value = '';
});

// User click anyware outside the modal
window.addEventListener('click', e => {
  if(e.target === addModal) {
    addModal.classList.remove('modal-show');
  }
  if(e.target === editModal) {
    editModal.classList.remove('modal-show');
  }
});

// Get all users


// Real time listener
db.collection('rdv').onSnapshot(snapshot => {
  snapshot.docChanges().forEach(change => {
    if(change.type === 'added') {
      renderUser(change.doc);
    }
    if(change.type === 'removed') {
      let tr = document.querySelector(`[data-id='${change.doc.id}']`);
      let tbody = tr.parentElement;
      tableUsers.removeChild(tbody);
    }
    if(change.type === 'modified') {
      let tr = document.querySelector(`[data-id='${change.doc.id}']`);
      let tbody = tr.parentElement;
      tableUsers.removeChild(tbody);
      renderUser(change.doc);
    }
  })
})

// Click submit in add modal
addModalForm.addEventListener('submit', e => {
  e.preventDefault();
  db.collection('rdv').add({
    Nom: addModalForm.Nom.value,
    Prenom: addModalForm.Prenom.value,
    Email: addModalForm.Email.value,
    Date: addModalForm.Date.value,
  });
  modalWrapper.classList.remove('modal-show');
});

// Click submit in edit modal
editModalForm.addEventListener('submit', e => {
  e.preventDefault();
  db.collection('rdv').doc(id).update({
    Nom: editModalForm.Nom.value,
    Prenom: editModalForm.Prenom.value,
    Email: editModalForm.Email.value,
    Date: editModalForm.Date.value,
  });
  editModal.classList.remove('modal-show');
  input1 = document.querySelector('.date');
});



 
