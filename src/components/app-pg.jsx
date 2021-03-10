import React, {useState, useEffect} from 'react';
import axios from 'axios';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

function AppPg() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const getPlayerData = async () => {
    try {
      const data = await axios.get("https://nba-players.herokuapp.com/players-stats");
      console.log(data);

      setPlayers(data.data);
      setLoading(true);
      console.log(loading);

    } catch (e) {
      console.log(e);
    }
  };

  const columns = [
    { datafield: "name", text: "Player Name" },
    { datafield: "points_per_game", text: "Points Per Game" },
    { datafield: "team_name", text: "Team Name" },
  ]

  useEffect(() => {
    getPlayerData();
  }, []);

  return (
    <div className="App">
      {loading ? (<BootstrapTable
        keyField="name"
        data={players}
        columns={columns}
        pagination={paginationFactory()}
      ></BootstrapTable>)
        :
        (<div className="spinner-border"></div>)
      }
    </div>
    
  );
};

export default AppPg;