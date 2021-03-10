// //import logo from './logo.svg';
import './App.css';
// import AppPg from './components/app-pg';

// function App() {
//   return (
//     <div className="App">
//       <h1>teste</h1>
//       <AppPg></AppPg>
//     </div>
//   );
// }

// export default App;
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';

//import Accordian from './components/Accordian/index'

function App() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);
  const getPlayerData = async () => {
    try {
      const data = await axios.get("https://nba-players.herokuapp.com/players-stats");
      console.log(data);

      setPlayers(data.data);
      setLoading(true);
      //console.log(loading);

    } catch (e) {
      console.log(e);
    }
  };

  const columns = [
    { dataField: "name", text: "Player Name" },
    { dataField: "points_per_game", text: "Points Per Game" },
    { dataField: "team_name", text: "Team Name" },
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
        (<div className="spinner-border text-danger">
          
          loading</div>)
      }
     
    </div>
    
  );
};

export default App;