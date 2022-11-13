import axios from 'axios'

const incidentThreshold = 10;

const incidents = async (userLatitude, userLongitude) => {
  const queryString =
    userLatitude +
    "%7C" +
    userLongitude +
    "&radius=10&incidentoutputfields=All&incidenttype=Incidents,RoadWeather&locale=en";

  var config = {
    method: "get",
    url: queryString,
    headers: {
      Authorization:
        "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcHBJZCI6InNqcDVkaGcyZzIiLCJ0b2tlbiI6eyJpdiI6IjhiNjFiMGI4N2NlMTg3MjI1MGY5ODU1OWExZmJhMGQzIiwiY29udGVudCI6ImEwNWFmNmRlODY2ZDdmY2JhOTk5NTdhN2U3OTU1YjA5YzQ3NWQ3ODEzMmIxNGI0NTBiMjMyZDhjZWM5YmM5ZWJkZDY1NzI3YmE4NTRmZjc4NGVlZjZjMjNlNDY2MmIyZWUzNjZmNmYzNWE3MjkxNDYzZmUyOGMyNWI3OWYyNGEzMzcyOWQ3MDhmMTQxN2I5YWE3ZWVhOTMyMWUzZTM1NTJjYjZlYzMxMDRjNzlmYjUwZDM2YWYwOTRmNjk5OTI0MTFmOWIxOGIyODdhZGVhNjFmNmIzZmI4ZDRmZDk5YjJlYWUzMzlkYzI1NDE0MGQ0NjY0NzAzNGE1YmM2YzlhOWIzZjdmMDAxYmZiYmE4Y2ExNjA4NGE3ZjQ5Y2I1ZjEzZTM0ODE3NjNmYmU0YmY0YzQ0OGJmMDkxNDVkODI1YzE0ZDZhMzBiNzBiOTU0NzFjZmZlYjMxN2QyZjNjZGE3MzA4YjZlMGQ4YWNlNWYyZjZkMzFmNGY0OTVjY2EzYjdmZDQ5OGRkODc1NDQ1ODMwZjExMjBkZjZjN2U4NmU0NDI5Y2IzOTE4OWI0ZjhjOTk1YjZmYjYxMWYxZDEyZWQxNTQ4ZTFmMDEwMDhkMzNlMDZlNDg1NjI1ZDUyNGNkOGIwMGVkMDBkMjkxNmI1MTY5MTQ5ZjhkZmI2MmQwMjVkYjdlODFmYzIyYmQ5MDY2ZDJjMDBiN2U2ZmM0ZmYwNmFjOTA5MzUyYjYwN2QwNDRjOTY4YTg5MmIzNjk1OGNhYjViNDY5ZjJmOTIzYWJlMjI1OTc5NDgyZGRlMjRhNDhmZjI2NGZjYTRkN2FkMjI0ZjVhMGQ0NmIxN2MxODNhYjdlZTRjY2Q2NGY5MTRhYTRmZjY1ZTExNTA4In0sInNlY3VyaXR5VG9rZW4iOnsiaXYiOiI4YjYxYjBiODdjZTE4NzIyNTBmOTg1NTlhMWZiYTBkMyIsImNvbnRlbnQiOiJiMjY2ZjlkNWM5NWI1ODkyYjVjNjQ0ZGVlMDg5NjY2ZGQyNWFlOTg3NGZhODI5M2QxODI4MmVkNmNjOTc4YWViYTE3NzUwN2FmMTA4ZTI0MDQ4YzQ2OTFkIn0sImp0aSI6ImM3NWQyYTZmLTAxZDMtNDE4Ni1hZWFmLTNkZDAyYmFmZjM5NiIsImlhdCI6MTY2ODMzNjI1OCwiZXhwIjoxNjY4MzM5ODU4fQ.0qwpOprSVpNhiB5CsLRuB5ctrBS6aJhpbWYb1IyeaBg",
    },
  };

  try {
    const response = await axios(config);
    const result = response.data.result;
    console.log(result.incidents)
    for (const incident of result.incidents) {
      const id = incident.id;
      const severity = incident.severity;
      const status = incident.status;

      const latitude = incident.geometry.coordinates[1];
      const longitude = incident.geometry.coordinates[0];

      const description = incident.descriptions[0].desc;
      const eventText = incident.parameterizedDescription.eventText;

      const distance = await routing(
        userLatitude,
        userLongitude,
        latitude,
        longitude
      );

      if (distance <= incidentThreshold) {
        return true
      }
      else{
        return false
      }
    }
  } catch (err) {
    console.error(err);
    return true
  }
};

