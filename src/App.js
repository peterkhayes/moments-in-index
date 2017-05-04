import React from "react";
import Card  from "./Card";

class App extends React.Component {
  
  constructor () {
    super();
    this.state = {};
  }

  componentWillMount () {
    getSheetData()
      .then((data) => this.setState({data}))
      .catch((error) => this.setState({error}));
  }

  render() {
    const {data, error, selected} = this.state;

    if (data == null) {
      return <h1>Loading...</h1>
    } else if (error) {
      return <h1>Error: {error.message}</h1>
    } else {
      return (
        <div>
          {data
            .filter((item) => selected ? item.uniqueId === selected : true)
            .map((item) => {
              return (
                <Card
                  key={item.uniqueId}
                  {...item}
                  onClick={() => this._toggleSelected(item.uniqueId)}
                />
              )
            })
          }
        </div>
      );
    }
  }

  _toggleSelected = (selected) => {
    if (this.state.selected) {
      this.setState({selected: null});
    } else {
      this.setState({selected});
    }
  };
}

export default App;

const API_KEY = "AIzaSyDWxwtNtyWU9_zxL06pFZbqDxvytNxOuZc";
const OMITTED_SHEET_NAME = "xxx"
const SHEET_ID = "1Ofsa3XWowmmX3ji5kLKVTcZYbrcHxyqo15LOwcmdQWs";
const BASE_URL = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}`;
const QUERY = `?key=${API_KEY}`

const request = (uri) => fetch(`${BASE_URL}${uri}${QUERY}`).then((res) => res.json());

function getSheetData () {
  return request("")
    .then((data) => {
      const sheetIds = data.sheets
        .map((sheet) => sheet.properties.title)
        .filter((name) => name !== OMITTED_SHEET_NAME);
      
      const promises = sheetIds.map((sheetName) => request(`/values/${sheetName}!A2:H200`))
      return Promise.all(promises);
    })
    .then((data) => data.map((sheetData) => {
      return sheetData.values
        .map(([userId = "", itemId = "", itemType = "", itemTypeModifier = "", category = "", categoryNum = "", description = "", nearby = ""]) => ({
          userId, itemId, itemType, itemTypeModifier, category, categoryNum, description, nearby,
          totalUserCount: sheetData.values.length,
          uniqueId: `${userId}-${itemId}`,
        }))
        ;
    }))
    .then((data) => data.reduce((acc, data) => acc.concat(data), []));
}
