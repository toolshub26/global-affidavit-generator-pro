async function loadTemplate(country) {
  const response = await fetch(`templates/${country}.json`);
  return await response.json();
}
