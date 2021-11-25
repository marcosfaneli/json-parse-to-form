# Json-Parse-To-Form
Parse a JSON to a dynamic form, allowing to change values on JSON

  ## How to user


  ## Instalation


  First install the dependency:

  ``` $ npm install @marcosfaneli/json-to-form``` 

  Them import the dependency in your project

  ```import JsonToForm from '@marcosfaneli/json-to-form'```


  ## Usage

  ```
  function App() {
    const [data, setData] = useState({ name: "John", surname: "Doe", age: "25"})
    return (
      <FormToJson 
        json={data} 
        setJson={setData} 
        ignoredFields={[age]}
      />)
  }
```


## [WIP]

## factory

Routine to permit insert a new object on array 

Example:

```
const factoryObjects = {
  docs: {
    type: '', number: '', 
  }
}

function App() {
    const [data, setData] = useState({ name: "John", surname: "Doe", age: "25", docs: []})

    const getFactory(valueType) => {
      return factoryObjects[valueType]
    }

    return (
      <FormToJson 
        json={data} 
        setJson={setData} 
        ignoredFields={[age]}
        factory={getFactory}
      />)
}
```