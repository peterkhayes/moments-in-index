const React = require("react");

function getCategoryLookup (category) {
  switch (category.toLowerCase()) {
    case "on the floor":
      return "00";
    case "furniture":
      return "01";
    case "on the walls":
      return "02";
    default:
      throw new Error(`bad category: ${category}`);
  }

}

module.exports = function Card ({
  userId, totalUserCount, itemId, itemType, itemTypeModifier, category, categoryNum, description, nearby,
}) {
  const isLong = description.length > 400;
  const fullItemType = itemTypeModifier ? `${itemType} ${itemTypeModifier}` : itemType;
  const location = nearby.includes(",") ? `Nearby: ${nearby}` : `On: ${nearby}`;
  return (
    <div className="border" style={cardStyle}>
      <div style={idStyle}>
        {userId}.{getCategoryLookup(category)}.{categoryNum}
      </div>
      <div style={isLong ? longMainContentStyle : mainContentStyle}>
        <div>{category}</div>
        <div style={isLong ? longLocationStyle : locationStyle}>
          <div>{fullItemType}</div>
          <div style={isLong ? smallTextStyle : undefined}>{description}</div>
        </div>
        <div style={isLong ? longLocationStyle : locationStyle}>
          <div>{location}</div>
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

