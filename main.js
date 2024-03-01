const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const tbody = document.querySelector("tbody");

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

async function fetchPokemonData(id) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching the API:", error);
  }
}

function displayPokemonData(data) {
  console.log(data);
  const types = data.types.map(type => capitalizeFirstLetter(type.type.name)).join(', ');
  const abilities = data.abilities.map(ability => capitalizeFirstLetter(ability.ability.name)).join(', ');
  const moves = data.moves.slice(0, 4).map(move => capitalizeFirstLetter(move.move.name)).join(', ');

  tbody.innerHTML += `
    <tr>
      <td>${data.id}</td>
      <td>${capitalizeFirstLetter(data.name)}</td>
      <td>${types}</td>
      <td>${abilities}</td>
      <td>${moves}</td>
      <td>
        <img src="${data.sprites.front_default}" style="height: 45px;"/>
      </td>
    </tr>
  `;
}

searchBtn.addEventListener("click", async () => {
  const id = searchInput.value.toLowerCase();

  fetchPokemonData(id);
  try {
    const data = await fetchPokemonData(id);
    displayPokemonData(data);
  } catch (error) {
    console.error("Error fetching the API:", error);
  }
});
