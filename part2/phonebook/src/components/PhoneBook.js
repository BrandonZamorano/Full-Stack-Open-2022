import Person from "./Person";
const PhoneBook = ({persons, deletePerson}) => {

    return <>{persons.map(person => (
        <Person key={person.id}
            name={person.name}
            number={person.number}
            deletePerson={() => deletePerson(person.id, person.name)} />
    ))}
    </>
}

export default PhoneBook;