import React, { useState, useEffect } from 'react';
import Form from "@rjsf/core";
import logo from './logo.svg';
import './App.css';
// import schemaJson from './data/widgets-schema.json';
// import Form from "@rjsf/material-ui";
import uischemaJson from './data/widgets-uischema.json';

// const Form = JSONSchemaForm.default;
// const schema = {
//   title: "Todo",
//   type: "object",
//   required: ["title"],
//   properties: {
//     title: {type: "string", title: "Title", default: "A new task"},
//     done: {type: "boolean", title: "Done?", default: false}
//   }
// };

const log = (type) => console.log.bind(console, type);

function ObjectFieldTemplate({ TitleField, properties, title, description }) {
  return (
    <div className="container-fluid">
      <div className="row">
        <TitleField title={title} />
      </div>
      <div className="row">
        <div dangerouslySetInnerHTML={{ __html: description }} />
      </div>
      <div className="row">
        {properties.map(prop => {
          return prop.content;
        })}
      </div>
    </div>
  );
}

function App() {
  const [schemaJson, setSchemaJson] = useState(null);
  const [uischemaJson, setUischemaJson] = useState(null)

  //GET MAIN SCHEMA
  useEffect(() => {
    fetch("https://api.jsonbin.io/b/5ede8568655d87580c4657a5/1", {
      method: "GET",
      headers: {
        'secret-key': '$2b$10$CVyurT605WspzyhHa6OOJ.Hjb59rV6ljBG10FMFBH5L2GglzxvSfu'
      }
    })
      .then(res => res.json())
      .then(
        (result) => {
          // setIsLoaded(true);
          setSchemaJson(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          // setIsLoaded(true);
          // setError(error);
        }
      )

      //GET UI-SCHEMA
      fetch("https://api.jsonbin.io/b/5ee7543e0e966a7aa369bcc7", {
      method: "GET",
      headers: {
        'secret-key': '$2b$10$CVyurT605WspzyhHa6OOJ.Hjb59rV6ljBG10FMFBH5L2GglzxvSfu'
      }
    })
      .then(res => res.json())
      .then(
        (result) => {
          setUischemaJson(result);
        },
        (error) => {
          // setError(error);
        }
      )
      
  }, [])

  return (
    // <div className='App'>
    // <div style={{ padding: "60px 40px" }}>
    <div className="container">
      <div className="row">
        <div style={{ marginTop: 15 }} />
        {schemaJson != null && uischemaJson != null &&
          <Form
            schema={schemaJson}
            uiSchema={uischemaJson}
            showErrorList={false}
            onSubmit={({ formData }) => {
              console.log("formData", formData);
            }}
            onError={log("errors")}
            ObjectFieldTemplate={ObjectFieldTemplate}
            noHtml5Validate>
            <div className="text-center">
              <button type="submit" style={{ paddingLeft: 25, paddingRight: 25, paddingTop: 5, paddingBottom: 5, fontSize: "1.5em" }} className="btn btn-success">Submit</button>
            </div>
          </Form>
        }
        <div style={{ marginBottom: 30 }} />
      </div>
    </div>
    // </div>
    // </div>
  );
}

export default App;
