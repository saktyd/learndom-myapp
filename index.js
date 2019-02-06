const textNotesDOM = document.getElementById('myUL');

let nextId = 1;

const MyNotes = {
  notes: [],

  display: (data = MyNotes.notes) => {
    textNotesDOM.innerHTML = '';
    var txt = document.createTextNode('\u00D7');
    data.forEach(element => {
      const liDOM = document.createElement('li');

      liDOM.innerHTML = `<span ${element.completed ? 'class="completed"' : ''}
            onclick="MyNotes.toggleCompleted(${element.id})">${
        element.text
      }</span>
            <span class="edit" onclick="MyNotes.editTask(${
              element.id
            })">✎</span>
            <span class="close" onclick="MyNotes.removeTask(${
              element.id
            })">✖</span>`;

      textNotesDOM.appendChild(liDOM);
    });
  },

  newElement: () => {
    event.preventDefault();

    const newNotes = {
      id: nextId,
      text: document.getElementById('myInput').value,
      completed: false
    };
    let textForm = document.getElementById('myInput').value;
    if (textForm !== '') {
      MyNotes.notes.push(newNotes);
      MyNotes.display();
      document.getElementById('myInput').value = '';
      nextId++;
    }
  },

  editTask: id => {
    const notesEdit = prompt('Edit your task...');

    if (notesEdit !== null) {
      const modifiedNotes = MyNotes.notes.map(note => {
        if (note.id === id) {
          note.text = notesEdit;
        }
        return note;
      });
      MyNotes.notes = modifiedNotes;
      MyNotes.display();
    }
  },

  removeTask: id => {
    const deleteNote = MyNotes.notes.filter(note => {
      return note.id !== id;
    });
    MyNotes.notes = deleteNote;
    MyNotes.display();
  },

  searchTask: () => {
    event.preventDefault();
    const keyword = document.getElementById('search-text').value;

    const foundTasks = MyNotes.notes.filter(item => {
      return item.text.toLowerCase().includes(keyword.toLowerCase());
    });

    MyNotes.display(foundTasks);
  }
};

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener(
  'click',
  function(ev) {
    if (ev.target.tagName === 'LI') {
      ev.target.classList.toggle('checked');
    }
  },
  false
);
MyNotes.display();
