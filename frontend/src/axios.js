import axios from 'axios';

const findIncident = async (lat, long) => {
  console.log(lat, long)
  // axios.post(process.env.SERVER_URL, {lat, long})
  // .then((res)=>{
  //   console.log(res)
  //   return true
  // })

  return true
}

export {findIncident}