import { FavoritesView } from "./Favorites.js";

const app = new FavoritesView('#app')

const addButton = document.querySelector('.search button')
const addButtonHover = document.querySelector('.addButtonHover')


if( app.entries.length === 0) {
  app.noLine.classList.remove("hidden")
} 

addButton.addEventListener('mouseover', changeButton)
addButtonHover.addEventListener('mouseout', defoultButton)

function changeButton() {
  addButton.classList.add('hidden')
  addButtonHover.classList.remove('hidden')
}

function defoultButton() {
  addButton.classList.remove('hidden')
  addButtonHover.classList.add('hidden')
}