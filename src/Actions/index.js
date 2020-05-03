const BASE_URL = process.env.REACT_APP_BASE_URL;
const UNAVAILABLE_ERROR = "The light is unavailable, please try again.";

const graphQlFetch = (query) => {
  return fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });
};

// gets initial state to set UI to current values
export const getLightState = async () => {
  const query = `
    query {
        light {
            id
            name: label
            on: power
            brightness
        }
    }
    `;

  try {
    const state = await graphQlFetch(query).then((res) => res.json());

    if (state.error) throw new Error(UNAVAILABLE_ERROR);

    return state;
  } catch (err) {
    return err;
  }
};

// toggles light on/off
export const turnLightOnOff = async (bool) => {
  const query = `
    mutation {
      turnOnOffLight(on: ${bool}) {
        __typename
          ... on LightUnavailable {
            message
          }
          ... on TurnOnOffLightSuccess {
            light {
              power
            }
          }
        }
      }
    `;

  try {
    const state = await graphQlFetch(query).then((res) => res.json());

    if (state.__typename === "LightUnavailable")
      throw new Error(UNAVAILABLE_ERROR);

    return state;
  } catch (error) {
    return { error };
  }
};

// takes in value from slider to pass to endpoint
export const updateBrightness = async (value) => {
  const query = `
    mutation {
        changeLightBrightness(brightness: ${value}) {
          __typename 
          ... on LightUnavailable {
            message
          }
          ... on ChangeLightBrightnessSuccess {
            light {
              brightness
            }
          }
        }
      }
    `;

  try {
    const state = await graphQlFetch(query).then((res) => res.json());

    if (state.__typename === "LightUnavailable")
      throw new Error(UNAVAILABLE_ERROR);

    return state;
  } catch (err) {
    return { error: err };
  }
};

// takes in value from color picker to pass to endpoint
export const changeLightColor = async (value) => {
  console.log(value)
  const query = `
    mutation {
        changeLightColor(color: "${value}") {
          __typename
          ... on LightUnavailable {
            message
          }
          ... on ChangeLightColorSuccess {
            light {
              name: label
              brightness
              color {
                hue
              }
            }
          }       
        }
      }
    `;

  try {
    const state = await graphQlFetch(query).then((res) => res.json());

    if (state.__typename === "LightUnavailable")
      throw new Error(UNAVAILABLE_ERROR);

    return state;
  } catch (err) {
    return { error: err };
  }
};
