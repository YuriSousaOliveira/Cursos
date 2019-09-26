//Aplicação com ES6+
import api from './api'

class App {
	constructor() {
		this.repositories = []

		this.formEl = document.getElementById('repo-form')
		this.inputEl = document.querySelector('input[name=repository]')
		this.listEl = document.getElementById('repo-list')

		this.registerHandlers()
	}

	registerHandlers() {
		this.formEl.onsubmit = event => this.addRepository(event)
	}

	setLoading(loading = true) {
		if (loading === true) {
			let loadingEl = document.createElement('span')
			loadingEl.appendChild(document.createTextNode('Carregando'))
			loadingEl.setAttribute('id','loading')

			this.formEl.appendChild(loadingEl)
		} else {
			document.getElementById('loading').remove()
		}
	}

	async addRepository(event) {
		event.preventDefault()

		const repoInput =  this.inputEl.value

		if (repoInput.length === 0) 
			return

		this.setLoading()

		try {
			const response = await api.get(`/users/${repoInput}`)

			console.log(response)

			const {name, location, html_url, avatar_url } = response.data

			this.repositories.push({
				name,
				description: location,
				avatar_url,
				html_url,
			})

			this.inputEl.value = ''

			this.render()
		} catch (err) {
			alert('O Usuario não existe')
		}

		this.setLoading(false)

	}

	render() {
		this.listEl.innerHTML = ''
		this.repositories.forEach(repo => {
			let imgEl = document.createElement('img')
			imgEl.setAttribute('src', repo.avatar_url)	

			let titleEl = document.createElement('strong')
			titleEl.appendChild(document.createTextNode(repo.name))

			let descriptionEl = document.createElement('p')
			descriptionEl.appendChild(document.createTextNode(repo.description))

			let linkEl = document.createElement('a')
			linkEl.setAttribute('target','_blank')
			linkEl.setAttribute('href', repo.html_url)	
			linkEl.appendChild(document.createTextNode("Acessar"))

			let listItemEl = document.createElement('li')
			listItemEl.appendChild(imgEl)
			listItemEl.appendChild(titleEl)
			listItemEl.appendChild(descriptionEl)
			listItemEl.appendChild(linkEl)

			this.listEl.appendChild(listItemEl)
		})
	}
}

new App()

//Axios
/*import axios from 'axios'

class Api {
	static async getUserInfo(username) {
		try { 
			const response = await axios.get(`https://api.github.com/users/${username}`)
			console.log(response)
		} catch (err) {
			console.warn('Usuario não existe')
		}
	}
}

Api.getUserInfo('YuriSousaOliveira')*/

//Async/await
/*const minhaPromise = () => new Promise((resolve, reject) => {
	setTimeout(() => { resolve('OK') }, 2000) 
})

minhaPromise()
.then(response => {
	console.log(response)
})
.catch(err => {
	console.log('Erro')
})

async function executaPromise() {
	console.log(await minhaPromise())
	console.log(await minhaPromise())
	console.log(await minhaPromise())
	console.log(await minhaPromise())
}

const executaPromise2 = async () => {
	console.log(await minhaPromise())
	console.log(await minhaPromise())
	console.log(await minhaPromise())
	console.log(await minhaPromise())
}

executaPromise2()*/

//Import/Export de Funções
/*import * as funcoes from './funcoes'

console.log(funcoes.sub(1,2))

import somaFunction, { sub } from './funcoes'

console.log(somaFunction(1,2))
console.log(sub(4,2))*/

//Import de Função utilizando o WebPack
/*import { soma } from './funcoes'
console.log(soma(1,2))*/

//Object Short Syntax
/*const nome = 'Yuri'
const idade = 22

const usuario = {
	nome,
	idade,
	empresa: 'Rocketseat'
}

console.log(usuario)*/

// Template Literals
/*const nome = 'Yuri'
const idade = 22

console.log('Meu nome é ' + nome + ' e tenho ' + idade + ' anos')
console.log(`Meu nome é ${nome} e tenho ${idade} anos`)*/

// Operadores rest/spread
// REST
/*const usuario = {
	nome: 'Diego',
	idade: 23,
	empresa: 'Rocketseat'
}

const { nome, ...resto } = usuario

console.log(nome)
console.log(resto)

const arr = [1, 2, 3, 4]
const [a, b, ...c] = arr

console.log(a)
console.log(b)
console.log(c)

function soma(...params) {
	return params.reduce((total, next) => total + next)
}

console.log(soma(1,3,4))

function soma2(a, b, ...params) {
	return params
}

console.log(soma2(1,3,4))

// SPREAD
const arr1 = [1, 2, 3]
const arr2 = [4, 5, 6]

const arr3 = [...arr1, ...arr2]

console.log(arr3)

const usuarios = {
	nome: 'Yuri',
	idade: 22,
	empresa: 'Rocketseat',
}

const usuario2 = {...usuarios, nome:'Jorge'}

console.log(usuario2)*/

// Desestruturação
/*const usuario = {
	nome: 'Yuri',
	idade: 22,
	endereco: {
		cidade: 'Rio de Janeiro',
		estado: 'Niteroi',
	},
}

const { nome, idade, endereco: {cidade} } = usuario

console.log(nome)
console.log(idade)
console.log(cidade)

function mostraNome({nome, idade}) {
	console.log(nome, idade)
}

mostraNome(usuario)*/

// Valores Padrão
/*function soma(a = 3, b = 6) {
	return a + b
}

console.log(soma(1))
console.log(soma())

const somas = (a = 3, b = 6) => a + b

console.log(somas(1))
console.log(somas())*/

// Arrow Functions
/*const arr = [1, 3, 4, 5, 6]

const newArr = arr.map(item => item * 2)

console.log(newArr)

const teste = () => ({nome: 'Yuri'})

console.log(teste())*/

// Operações em Array
/*const arr = [1, 3, 4, 5, 8, 9]

const newArr = arr.map(function(item){
	return item * 2
})

console.log(newArr)

const sumArr = arr.reduce(function(total, next){
	return total + next
})

console.log(sumArr)

const filterArr = arr.filter(function(item){
	return item % 2 === 0
})

console.log(filterArr)

const findArr = arr.find(function(item){
	return item === 9
})

console.log(findArr)*/

// CONST & LET
/*const usuario = {nome: 'Diego'}
usuario.nome = 'Cleiton'

console.log(usuario)

function teste(x) {
	let y = 2;

	if (x > 5) {
		let y = 4

		console.log(x, y)
	}
}

teste(10)/*

// CLASSES
// Gerar TO DOS direto sem que seja integrado.

/*class Matematica {
	static soma(a,b) {
		return a + b
	}
}

console.log(Matematica.soma(1,2))

class TodoList {
	constructor() {
		this.todos = []
	}

	static addTodo() {
		this.todos.push('Novo todo')
		console.log(this.todos)
	}
}

TodoList.addTodo()
TodoList.addTodo()
TodoList.addTodo()
TodoList.addTodo() */

// Gerar TO DOS com Metodo Constructor Integrado.
/*
class List {
	constructor() {
		this.data = []
	}

	add(data) {
		this.data.push(data)
		console.log(this.data)
	}
}

class TodoList extends List{
	constructor() {
		super() //Chama constructor da propriedade pai

		this.usuario = 'Diego'
	}

	mostraUsuario() {
		console.log(this.usuario)
	}
}

const MinhaLista = new TodoList()

document.getElementById('novotodo').onclick = function() {
	MinhaLista.add('Novo Todo')
}

MinhaLista.mostraUsuario() */