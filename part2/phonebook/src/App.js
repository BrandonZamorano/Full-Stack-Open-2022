import { useState , useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import PhoneBook from './components/PhoneBook'

import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchFilter, setSearchFilter] = useState('')
  
  useEffect(() => {
    console.log('useEffect()');
    axios.get("http://localhost:3001/persons").then(
      response => {
        setPersons(response.data)
      }
    )
  }, [])
  
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
