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
      <td>${doc.data().Tel}</td>
      <td>${doc.data().Email}</td>
      <td>${doc.data().Emplacement}</td>
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
    editModalForm.Tel.value = doc.data().Tel;
    editModalForm.Email.value = doc.data().Email;
    editModalForm.Emplacement.value = doc.data().Emplacement;

  });

  // Click delete user
  const btnDelete = document.querySelector(`[data-id='${doc.id}'] .btn-delete`);
  btnDelete.addEventListener('click', () => {
    
    db.collection('entreprise').doc(`${doc.id}`).delete().then(() => {
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
  addModalForm.Tel.value = '';
  addModalForm.Email.value = '';
  addModalForm.Emplacement.value = '';
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
db.collection('entreprise').onSnapshot(snapshot => {
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
  db.collection('entreprise').add({
    Nom: addModalForm.Nom.value,
    Tel: addModalForm.Tel.value,
    Email: addModalForm.Email.value,
    Emplacement: addModalForm.Emplacement.value,
  });
  modalWrapper.classList.remove('modal-show');
});

// Click submit in edit modal
editModalForm.addEventListener('submit', e => {
  e.preventDefault();
  db.collection('entreprise').doc(id).update({
    Nom: editModalForm.Nom.value,
    Tel: editModalForm.Tel.value,
    Email: editModalForm.Email.value,
    Emplacement: editModalForm.Emplacement.value,
  });
  editModal.classList.remove('modal-show');
 
});



 
