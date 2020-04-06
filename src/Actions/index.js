const BASE_URL = "http://localhost:4000";

const graphQlFetch = (query) => {
  return fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });
};

// gets initial state to set UI to current values
export const getInitialState = () => {
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
    const state = graphQlFetch(query).then(res => res.json());

    if (state.error) throw new Error("Couldn't get current state from your light.");

    return state;
  } catch (err) {
    return err;
  }
};

// toggles light on/off
export const toggleLight = () => {};

// takes in value from slider to pass to endpoint
export const updateBrightness = (value) => {};
