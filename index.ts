const fs = require('fs')

const lerArquivo = (): unknown => { // não tenho certeza do que virá no arquivo, então deixo como unknown para definir depois
  const arquivo = fs.readFileSync('./bd.json')
  return JSON.parse(arquivo)
}

const escreverArquivo = (dados: any): void => {
  fs.writeFileSync('./bd.json', JSON.stringify(dados))
}

//const dados = lerArquivo() as string[] // agora que sei que o tipo é um array de strings (após leitura dele), eu posso definir ele como array!
//
//dados.push('João')
//escreverArquivo(dados)
//
//console.log(lerArquivo())

type Endereco = {
  cep: string,
  rua: string,
  complemento?: string,
  bairro: string,
  cidade: string
}

type Usuario = {
  nome: string,
  email: string,
  cpf: string,
  profissao?: string, // ?: significa que ele pode não existir - pode ser passado ou não, não é obrigatório.
  endereco: Endereco | null // usa o type Endereco feito antes, para organizar melhor, se não passado o endereco tenho que passar null
}

const cadastrarUsuario = (dados: Usuario): Usuario => {
  const bd = lerArquivo() as Usuario[]

  bd.push(dados)

  escreverArquivo(bd)

  return dados
}

const listarUsuarios = (profissao?: string): Usuario[] => { // posso passar o filtro de profissão ou não, é opcional
  const bd = lerArquivo() as Usuario[]
  if (profissao) {
    const usuarios = bd.filter(usuario => {
      return usuario.profissao === profissao
    })
  
    if (usuarios.length === 0) {
      throw new Error('Profissão não encontrada')
    }
  
    return usuarios
  }
  return bd
}

//console.log(listarUsuarios('profissão teste 1'))

// const usuarioTeste = cadastrarUsuario({
//   nome: 'Usuario Teste',
//   email: 'teste@teste.com',
//   cpf: '00000000000',
//   profissao: 'profissão teste 1',
//   endereco: {
//     cep: '12345-678',
//     rua: "rua a",
//     complemento: 'casa azul',
//     bairro: 'centro',
//     cidade: 'Porto Alegre'
//   }
// })

// const usuarioTeste2 = cadastrarUsuario({
//   nome: 'Usuario Teste 2',
//   email: 'teste@teste.com',
//   cpf: '00000000001',
//   endereco: null
// })



const detalharUsuario = (cpf: string): Usuario => {
  const bd = lerArquivo() as Usuario[]

  const usuario = bd.find(usuario => {
    return usuario.cpf === cpf
  })
  
  if (!usuario) {
    throw new Error('Usuário não encontrado')
  }

  return usuario
}

const atualizarUsuario = (cpf: string, dados: Usuario): Usuario => {
  const bd = lerArquivo() as Usuario[]

  const usuario = bd.find(usuario => {
    return usuario.cpf === cpf
  })
  
  if (!usuario) {
    throw new Error('Usuário não encontrado')
  }
  Object.assign(usuario, dados) // método que altera um destino com base em uma nova origem (destino: usuario, origem: dados)
  
  escreverArquivo(bd)
  
  return dados
}

const usuarioAtualizado: Usuario = {
  nome: 'Usuario atualizado',
  email: 'teste@atualizado.com',
  cpf: '00000000001',
  endereco: null
}

//console.log(atualizarUsuario('00000000001', usuarioAtualizado))


const excluirUsuario = (cpf: string): Usuario => {
  const bd = lerArquivo() as Usuario[]

  const usuario = bd.find(usuario => {
    return usuario.cpf === cpf
  })
  
  if (!usuario) {
    throw new Error('Usuário não encontrado')
  }

  const exclusao = bd.filter(usuario => { // pega todos os cpfs que são DIFERENTES DO CPF passado como parametro
    return usuario.cpf !== cpf
  })

  escreverArquivo(exclusao) //ATUALIZA O BANCO DE DADOS COM OS CPFS ENCONTRADOS NO FILTER, sobescreve!!!! 

  return usuario // retorna o objeto que foi excluido, mas no banco ele já não existe mais
}

//console.log(excluirUsuario('00000000001'))


