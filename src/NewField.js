// eslint-disable-next-line no-restricted-globals
import React from 'react';
import { useState } from 'react';

const paddingValue = 8;
const modalSize = {
  width: (window.innerWidth / 2) - 2,
  height: (window.innerHeight / 2) - 2,
};

const styles = {
  modalBackground: {
    width: '100%',
    height: '100%',
    position: 'fixed',
    top: '0',
    left: '0',
    opacity: '0.9',
    margin: '0',
    padding: '0',
    backgroundColor: '#383838',
  },
  modal: {
    position: 'fixed',
    top: window.innerHeight / 2 - modalSize.height / 2,
    left: window.innerWidth / 2 - modalSize.width / 2,
    borderRadius: '.8rem',
    padding: `0 ${paddingValue}px`,
    transform: 'translate(-50 %, -50 %)',
    border: '1px ridge none',
    width: `${modalSize}px`,
    height: '240px',
    backgroundColor: '#fff',
    opacity: '1',
  },
  buttonBox: {
    display: 'flex',
    justifyContent: 'flex-end',
    margin: `${paddingValue}px`,
  },
  fieldBox: {
    display: 'flex',
    flexDirection: 'center',
    margin: `${paddingValue}px`,
  },
};

export default function NewField({ obj, setObj }) {

  const [fieldname, setFieldname] = useState('');
  const [fieldtype, setFieldtype] = useState('');
  const [hidden, setHidden] = useState(true);

  const createField = () => {
    console.log(fieldname, fieldtype);
    const newObj = { ...obj };
    newObj[fieldname] = fieldtype;
    setObj(newObj);
    setFieldname('');
    setFieldtype(null);
    setHidden(true);
  };

  const addField = () => {
    setHidden(false);
  };

  return (
    <>
      <button onClick={() => addField()}>Criar novo field</button>
      <div hidden={hidden} style={styles.modalBackground}>
        <div style={styles.modal}>
          <h2>New Field</h2>
          <div style={styles.fieldBox}>
            <label>
              Fieldname: <input type="text" value={fieldname} onChange={(e) => setFieldname(e.target.value)} />
            </label>
          </div>
          <div style={styles.fieldBox}>
            <label>
              Type: <select value={fieldtype} onChange={(e) => setFieldtype(e.target.value)}>
                <option value={''}>String</option>
                <option value={0}>Number</option>
                <option value={false}>Boolean</option>
                <option value={{}}>Object</option>
                <option value={[]}>Array</option>
              </select>
            </label>
          </div>
          <div style={styles.buttonBox}>
            <button onClick={() => createField()}>Add</button>
            <button onClick={() => setHidden(true)}>Cancel</button>
          </div>
        </div>
      </div>
    </>
  );
}
