const _apartmentTypes = [
    {
        checked: false,
        name: "Family",
        label: "Family",
      },
      {
        checked: false,
        name: "Bachelor",
        label: "Bachelor",
      },
      {
        checked: false,
        name: "Sublet",
        label: "Sublet",
      },
]

const _budget = {
    min: 1000,
    max: 99999
}
const _area = {
    min: 100,
    max: 20000
}

const _beds = [
    {checked: false, name: "1", label: "1"},
    {checked: false, name: "2", label: "2"},
    {checked: false, name: "3", label: "3"},
    {checked: false, name: "4", label: "4"},
    {checked: false, name: "5", label: "5"},
    {checked: false, name: "5+", label: "5+"},
]

const _baths = [
    {checked: false, name: "1", label: "1"},
    {checked: false, name: "2", label: "2"},
    {checked: false, name: "3", label: "3"},
    {checked: false, name: "4", label: "4"},
    {checked: false, name: "4+", label: "4+"},
]

module.exports = {
    _apartmentTypes,
    _beds,
    _baths,
    _budget,
    _area
}