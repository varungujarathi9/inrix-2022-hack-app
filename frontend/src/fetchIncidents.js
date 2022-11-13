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
        "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcHBJZCI6InNqcDVkaGcyZzIiLCJ0b2tlbiI6eyJpdiI6IjhhNTlmZmFlNTJmNzdkZmNjYzg5ZGE2Mjc2NjBmZjgyIiwiY29udGVudCI6Ijg5MGRmMDk3YmNjMDc3MGQ3ODcyZGQ5MDE2NTE4NmE1MjYwZjY4MWE4NTcyZjkzOWFhYTY4NDg0YzY0MTQ4ODc4MjU5OGEwYmFmNzE4MGI4ZDA4MDYwOWUzODAyZjZlZGIyYzY5Nzk2ZjVlODM4ZjQ0NmQzZjJhNmRiOTUyMjlmMWMxYjIwZDdhN2EyZmI4YzM1ZGM4YmFjZGIyNjY5OTI1OTExNTc2OGFkNzk4ZTlmOWU5NDI0OWQzMjZiNWNmZWQwMDVlYmU0ZWY2Njk3NGNhNjRkMzkxN2YwMDhkZDRlZDJjNjI5OTM0NjA3YmI5NTViMjBiNWM0MmViMTJiMzA5NzU0ZmMyYjg4Y2QwNzUxYWUyZmQyNGNmODJhMDM4OTE3YjM0NDgwNDFiMjk4MWJlNmRkY2I1NTYzMjBmMmUzZDcyMTIyMjk2MTMxN2ViZmU1MzZkZDQwZjM5ZTBiZmUxOWZjOGE1YWNjNzM5YzliYmZjNDk0YzQ3OTJkNzIxYjU3NTAyNTM0MTk0N2FjNTQ4YTI3OTU2NzRjOTIzNmZkNDcxYjcxMmZmZTU5ODFmMjRkN2ZmNTYwZTlhMTA1OWFhNzI3NTc5YjhmMjk5ZGUzNjJjZmFjMWM4OWM1YTUwMGYyYjQyMmRiNmIyN2Y2OWU3MzAyMzgzZWFlNDczOWNjMzJiMThkOTNmZGM0YTE3YzhiYjNiNGFmMDZmMjNhODAxNzJmYmZhOTAzNmI1OTg2N2YwNDJmNzk2NzA5M2NjOGQyZTBkMzY3MTI3YTRiNGI3MDFhMmM3NDMyNGU4OTI2YjdkOTQ5NjA0Zjg4N2E3MDJhZTY3ZmE3MmFiNDMzMGNmYjdkYzQ5ZjAwNDk4ZGFiM2Q4ZjkwIn0sInNlY3VyaXR5VG9rZW4iOnsiaXYiOiI4YTU5ZmZhZTUyZjc3ZGZjY2M4OWRhNjI3NjYwZmY4MiIsImNvbnRlbnQiOiI5YzMyZjA5Mjg5YjE1MDE1MDQzMWVmZWQ3NDU4OTZkNjNlNTc0MjVlYWY1OWRlNDNhMGE2ZmFmMGJhMWE0MWFjOTg0M2YyN2JmMDc5YWZhN2NjOTY0N2EwIn0sImp0aSI6IjI3NTliZWVmLWMyZjYtNDg5ZC1iYmZlLWM2ZmQ4YWIxNmJjMiIsImlhdCI6MTY2ODMyOTUzOSwiZXhwIjoxNjY4MzMzMTM5fQ.-8KXLY2YT8l1-6nhE1ulR0-j9U4Grv-Bh2dr2PoL4As",
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
    return false
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
        "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcHBJZCI6InNqcDVkaGcyZzIiLCJ0b2tlbiI6eyJpdiI6IjhhNTlmZmFlNTJmNzdkZmNjYzg5ZGE2Mjc2NjBmZjgyIiwiY29udGVudCI6Ijg5MGRmMDk3YmNjMDc3MGQ3ODcyZGQ5MDE2NTE4NmE1MjYwZjY4MWE4NTcyZjkzOWFhYTY4NDg0YzY0MTQ4ODc4MjU5OGEwYmFmNzE4MGI4ZDA4MDYwOWUzODAyZjZlZGIyYzY5Nzk2ZjVlODM4ZjQ0NmQzZjJhNmRiOTUyMjlmMWMxYjIwZDdhN2EyZmI4YzM1ZGM4YmFjZGIyNjY5OTI1OTExNTc2OGFkNzk4ZTlmOWU5NDI0OWQzMjZiNWNmZWQwMDVlYmU0ZWY2Njk3NGNhNjRkMzkxN2YwMDhkZDRlZDJjNjI5OTM0NjA3YmI5NTViMjBiNWM0MmViMTJiMzA5NzU0ZmMyYjg4Y2QwNzUxYWUyZmQyNGNmODJhMDM4OTE3YjM0NDgwNDFiMjk4MWJlNmRkY2I1NTYzMjBmMmUzZDcyMTIyMjk2MTMxN2ViZmU1MzZkZDQwZjM5ZTBiZmUxOWZjOGE1YWNjNzM5YzliYmZjNDk0YzQ3OTJkNzIxYjU3NTAyNTM0MTk0N2FjNTQ4YTI3OTU2NzRjOTIzNmZkNDcxYjcxMmZmZTU5ODFmMjRkN2ZmNTYwZTlhMTA1OWFhNzI3NTc5YjhmMjk5ZGUzNjJjZmFjMWM4OWM1YTUwMGYyYjQyMmRiNmIyN2Y2OWU3MzAyMzgzZWFlNDczOWNjMzJiMThkOTNmZGM0YTE3YzhiYjNiNGFmMDZmMjNhODAxNzJmYmZhOTAzNmI1OTg2N2YwNDJmNzk2NzA5M2NjOGQyZTBkMzY3MTI3YTRiNGI3MDFhMmM3NDMyNGU4OTI2YjdkOTQ5NjA0Zjg4N2E3MDJhZTY3ZmE3MmFiNDMzMGNmYjdkYzQ5ZjAwNDk4ZGFiM2Q4ZjkwIn0sInNlY3VyaXR5VG9rZW4iOnsiaXYiOiI4YTU5ZmZhZTUyZjc3ZGZjY2M4OWRhNjI3NjYwZmY4MiIsImNvbnRlbnQiOiI5YzMyZjA5Mjg5YjE1MDE1MDQzMWVmZWQ3NDU4OTZkNjNlNTc0MjVlYWY1OWRlNDNhMGE2ZmFmMGJhMWE0MWFjOTg0M2YyN2JmMDc5YWZhN2NjOTY0N2EwIn0sImp0aSI6IjI3NTliZWVmLWMyZjYtNDg5ZC1iYmZlLWM2ZmQ4YWIxNmJjMiIsImlhdCI6MTY2ODMyOTUzOSwiZXhwIjoxNjY4MzMzMTM5fQ.-8KXLY2YT8l1-6nhE1ulR0-j9U4Grv-Bh2dr2PoL4As",
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