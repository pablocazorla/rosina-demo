const locations = {
  1: {
    id: 1,
    name: "Peluquería",
    color: "#00a9ff",
  },
  2: {
    id: 2,
    name: "Gabinete",
    color: "#b800ff",
  },
};

export const locationsList = Object.values(locations);
export const locationOptions = locationsList.map(({ id, name, color }) => {
  return {
    value: `${id}`,
    text: name,
    color,
  };
});

export default locations;
