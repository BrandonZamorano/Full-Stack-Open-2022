import { useState , useEffect } from 'react'
import Filter from './components/Filter'
import Notification from './components/Notification'
import PersonForm from './components/PersonForm'
import PhoneBook from './components/PhoneBook'
import personService from './services/person'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchFilter, setSearchFilter] = useState('')
  // const [message, setMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  
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
    const person = persons.find(person => person.name === newName);
    if (person) {
      //   issue a warning if already exists

      const shouldUpdatePerson = window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)
      
      if (shouldUpdatePerson) {
        const updatedPerson = {
          ...person, 
          number: newNumber,
        }
        personService.update(person.id, updatedPerson).then(changedPerson => {
          setPersons(persons.map(person => person.id === changedPerson.id ? changedPerson : person))
          setSuccessMessage(`Updated ${changedPerson.name}'s phone number to ${changedPerson.number}`)
          setTimeout(() => {
            setSuccessMessage(null);
          }, 5000)
        }
        ).catch((error) => {
          // set error message
          setErrorMessage(`Information of ${newName} has already been removed from server`)
          // remove person from state
          setPersons(persons.filter(p => p.id !== person.id))
          
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000)
        })
      }

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
      setSuccessMessage(`Added ${personReturned.name}`)
      
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)

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
    <Notification message={successMessage || errorMessage} notificationType={errorMessage ? 'error' : null} />
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
