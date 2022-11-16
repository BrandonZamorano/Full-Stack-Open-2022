import { useState , useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import PhoneBook from './components/PhoneBook'
import personService from './services/person'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchFilter, setSearchFilter] = useState('')
  
  useEffect(() => {
    console.log('useEffect()');
    personService.getAll()
    .then(initialPersons => setPersons(initialPersons))
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
    
    personService.create(personObject).then(personReturned => {
      setPersons([...persons, personReturned])

      setNewName('');
      setNewNumber('');
    })

  }
  
  const deletePerson = (id,name) => {
    // find person with matching name
    // const person = persons.find(person => person.id === id);
    // send delete request
    //
      //
      const shouldDelete = window.confirm(`Delete ${name}?`);
      if (!shouldDelete) {
        return;
      }

      setPersons(persons.filter(person => person.id !== id));
    personService.remove(id).then(response => {
      console.log("Delete response: ", response);
    })
    // filter out deleted person
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
      <PhoneBook persons={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App
