import axios from 'axios'
const { put } = require('redux-saga/effects')

// function myIP() {
  
//   if (window.XMLHttpRequest) 
//     let xmlhttp = new XMLHttpRequest();
//   else let xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");

//   xmlhttp.open("GET"," http://api.hostip.info/get_html.php ",false);
//   xmlhttp.send();

//   const hostipInfo = xmlhttp.responseText.split("n");

//   for (i=0; hostipInfo.length >= i; i++) {
//       const ipAddress = hostipInfo[i].split(":");
//       if ( ipAddress[0] == "IP" ) return ipAddress[1];
//   }

//   return false;
// }
// let url = `http://localhost:3000/api/?q=`;
// let url = `/api/?q=`;
function * getQuery (input) {
  let url = `/api/?q=`;
  if (!input.query) {
    url = `/users/?user=`;
  }
  const data = yield axios({
    method: 'get',
    url: `${url}${input.q}`,
    // url: `http://172.25.32.1:3000/api/?q=${input.q}`,
    headers: {
      mode: 'no-cors',
      'Access-Control-Allow-Origin': '*'
    }
  })
    .then(data => {
      return data.data
    })
    .catch(err => console.log(err))
    console.log("datasaga",data)
    // if (input.query) {
      yield put({ type: 'GET_QUERY_SUCCESS', data })
    // }
    //  yield put({ type: 'GET_USER_SUCCESS', data });
}

export { getQuery }
