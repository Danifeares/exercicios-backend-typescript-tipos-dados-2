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

const listarUsuarios = (): Usuario[] => {
  return lerArquivo() as Usuario[]
}

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

const usuarioTeste2 = cadastrarUsuario({
  nome: 'Usuario Teste 2',
  email: 'teste@teste.com',
  cpf: '00000000001',
  endereco: null
})

console.log(usuarioTeste2, lerArquivo())