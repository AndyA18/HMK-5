
const update = document.querySelector('#update-button')

update.addEventListener('click', _ => {
  fetch('/foods', {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Food Master',
      food: 'Pizza',
    }),
  })
    .then(res => {
      if (res.ok) return res.json()
    })
    .then(response => {
      window.location.reload(true)
    })
    .catch(error => console.error(error))
})

const deleteButton = document.querySelector('#delete-button')
const messageDiv = document.querySelector('#message')

deleteButton.addEventListener('click', _ => {
  fetch('/foods', {
    method: 'delete',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Food Master',
      food: 'Pizza'
    })
  })
    .then(res => {
      if (res.ok) return res.json()
    })
    .then(response => {
      if (response === 'No Food Master Pizza to delete') {
        messageDiv.textContent = 'No Pizza to delete'
      } else {
        window.location.reload(true)
      }
    })
})
