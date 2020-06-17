import React, { useState, useEffect } from 'react';
import Form from "@rjsf/core";
import logo from './logo.svg';
import './App.css';
import schemaJsonDummy from './data/widgets-schema.json';
// import Form from "@rjsf/material-ui";
import uischemaJsonDummy from './data/widgets-uischema.json';

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

const ParagraphWidget = (props) => {
  return (
    <span className="paragraph-text">
      {props.schema.title}
    </span>
  );
};

const HeaderWidget = (props) => {
  return (
    <h1>
      {props.schema.title}
    </h1>
  );
};

const widgets = {
  "headerWidget": HeaderWidget,
  "paragraphWidget": ParagraphWidget
};

function App() {
  const [schemaJson, setSchemaJson] = useState(null);
  const [uischemaJson, setUischemaJson] = useState(null)

  //GET MAIN SCHEMA
  useEffect(() => {
    fetch("https://jsonblob.com/api/jsonBlob/8b1b60e1-b054-11ea-affd-818691b22a4f", {  //https://api.jsonbin.io/b/5ede8568655d87580c4657a5/1
      method: "GET",
      // headers: {
      //   'secret-key': '$2b$10$CVyurT605WspzyhHa6OOJ.Hjb59rV6ljBG10FMFBH5L2GglzxvSfu'
      // }
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
    fetch("https://jsonblob.com/api/jsonBlob/d48b6da4-b054-11ea-affd-d5ed9a0df7ef", {  //https://api.jsonbin.io/b/5ee7543e0e966a7aa369bcc7
      method: "GET",
      // headers: {
      //   'secret-key': '$2b$10$CVyurT605WspzyhHa6OOJ.Hjb59rV6ljBG10FMFBH5L2GglzxvSfu'
      // }
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
            widgets={widgets}
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
