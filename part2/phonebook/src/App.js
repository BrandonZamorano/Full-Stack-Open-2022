import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const addNewPerson = (event) => {
    event.preventDefault();

    // check if person with name already exists
    if (persons.find(person => person.name === newName)) {
      //   issue a warning if already exists

      alert(`${newName} is already added to the phonebook`)
      setNewName('');
      return;
    }


    const personObject = {
      name: newName
    }

    setPersons(
      [
        ...persons,
        personObject
      ]
    )
    setNewName('');
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNewPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => (
        <p key={person.name}>{person.name}</p>
      ))}
    </div>
  )
}

export default App
