/* eslint-disable no-use-before-define */
const React = require("react");

const MISSING = "[missing]";
const ON_THE_FLOOR = "on the floor";
const FURNITURE = "furniture";
const ON_THE_WALLS = "on the walls";

function getCategoryLookup (category) {
  switch (fixCategory(category).toLowerCase()) {
    case MISSING:
      return "00";
    case ON_THE_FLOOR:
      return "01";
    case FURNITURE:
      return "02";
    case ON_THE_WALLS:
      return "03";
    default:
      console.error(`bad category: ${category}`);
      return "LALALALALALALA";
  }
}

function fixCategory (category) {
  switch (category.toLowerCase()) {
    case "on the floors":
      return category.slice(0, -1);
    case "on the wall":
      return `${category}s`;
    default:
      return category;
  }
}

function getLocation (nearby) {
  if (!nearby) {
    return "";
  } else if (nearby.includes(",")) {
    return `Nearby: ${nearby}`;
  } else {
    return `On: ${nearby}`;
  }
}

export default function Card ({
  userId, totalUserCount, itemId, itemType, itemTypeModifier, category, categoryNum, description, nearby, onClick,
}) {
  const isLong = description.length > 300;
  const fullItemType = itemTypeModifier ? `${itemType} ${itemTypeModifier}` : itemType;
  return (
    <div className="border" style={cardStyle} onClick={onClick}>
      <div style={idStyle}>
        {userId}.{getCategoryLookup(category)}.{categoryNum || ""}
      </div>
      <div style={isLong ? longMainContentStyle : mainContentStyle}>
        <div>{fixCategory(category)}</div>
        <div style={isLong ? longLocationStyle : locationStyle}>
          <div>{fullItemType}</div>
          <div style={isLong ? smallTextStyle : undefined}>{description}</div>
        </div>
        <div style={isLong ? longLocationStyle : locationStyle}>
          <div>{getLocation(nearby)}</div>
        </div>
      </div>
      <div style={countStyle}>
        {Number(itemId).toString()} / {totalUserCount}
      </div>
    </div>
  );
};

const cardStyle = {
  pageBreakAfter: "always",
  width: "5in",
  height: "2.95in",
  position: "relative",
};

const mainContentStyle = {
  marginLeft: "0.8in",
  marginRight: "0.5in",
  marginTop: "0.7in",
};

const longMainContentStyle = {
  marginLeft: "0.8in",
  marginRight: "0.5in",
  marginTop: "0.5in",
};

const smallTextStyle = {
  fontSize: "10px",
};

const locationStyle = {
  marginTop: "0.25in",
};

const longLocationStyle = {
  marginTop: "0.15in",
};

const idStyle = {
  position: "absolute",
  top: "0.2in",
  left: "0.2in",
  fontSize: "10px",
};


const countStyle = {
  position: "absolute",
  bottom: "0.2in",
  right: "0.2in",
  fontSize: "10px",
};
