import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Tooltip } from "@mui/material";
import {
  faBolt,
  faCloudSun,
  faElevator,
  faPersonSwimming,
  faScrewdriverWrench,
  faShieldHalved,
  faShower,
  faSquareParking,
  faWheelchair,
  faWifi,
} from "@fortawesome/free-solid-svg-icons";

import DryCleaningIcon from "@mui/icons-material/DryCleaning";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import RoofingIcon from "@mui/icons-material/Roofing";
import { _facilities } from "@/static/constants";

export default function FacilitiesIconsComponent(props: any) {
  let facilities = _facilities.map((facility: any) =>
    props.facilities.includes(facility)
  );
  let facilitiesIcons: any = {};
  _facilities.forEach((facility: any, index: number) => {
    facilitiesIcons[facility] = facilities[index];
  });
  let margin = 3;
  let color = "#2ea300";
  return (
    <>
      {Object.keys(facilitiesIcons).map((facility: any, index: number) => {
        if (facilitiesIcons[facility]) {
          let x =
            facility === "security" ? (
              <Tooltip title={facility} key={index}>
                <FontAwesomeIcon
                  style={{ margin: margin }}
                  icon={faShieldHalved}
                  size="xl"
                  color={color}
                />
              </Tooltip>
            ) : facility === "parking" ? (
              <Tooltip title={facility} key={index}>
                <FontAwesomeIcon
                  style={{ margin: margin }}
                  icon={faSquareParking}
                  size="xl"
                  color={color}
                />
              </Tooltip>
            ) : facility === "elevator" ? (
              <Tooltip title={facility} key={index}>
                <FontAwesomeIcon
                  style={{ margin: margin }}
                  icon={faElevator}
                  size="xl"
                  color={color}
                />
              </Tooltip>
            ) : facility === "outdoor space" ? (
              <Tooltip title={facility} key={index}>
                <FontAwesomeIcon
                  style={{ margin: margin }}
                  icon={faCloudSun}
                  size="xl"
                  color={color}
                />
              </Tooltip>
            ) : facility === "laundry" ? (
              <Tooltip title={facility} key={index}>
                <DryCleaningIcon style={{ margin: margin, color: color }}  />
              </Tooltip>
            ) : facility === "wifi" ? (
              <Tooltip title={facility} key={index}>
                <FontAwesomeIcon
                  style={{ margin: margin }}
                  icon={faWifi}
                  size="xl"
                  color={color}
                />
              </Tooltip>
            ) : facility === "air conditioning" ? (
              <Tooltip title={facility} key={index}>
                <AcUnitIcon style={{ margin: margin, color: color }} />
              </Tooltip>
            ) : facility === "maintenance" ? (
              <Tooltip title={facility} key={index}>
                <FontAwesomeIcon
                  style={{ margin: margin }}
                  icon={faScrewdriverWrench}
                  size="xl"
                  color={color}
                />
              </Tooltip>
            ) : facility === "rooftop" ? (
              <Tooltip title={facility} key={index}>
                <RoofingIcon style={{ margin: margin, color: color }} />
              </Tooltip>
            ) : facility === "wheelchair accessibility" ? (
              <Tooltip title={facility} key={index}>
                <FontAwesomeIcon
                  style={{ margin: margin }}
                  icon={faWheelchair}
                  size="xl"
                  color={color}
                />
              </Tooltip>
            ) : facility === "swimming pool" ? (
              <Tooltip title={facility} key={index}>
                <FontAwesomeIcon
                  style={{ margin: margin }}
                  icon={faPersonSwimming}
                  size="xl"
                  color={color}
                />
              </Tooltip>
            ) : facility === "playgrounds" ? (
              <Tooltip title={facility} key={index}>
                <img
                  style={{ margin: margin }}
                  src="/playground-cropped.svg"
                  height={30}
                  color={color}
                  alt="playground"
                  
                />
              </Tooltip>
            ) : facility === "generator" ? (
              <Tooltip title={facility} key={index}>
                <FontAwesomeIcon
                  style={{ margin: margin }}
                  icon={faBolt}
                  size="xl"
                  color={color}
                />
              </Tooltip>
            ) : (
              <Box key={index} />
            );

          return x;
        } else {
          return <Box key={index}/>;
        }
      })}
    </>
  );
}
