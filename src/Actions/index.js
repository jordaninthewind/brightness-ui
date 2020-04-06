const BASE_URL = "http://localhost:4000";
const UNAVAILABLE_ERROR = "The light is unavailable, please try again.";

const graphQlFetch = (query) => {
  return fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });
};

// gets initial state to set UI to current values
export const getLightState = () => {
  const query = `
    query {
        light {
            id
            name
            on
            brightness
        }
    }
    `;

  try {
    const state = graphQlFetch(query).then((res) => res.json());

    if (state.error)
      throw new Error(UNAVAILABLE_ERROR);

    return state;
  } catch (err) {
    return err;
  }
};

// toggles light on/off
export const toggleLight = async (bool) => {
  const query = `
    mutation {
        turnOnOffLight(on: ${bool}) {
            __typename
        }
    }
    `;

  try {
    const state = await graphQlFetch(query);
    const {
      data: {
        changeLightBrightness: { __typename },
      },
    } = await state.json();

    if (__typename == "LightUnavailable") throw new Error(UNAVAILABLE_ERROR);

    return state;
  } catch (err) {
    return { error: err };
  }
};

// takes in value from slider to pass to endpoint
export const updateBrightness = async (value) => {
  const query = `
    mutation {
        changeLightBrightness(brightness: ${value}) {
            __typename
        }
    }
    `;

  try {
    const state = await graphQlFetch(query);
    const {
      data: {
        changeLightBrightness: { __typename },
      },
    } = await state.json();

    if (__typename == "LightUnavailable") throw new Error(UNAVAILABLE_ERROR);

    return state;
  } catch (err) {
    return { error: err };
  }
};
