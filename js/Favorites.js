import { GithubUser } from "./GithubUser.js"

export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root)

    this.tbody = this.root.querySelector('table tbody')

    this.load()
  }

  load() {
    this.entries = JSON.parse(localStorage.getItem('@github-favorites:')) || []
  }

  save() {
    localStorage.setItem('@github-favorites:', JSON.stringify(this.entries))
  }

  async add(username){
    try{

      const userExist = this.entries.find(entry => entry.login === username)

      if(userExist) {
        throw new Error('User already registered')
      }

      const user = await GithubUser.search(username)

      if(user.login === undefined){
        if( this.entries.length === 0) {
          this.haveFavorites()
        } 

        throw new Error('User not found!')
      }

      this.entries = [user, ...this.entries]
      this.update()
      this.save()

    }catch(error){
      alert(error.message)
    }
  }

  delete(user) {
    const filteredEntries = this.entries
    .filter(entry => entry.login !== user.login)

    this.entries = filteredEntries
    this.update()
    this.save()
  }
}

export class FavoritesView extends Favorites {
  constructor(root) {
    super(root)

    this.tbody = this.root.querySelector('table tbody')

    this.noLine = document.querySelector('.noLine')

    this.update()
    this.onadd()
  }

  onadd() {
    const addButtonHover = this.root.querySelector('.addButtonHover')
    addButtonHover.onclick = () => {
      const { value } = this.root.querySelector('.search input')

      const inputText = this.root.querySelector('.search input')

      this.add(value)
      inputText.value = ""
      if( this.entries.length === 0) {
        this.noFavorite()
      } 
    }
  }

  update() {
    this.removeAllTr()

    this.entries.forEach( user => {
      const row = this.createRow()

      row.querySelector('.user img').src = `https://github.com/${user.login}.png`
      row.querySelector('.user img').alt = `Imagem de ${user.name}`
      row.querySelector('.user a').href = `https://github.com/${user.login}`
      row.querySelector('.user p').textContent = user.name
      row.querySelector('.user span').textContent = user.login
      row.querySelector('.repositories').textContent = user.public_repos
      row.querySelector('.followers').textContent = user.followers

      row.querySelector('.remove').onclick = () => {
        const isOk = confirm('Tem certeza que deseja deletar essa linha')
        if(isOk){
          this.delete(user)
          
          if( this.entries.length === 0) {
            this.haveFavorites()
          } 
          
        }
      }

      this.tbody.append(row)
    })
  }

  createRow() {
    const tr = document.createElement('tr')

    const content = `
    <td class="user">
    <img src="https://github.com/MvriloNascimento.png" alt="Imagem de maykbrito">
    <a href="https://github.com/MvriloNascimento" target="_blank">
      <p>Mayk Brito</p>
      <span>maykbrito</span>
    </a>
  </td>
  <td class="repositories">
    76
  </td>
  <td class="followers">
    0
  </td>
  <td>
    <button class="remove">&times;</button>
  </td>
`
    tr.innerHTML = content

    return tr
  }

  removeAllTr() {
    this.tbody.querySelectorAll('tr').forEach((tr) => {
      tr.remove()
    })
  }


  noFavorite() {
    this.noLine.classList.add("hidden")
  }

  haveFavorites() {
    this.noLine.classList.remove("hidden")
  }
  

  mauseSobreBotao() {
    this.addButton.addEventListener(("mouseover", function()  {console.log('hi')}))
  }

}