function updatePremium(userId, isChecked) {
  fetch(`/api/users/premium/${userId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ checkPremium: isChecked })
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        console.log('Usuario actualizado correctamente');
      } else {
        console.error('Error al actualizar el usuario');
      }
    })
    .catch(error => console.error('Error:', error));
}
