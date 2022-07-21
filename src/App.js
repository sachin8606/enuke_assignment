import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import TableRow from './Common/TableRow';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
function App() {

  const [data, setdata] = useState([])
  const [isLoading, setisLoading] = useState(false)

  // Dates

  const [datefrom, setdatefrom] = useState()
  const [dateto, setdateto] = useState()

  // Scroll related state

  const [iscrollBtnVis, setiscrollBtnVis] = useState("none")

  useEffect(() => {
    setisLoading(true)

    // calling api
    axios.get("https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo").then((res) => {
      setdata(res.data['Time Series (5min)'])
      setisLoading(false)
    }).catch(err => {
      console.log(err)
    })

    return () => document.removeEventListener('scroll', handleScroll)
  }, [])


  // Clear Filter

  const clearFilter = () => {
    setdatefrom("")
    setdateto("")
  }




  //   Generate excel sheet


  const exportToSheet = () => {
    let btn = document.getElementById("export_Btn");
    btn.innerHTML = `Generating Sheet`
  }

  function handleScroll() {
    if (window.scrollY < window.innerHeight) {
      setiscrollBtnVis("none")
    }
    else {
      setiscrollBtnVis("block")

    }
  }

  window.addEventListener('scroll', handleScroll)

  return (
    <div id="App">
      <h2 className='head_1'>Enuke Assignment</h2>
      {isLoading ? <>
        <div className="d-flex justify-content-center" id="enNewLoader" >
          <div className="spinner-border" role="status">
            <span className="sr-only"></span>
          </div>
        </div>
      </> : <>
        <div className='d-flex mb-3 justify-content-around filter_cntn'>

          {/* Date container */}
          <div className='theme-shed1 p-2'>
            <div className='m-auto mt-1'>
              <span className='dates'>From: - <input type='date' value={datefrom} onChange={(e) => setdatefrom(e.target.value)}></input></span>
              <span className='mx-2 dates'>To: - <input type='date' value={dateto} onChange={(e) => setdateto(e.target.value)}></input></span>
              <span><button className='btn_export fs-14'>Apply</button></span>
              <span><button className='btn_export fs-14 ml-1 clear_btn' onClick={() => clearFilter()}>Clear</button></span>
            </div>
          </div>

          {/* Export button */}
          <div className='p-2'>
            <button className=" btn_export fs-16 mt-1" id="export_Btn" onClick={() => exportToSheet()}>Export to Sheet</button>
          </div>
        </div>
        <table className='table_cntn table'>
          <thead>
            <tr>
              <th>Datetime</th>
              <th>Open</th>
              <th>High</th>
              <th>Low</th>
              <th>Close</th>
              <th className='fw-bold'>Volume</th>
            </tr>
          </thead>
          <tbody>

            {/* Iterating over object */}
            {Object.keys(data).map((item, index) => {
              // Assigning array to variable
              var val = Object.values(data[item])
              return (
                <TableRow
                  key={item}
                  datetime={item}
                  open={val[0]}
                  high={val[1]}
                  low={val[2]}
                  close={val[3]}
                  volume={val[4]}
                />
              )
            })


            }
          </tbody>
        </table>
        <p className="page_end_text text-center mt-4">Looks like you have reached bottom of the page</p></>}
      <div className='scrolltoptnCnt' style={{ "display": iscrollBtnVis }}>
        <a href='#App'>
          <Button variant="dark"><i className="fa fa-arrow-up" aria-hidden="true"></i></Button>
        </a>

      </div>
    </div>
  );
}

export default App;