const routing = async (userLatitude, userLongitude, latitude, longitude) => {
  var query =
    "https://api.iq.inrix.com/findRoute?wp_1=" +
    userLatitude +
    "%2C" +
    userLongitude +
    "&wp_2=" +
    latitude +
    "%2C" +
    longitude +
    "&format=json";

  var config2 = {
    method: "get",
    url: query,
    headers: {
      Authorization:
        "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcHBJZCI6InNqcDVkaGcyZzIiLCJ0b2tlbiI6eyJpdiI6IjhiNjFiMGI4N2NlMTg3MjI1MGY5ODU1OWExZmJhMGQzIiwiY29udGVudCI6ImEwNWFmNmRlODY2ZDdmY2JhOTk5NTdhN2U3OTU1YjA5YzQ3NWQ3ODEzMmIxNGI0NTBiMjMyZDhjZWM5YmM5ZWJkZDY1NzI3YmE4NTRmZjc4NGVlZjZjMjNlNDY2MmIyZWUzNjZmNmYzNWE3MjkxNDYzZmUyOGMyNWI3OWYyNGEzMzcyOWQ3MDhmMTQxN2I5YWE3ZWVhOTMyMWUzZTM1NTJjYjZlYzMxMDRjNzlmYjUwZDM2YWYwOTRmNjk5OTI0MTFmOWIxOGIyODdhZGVhNjFmNmIzZmI4ZDRmZDk5YjJlYWUzMzlkYzI1NDE0MGQ0NjY0NzAzNGE1YmM2YzlhOWIzZjdmMDAxYmZiYmE4Y2ExNjA4NGE3ZjQ5Y2I1ZjEzZTM0ODE3NjNmYmU0YmY0YzQ0OGJmMDkxNDVkODI1YzE0ZDZhMzBiNzBiOTU0NzFjZmZlYjMxN2QyZjNjZGE3MzA4YjZlMGQ4YWNlNWYyZjZkMzFmNGY0OTVjY2EzYjdmZDQ5OGRkODc1NDQ1ODMwZjExMjBkZjZjN2U4NmU0NDI5Y2IzOTE4OWI0ZjhjOTk1YjZmYjYxMWYxZDEyZWQxNTQ4ZTFmMDEwMDhkMzNlMDZlNDg1NjI1ZDUyNGNkOGIwMGVkMDBkMjkxNmI1MTY5MTQ5ZjhkZmI2MmQwMjVkYjdlODFmYzIyYmQ5MDY2ZDJjMDBiN2U2ZmM0ZmYwNmFjOTA5MzUyYjYwN2QwNDRjOTY4YTg5MmIzNjk1OGNhYjViNDY5ZjJmOTIzYWJlMjI1OTc5NDgyZGRlMjRhNDhmZjI2NGZjYTRkN2FkMjI0ZjVhMGQ0NmIxN2MxODNhYjdlZTRjY2Q2NGY5MTRhYTRmZjY1ZTExNTA4In0sInNlY3VyaXR5VG9rZW4iOnsiaXYiOiI4YjYxYjBiODdjZTE4NzIyNTBmOTg1NTlhMWZiYTBkMyIsImNvbnRlbnQiOiJiMjY2ZjlkNWM5NWI1ODkyYjVjNjQ0ZGVlMDg5NjY2ZGQyNWFlOTg3NGZhODI5M2QxODI4MmVkNmNjOTc4YWViYTE3NzUwN2FmMTA4ZTI0MDQ4YzQ2OTFkIn0sImp0aSI6ImM3NWQyYTZmLTAxZDMtNDE4Ni1hZWFmLTNkZDAyYmFmZjM5NiIsImlhdCI6MTY2ODMzNjI1OCwiZXhwIjoxNjY4MzM5ODU4fQ.0qwpOprSVpNhiB5CsLRuB5ctrBS6aJhpbWYb1IyeaBg",
    },
  };

  try {
    const response = await axios(config2);
    const distance = response.data.result.trip.routes[0].totalDistance;

    return distance;
  } catch (err) {
    // console.log(err);
  }
};

export default incidents;