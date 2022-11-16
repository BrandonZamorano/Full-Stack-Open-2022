import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import PhoneBook from './components/PhoneBook'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchFilter, setSearchFilter] = useState('')
  
  const personsToShow = searchFilter.length > 0 ? persons.filter(
    person => person.name.toLowerCase().includes(searchFilter.toLowerCase())
  )
  : persons;

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }
  
  const handleSearchFilterChange = (event) => {
    setSearchFilter(event.target.value);
  }

  const addNewPerson = (event) => {
    event.preventDefault();

    // check if person with name already exists
    if (persons.find(person => person.name === newName)) {
      //   issue a warning if already exists

      alert(`${newName} is already added to the phonebook`)
      setNewName('');
      setNewNumber('');
      return;
    }


    const personObject = {
      name: newName,
      number: newNumber
    }

    setPersons(
      [
        ...persons,
        personObject
      ]
    )
    setNewName('');
    setNewNumber('');
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchFilter={searchFilter} handleSearchFilterChange={handleSearchFilterChange} />

      <h2>add a new</h2>
      <PersonForm
        addNewPerson={addNewPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <PhoneBook persons={personsToShow} />
    </div>
  )
}

export default App
