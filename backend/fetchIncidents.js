var axios = require("axios");

const incidentThreshold = 10;

const incidents = async () => {
  const userLatitude = 37.757386;
  const userLongitude = -122.490667;

  const queryString =
    "https://api.iq.inrix.com/v1/incidents?point=" +
    userLatitude +
    "%7C" +
    userLongitude +
    "&radius=10&incidentoutputfields=All&incidenttype=Incidents,RoadWeather&locale=en";

  var config = {
    method: "get",
    url: queryString,
    headers: {
      Authorization:
        "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcHBJZCI6InNqcDVkaGcyZzIiLCJ0b2tlbiI6eyJpdiI6Ijc2NjQxMzFlYTUyZGNjYzJiODVkNDcyNjI3YjBlYjBlIiwiY29udGVudCI6ImE4NTg1YjBhMmNhNGViOWFiZWFjMjA3MGIzMzhkOGJmNWUyOTE0NzdiZDRiZmFhNTRhMjUxZWEwNTIxOTlkZjMyZmM5NTE3ZWViZjU4ZDQwZDkyZDVhNzViYjRhYWMxOGEwOTEzMTYwN2UxNjJjMjA5MzNmYTkwODI3MzY5ZWIyYWRjOWI1NzZhYzFmMzU1OWVlNjA0N2JhY2U1OWQ1N2QxNTZkZjE0OGU3NGQyMzcyYWYyMGZiNjUxZDZhYjQ2ODA4ZjM2N2FlMmFjNGMwNWExYWVhYmU1MDg3ZDYzZWI2ODVjOGQxZmYxZjk5MjU2MDBjODlhOTQ0ZDZjMWE3NTA1NGUxNzEzMGI0MDEzZDM3ZmY2NTg0OTNkYjIxYjA2YTI0OTJjNmM5NjdiMzEwMGJlNmM5MTdkNGJhYjQwNmNiODZiMDBjMjQzMjhjNGZkNWYzN2E2NDkzZmFmYzk0YjdmNzdmOTU4NjMxMWNkNzdmOTY2NzI4YWZkMjhmNDFkNTk0NDM1NmY5MjY5ZDZmMTAwOGMwOWRkNDA3YTc5YWZhYjk4ZjJlMDUyZGMzZDczODYxZWVjZmYwZDQ5OGVkZDM1YzVhNGRhZGNhZTlhMGU3ZmYxYmEyZmE2MGZmZWRkNWNmZjk0ZGY5ZWY1ZmQxNDhkMmE5NTEzODdiMGIxYzQ0NTI0YjcxNmFhMjU5MjI1Nzc2YWJjNTE2N2U3MjFhODU4NGM4MjkwYzA2MTUyMjk5M2ZiZmRkOWUyMTQ2YWI1NjEwYWRkZDBhMzU3MTg3YmE3YzljNmFiOGRhMjkzM2FhM2RhZWM1OWRkZTIzNDRmNWZhNGJhMjk5Mjk4M2Q4MmM1MzdkYTE2NjM1YjVjYzMyYzdhMjhlIn0sInNlY3VyaXR5VG9rZW4iOnsiaXYiOiI3NjY0MTMxZWE1MmRjY2MyYjg1ZDQ3MjYyN2IwZWIwZSIsImNvbnRlbnQiOiI5Zjc1NDA1NTI2ODJkOGE1YzI5NTVmNmJkMjEzZjhlNTYyMDQxNzRhYjA1N2RjZDgxMDIyMTNlMTVlMDViZGU1MzNjNjZkMTc4OGEwYTQ1ZWZiN2U2NTRiIn0sImp0aSI6IjJiNjFkMjIzLWI2NTQtNDY1ZS05NDFmLTdkMWI4NDAwNjY2NiIsImlhdCI6MTY2ODMwMDY4MywiZXhwIjoxNjY4MzA0MjgzfQ.Dxpz95QZryjCfw4hN0OEL8479WolbXOAnvupSF2PxR0",
    },
  };

  try {
    const response = await axios(config);
    const result = response.data.result;

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
        //send to frontend;
        break;
      }
    }
  } catch (err) {
    // console.log(err);
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
        "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcHBJZCI6InNqcDVkaGcyZzIiLCJ0b2tlbiI6eyJpdiI6Ijc2NjQxMzFlYTUyZGNjYzJiODVkNDcyNjI3YjBlYjBlIiwiY29udGVudCI6ImE4NTg1YjBhMmNhNGViOWFiZWFjMjA3MGIzMzhkOGJmNWUyOTE0NzdiZDRiZmFhNTRhMjUxZWEwNTIxOTlkZjMyZmM5NTE3ZWViZjU4ZDQwZDkyZDVhNzViYjRhYWMxOGEwOTEzMTYwN2UxNjJjMjA5MzNmYTkwODI3MzY5ZWIyYWRjOWI1NzZhYzFmMzU1OWVlNjA0N2JhY2U1OWQ1N2QxNTZkZjE0OGU3NGQyMzcyYWYyMGZiNjUxZDZhYjQ2ODA4ZjM2N2FlMmFjNGMwNWExYWVhYmU1MDg3ZDYzZWI2ODVjOGQxZmYxZjk5MjU2MDBjODlhOTQ0ZDZjMWE3NTA1NGUxNzEzMGI0MDEzZDM3ZmY2NTg0OTNkYjIxYjA2YTI0OTJjNmM5NjdiMzEwMGJlNmM5MTdkNGJhYjQwNmNiODZiMDBjMjQzMjhjNGZkNWYzN2E2NDkzZmFmYzk0YjdmNzdmOTU4NjMxMWNkNzdmOTY2NzI4YWZkMjhmNDFkNTk0NDM1NmY5MjY5ZDZmMTAwOGMwOWRkNDA3YTc5YWZhYjk4ZjJlMDUyZGMzZDczODYxZWVjZmYwZDQ5OGVkZDM1YzVhNGRhZGNhZTlhMGU3ZmYxYmEyZmE2MGZmZWRkNWNmZjk0ZGY5ZWY1ZmQxNDhkMmE5NTEzODdiMGIxYzQ0NTI0YjcxNmFhMjU5MjI1Nzc2YWJjNTE2N2U3MjFhODU4NGM4MjkwYzA2MTUyMjk5M2ZiZmRkOWUyMTQ2YWI1NjEwYWRkZDBhMzU3MTg3YmE3YzljNmFiOGRhMjkzM2FhM2RhZWM1OWRkZTIzNDRmNWZhNGJhMjk5Mjk4M2Q4MmM1MzdkYTE2NjM1YjVjYzMyYzdhMjhlIn0sInNlY3VyaXR5VG9rZW4iOnsiaXYiOiI3NjY0MTMxZWE1MmRjY2MyYjg1ZDQ3MjYyN2IwZWIwZSIsImNvbnRlbnQiOiI5Zjc1NDA1NTI2ODJkOGE1YzI5NTVmNmJkMjEzZjhlNTYyMDQxNzRhYjA1N2RjZDgxMDIyMTNlMTVlMDViZGU1MzNjNjZkMTc4OGEwYTQ1ZWZiN2U2NTRiIn0sImp0aSI6IjJiNjFkMjIzLWI2NTQtNDY1ZS05NDFmLTdkMWI4NDAwNjY2NiIsImlhdCI6MTY2ODMwMDY4MywiZXhwIjoxNjY4MzA0MjgzfQ.Dxpz95QZryjCfw4hN0OEL8479WolbXOAnvupSF2PxR0",
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

//const
incidents();
