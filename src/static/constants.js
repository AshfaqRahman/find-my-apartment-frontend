
const _apartmentTypes = [
  "Family",
  "Bachelor",
  "Sublet",
];



const _facilities = [
  "security",
  "parking",
  "elevator",
  "outdoor space",
  "laundry",
  "wifi",
  "air conditioning",
  "maintenance",
  "rooftop",
  "wheelchair accessibility",
  "swimming pool",
  "playground",
  "generator",
];

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
];

const _budget = {
  min: 3000,
  max: 99999,
};
const _area = {
  min: 500,
  max: 20000,
};

const _beds = [
  { checked: false, name: "1", label: "1" },
  { checked: false, name: "2", label: "2" },
  { checked: false, name: "3", label: "3" },
  { checked: false, name: "4", label: "4" },
  { checked: false, name: "5", label: "4+" },
];

const _baths = [
  { checked: false, name: "1", label: "1" },
  { checked: false, name: "2", label: "2" },
  { checked: false, name: "3", label: "3" },
  { checked: false, name: "4", label: "3+" },
];

const apartmentTypeMapping = {
  1: "Family",
  2: "Bachelor",
  3: "Sublet",
};

// 94, 91    6,9
const _pageHeight = "94vh";
const _mapWidth = "33.33%";
const _pageMargin = "6vh";
const _appBarHeight = "7vh";
const _loaderStyle = {
  color: "inherit",
  height: "7px",
  position: "fixed",
  mt: "6px",
  width: "100%",
  zIndex: "10000",
};

const _color = {
  primary: "#ffffff",
  secondary: "#474747",
  background_left: "#D8D8D8",
  background_middle: "#fcf5f5",
  background_right: "#D8D8D8",
  background_upper: "#00000020",
  background_lower: "#ffffff20",
};

const _centeringStyle = {
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const _divRadius = "25px";
const _cardRadius = "12px";

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
  apartmentTypeMapping,
  _color,
  _loaderStyle,
  _centeringStyle,
  _divRadius,
  _cardRadius,
};
