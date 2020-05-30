const headers = { 'Content-Type': 'application/json' };

export default async (query) => {
  const options = {
    method: 'POST',
    headers,
    body: JSON.stringify({ query }),
  };
  const res = await fetch(`${process.env.API}`, options);
  const json = await res.json();
  if (json.errors) {
    throw JSON.stringify(json.errors);
  }
  return json.data;
};
