const fs = require('fs')

const lerArquivo = (): unknown => { // não tenho certeza do que virá no arquivo, então deixo como unknown para definir depois
  const arquivo = fs.readFileSync('./bd.json')
  return JSON.parse(arquivo)
}

const escreverArquivo = (dados: any): void => {
  fs.writeFileSync('./bd.json', JSON.stringify(dados))
}

const dados = lerArquivo() as string[] // agora que sei que o tipo é um array de strings (após leitura dele), eu posso definir ele como array!

dados.push('João')
escreverArquivo(dados)

console.log(lerArquivo())