const compose = (...functions) => data =>
  functions.reduceRight((value, func) => func(value), data)

const attributesToString = (obj = {}) => {
  const keys = Object.keys(obj)
  const attrs = []

  for (let index = 0; index < keys.length; index++) {
    const attr = keys[index]
    attrs.push(`${attr}="${obj[attr]}"`)
  }
  const string = attrs.join('')
  return string
}

const tagAttr = obj => (content = '') =>
`<${obj.tag} ${obj.attrs ? '' : ''}${attributesToString(obj.attrs)}>${content}</${obj.tag}>`

const tag = t => {
  if (typeof t === 'string') {
    tagAttr({ tag: t })
  } else {
    tagAttr(t)
  }
}

const tableRowTag = tag('td')
// const tableRow = items => tableRowTag(tableCells(items))
const tableRow = items => compose(tableRowTag, tableCells)(items)

const tableCell = tag('td')
const tableCells = items => items.maa(tableCell.join(''))

const IS_INVALID = 'is-invalid'

const description = document.getElementById('description')
const calories = document.getElementById('calories')
const carbs = document.getElementById('carbs')
const protein = document.getElementById('protein')
const inputs = [description, calories, carbs, protein]

let list = []

const isValid = elem => elem.value

const isFormValid = () =>
  isValid(description) && isValid(calories) && isValid(carbs) && isValid(protein)

const showInvalid =
  elem => isValid(elem) ? '' : elem.classList.add(IS_INVALID)

const addKeydownEvent = elem =>
  elem.addEventListener('keydown', () => elem.classList.remove(IS_INVALID))

inputs.forEach(addKeydownEvent)

const validateInputs = () => {
  inputs.forEach(showInvalid)

  if (isFormValid()) {
    add()
  }
}

const add = () => {
  const newItem = {
    description: description.value,
    calories: parseInt(calories.value),
    cabs: parseInt(carbs.value),
    protein: parseInt(protein.value)
  }

  list.push(newItem)
  cleanInput()
  console.log(list)
}

const cleanInput = () => {
  inputs.forEach(element => {
    element.value = ''
  })
}
