import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import FormToJson from "./FormToJson";

const data = {
  name: "John",
  surname: "Doe",
  age: "25",
  docs: [
    {
      type: "passport",
      number: "123456789",
      expiration: "2021-12-31"
    },
    {
      type: "driver license",
      number: "987654321",
      expiration: "2022-12-31"
    }
  ]
};

function factory(objectName) {
  const data = {
    docs: {
      type: "",
      number: '',
      expiration: ''
    }
  };

  return data[objectName];
}

const App = () => {
  const [json, setJson] = useState(json);

  useEffect(() => {
    setJson(data);
  }, []);

  return (<div>
    <h1>FormToJson</h1>
    <FormToJson json={json} setJson={setJson} ignoredFields={['age']} factory={factory} />
  </div>)
};

ReactDOM.render(<App />, document.getElementById("app"));