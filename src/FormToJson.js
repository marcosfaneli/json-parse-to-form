// eslint-disable-next-line no-restricted-globals
import React from 'react';
import Field from './Field';
import NewField from './NewField';

const styles = {}

export default function JsonToForm({ json, setJson, ignoredFields, factory }) {

  const getListIgnoredFields = () => {
    return ignoredFields || [];
  };

  const newArrayObject = (key) => {
    const a = factory(key);

    return a ? a : {};
  };

  const renderItemArray = (element, index, array, setArray) => {

    const setElement = (value) => {
      const newArray = [...array];
      newArray.slice(index, 1);
      newArray[index] = value;
      setArray(newArray);
    }

    const removeElement = () => {
      const newArray = [...array];
      newArray.splice(index, 1);
      setArray(newArray);
    }

    return (
      <div key={`box-${index}`} style={styles.box}>
        <div>
          {renderObject(element, setElement)}
        </div>
        <div>
          <button key={index} onClick={() => removeElement()}>Delete Item</button>
        </div>
      </div>
    );
  };

  const addArrayObject = (key, array, setArray) => {
    const newArray = [...array];
    newArray.push(newArrayObject(key));
    setArray(newArray);
  };

  const renderArray = (key, array, obj, setObj) => {

    const setArray = (item) => {
      const newObj = { ...obj };
      newObj[key] = item;
      setObj(newObj);
    };

    if (array.length === 0) {
      return (
        <div>
          Vazio
          <div>
            <button onClick={() => addArrayObject(key, array, setArray)}>Add {key}</button>
          </div>
        </div>
      );
    }

    return (
      <div>
        {array.map((element, index) => {
          return (renderItemArray(element, index, array, setArray));
        })}
        <div>
          <button onClick={() => addArrayObject(key, array, setArray)}>Add {key}</button>
        </div>
      </div>
    )
  };

  const renderSubObject = (key, value, obj, setObj) => {

    const setItem = (item) => {
      const newObj = { ...obj };
      newObj[key] = item;
      setObj(newObj);
    };

    return (
      <div style={styles.box} key={key}>
        <span><strong>{key}</strong></span>
        <div>{renderObject(value, setItem)}</div>
        <div>
          <NewField key={key} obj={value} setObj={setItem} />
        </div>
      </div>);
  };

  const renderGroupArray = (key, value, obj, setObj) => {
    return (
      <div style={styles.box} key={key}>
        <span>
          <strong>{key}</strong>
        </span>
        {renderArray(key, value, obj, setObj)}
      </div>);
  };

  const renderObject = (obj, setObj) => {

    const setItem = (item) => {
      const newObj = { ...item };
      setObj(newObj);
    };

    if (!obj) {
      return (<div>Não definido</div>);
    }

    const items = Object.entries(obj);

    if (items.length === 0) {
      return (<div>Vazio</div>);
    }

    return (
      items.map(([key, value]) => {
        if (getListIgnoredFields().includes(key)) {
          return null;
        }
        if (typeof value === 'object') {
          if (Array.isArray(value)) {
            return (renderGroupArray(key, value, obj, setItem));
          }
          return (renderSubObject(key, value, obj, setItem));
        }

        return (<Field key={key} label={key} value={value} setItem={setItem} item={obj} />);
      })
    );
  };

  const renderJson = () => {
    if (json) {
      return (
        <div>
          {renderObject(json, setJson)}
          <div>
            <NewField obj={json} setObj={setJson} />
          </div>
        </div>);
    }

    return (<h2>Objeto não encontrado/inválido</h2>);
  }

  return (
    <div style={styles.boxContainer}>
      {renderJson()}
    </div>
  );
}
