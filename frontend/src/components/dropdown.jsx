import { useEffect, useState } from 'react';
import '../stylesheets/components.css'

function Dropdown({ title, type, options, defaultSelected, onFilter }) {
  const [selected, setSelected] = useState([])

  const onChangeSelection = (e) => {
    const selectedOptions = options.filter((_, index) => {
      return e.target[index].selected
    })

    setSelected(selectedOptions)
    onFilter(selectedOptions)
  }

  useEffect(() => {
    setSelected(defaultSelected ? defaultSelected : [])
  }, [defaultSelected])

  return (
    <div className="dropdown is-hoverable">
      <div className="dropdown-trigger">
        <button className="button" aria-haspopup="true" aria-controls="dropdown-menu4" onClick={(e) => e.preventDefault()}>
          <span>{title}</span>
          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true"></i>
          </span>
        </button>
      </div>
      <div className="dropdown-menu" id="dropdown-menu4" role="menu">
        <div className="select is-multiple">
          <select id={type} multiple size={`${options.length}`} onChange={onChangeSelection}>
            {options.map(option => {
              return (
                <option key={option.id} value={option.description} selected={selected.filter((optionSelected) => optionSelected.id === option.id).length > 0}>
                  {option.description}
                </option>
              )
            })}
          </select>
        </div>
      </div>
    </div>
  )
}

export default Dropdown;
