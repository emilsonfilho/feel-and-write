import initialDatabase from './initialDatabaseStructure.js'
import Log from './log.js'

document.getElementById('access').addEventListener("click", () => {

Log('SUCCESS', 'Script chamado com sucesso')

const database = JSON.parse(localStorage.getItem('database') || JSON.stringify(initialDatabase))
console.log("Database", database)

const email = document.getElementById('email').value

console.log('Input email', email)

if (database.users.findIndex(user => user.email === email) === -1) {
  Log('SUCCESS', "Não há registros no banco. Registro liberado.")
  
  const password_1 = document.getElementById('password').value
  const password_2 = document.getElementById('confirmPassword').value

  if (password_1 === password_2) {
    Log('SUCCESS', 'As senhas batem')
  } else {
    Log('ERROR', 'As senhas diferem-se')
  }
} else {
  Log('ERROR', 'Usuário já registrado no banco de Usuário')
}


})

