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

const _facilities = [
    {
        checked: false,
        name: "Gas",
        label: "Gas",
      },
      {
        checked: false,
        name: "Internet",
        label: "Internet",
      },
      {
        checked: false,
        name: "Electricity",
        label: "Electricity",
      },
      {
        checked: false,
        name: "Elevator",
        label: "Elevator",
      },
]

const _keywords = [
    {
        checked: false,
        name: "Near Park",
        label: "Near Park",
      },
      {
        checked: false,
        name: "Near Hospital",
        label: "Near Hospital",
      },
      {
        checked: false,
        name: "Residential Area",
        label: "Residential Area",
      },
      {
        checked: false,
        name: "Near Metro Rail",
        label: "Near Metro Rail",
      },
]

const _budget = {
    min: 3000,
    max: 99999
}
const _area = {
    min: 500,
    max: 20000
}

const _beds = [
    {checked: false, name: "1", label: "1"},
    {checked: false, name: "2", label: "2"},
    {checked: false, name: "3", label: "3"},
    {checked: false, name: "4", label: "4"},
    {checked: false, name: "5", label: "4+"},
]

const _baths = [
    {checked: false, name: "1", label: "1"},
    {checked: false, name: "2", label: "2"},
    {checked: false, name: "3", label: "3"},
    {checked: false, name: "4", label: "3+"},
]
// 93, 91    6,9
const _pageHeight = "93vh"
const _mapWidth = "33.33%"
const _pageMargin = "6vh"
const _appBarHeight = "6vh"
const apartmentTypeMapping = {
  1: "Family",
  2: "Bachelor",
  3: "Sublet",
}

module.exports = {
    _apartmentTypes,
    _beds,
    _baths,
    _budget,
    _area,
    _facilities,
    _keywords,
    _pageHeight,
    _mapWidth,
    _pageMargin,
    _appBarHeight,
    apartmentTypeMapping
}