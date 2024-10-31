const path = require("path") 
// Importa o módulo path do "Node.js".
// O módulo path ajuda a manipular caminhos de diretório de maneira multiplataforma, garantindo que os caminhos sejam gerados corretamente, independentemente do sistema operacional.
const HtmlWebpackPlugin = require("html-webpack-plugin")
// Importa o módulo "html-webpack-plugin".
// Este plugin simplifica a criação de um arquivo HTML que automaticamente incluirá os bundles gerados pelo Webpack (arquivos JavaScript e CSS, por exemplo).
const CopyWebpackPlugin = require("copy-webpack-plugin")
// Importa o pacote copy-webpack-plugin, permitindo que você use o plugin no arquivo de configuração do Webpack.
// Esse plugin é usado para copiar arquivos ou diretórios de uma localização para outra durante o processo de build do Webpack.

module.exports = { 
// porta a configuração do Webpack para ser utilizada durante a compilação. Este objeto contém todas as configurações necessárias para o Webpack.
  target: "web", 
  // Informa ao Webpack que o alvo da aplicação é o ambiente web, ou seja, o código será executado em navegadores.
  // Isso garante que o Webpack otimize o build de acordo com as necessidades específicas do ambiente do navegador.
  mode: "development", 
  // Define o modo de compilação como development (desenvolvimento).
  // No modo de desenvolvimento, o Webpack gera um código menos otimizado, mas que facilita a depuração (por exemplo, não minificando o código, incluindo mapas de fonte e mantendo nomes de variáveis legíveis).

  entry: path.resolve(__dirname, "src", "main.js"), 
  // Define o arquivo de entrada da aplicação.
  // 'path.resolve(__dirname, "src", "main.js")' cria um caminho absoluto até o arquivo "main.js" dentro da pasta "src".
  // O "entry" é o ponto inicial que o Webpack utiliza para construir a árvore de dependências da aplicação, a partir de onde todos os outros módulos são importados.
  output: {
    // Define as configurações de saída para o build da aplicação.
    filename: "main.js",
    // Nome do arquivo gerado que contém o bundle final.
    path: path.resolve(__dirname, "dist"),
    // Define o diretório onde o arquivo compilado será salvo, que, neste caso, é a pasta dist no mesmo nível da configuração. O path.resolve é usado para garantir que o caminho seja absoluto, evitando problemas de referência ao diretório.
  },

  devServer: {
    // Este bloco de código configura o comportamento do servidor de desenvolvimento fornecido pelo "webpack-dev-server". Ele define como o servidor deve funcionar durante o desenvolvimento, facilitando testes e atualizações automáticas.
    static: {
      // Este atributo é usado para definir de onde o servidor deve servir arquivos estáticos.
      directory: path.join(__dirname, "dist")
      // Define o diretório de onde os arquivos estáticos devem ser servidos, neste caso, a pasta "dist".
      // path.join(__dirname, "dist"): Cria um caminho absoluto até a pasta "dist". O __dirname representa o diretório atual do arquivo webpack.config.js, e path.join garante que o caminho funcione corretamente independentemente do sistema operacional.
      // A pasta "dist" contém o output gerado pelo Webpack (gerado a partir do output configurado). Assim, o servidor de desenvolvimento servirá esse conteúdo ao navegador.
    },
    port: 3000,
    // Define a porta em que o servidor de desenvolvimento será iniciado.
    // A porta padrão do webpack-dev-server é 8080, mas aqui foi configurado para rodar na porta 3000. Isso é útil para evitar conflitos caso a porta 8080 já esteja sendo usada ou simplesmente por conveniência do desenvolvedor.
    open: true,
    // Define que o navegador padrão deve ser automaticamente aberto quando o servidor iniciar.
    // Esta opção melhora a produtividade, pois elimina a necessidade de abrir manualmente o navegador e digitar a URL para acessar a aplicação durante o desenvolvimento.
    liveReload: true,
    // Habilita o live reload, ou seja, recarrega automaticamente a página no navegador sempre que um arquivo é alterado e recompilado.
    // Facilita o desenvolvimento, pois permite que você veja as mudanças feitas no código instantaneamente no navegador, sem precisar atualizar a página manualmente.
  },

  plugins: [
    // Define uma lista de plugins que o Webpack deve usar durante o processo de build.
    // Plugins são usados para estender a funcionalidade do Webpack, como a criação de arquivos HTML, otimizações de performance, e muitas outras funcionalidades.
    new HtmlWebpackPlugin({
      // Cria uma nova instância do "HtmlWebpackPlugin" e o adiciona à lista de plugins.
      // Esse plugin gera um arquivo HTML com o(s) bundle(s) resultante(s) do build, simplificando o processo de injeção dos scripts.
      template: path.resolve(__dirname, "index.html"),
      // Define um template HTML que será usado pelo plugin para criar o arquivo final.
      // path.resolve(__dirname, "index.html"): Cria um caminho absoluto para o arquivo index.html que está no mesmo diretório da configuração do Webpack.
      // O arquivo index.html fornecido como template será usado como base, e o HtmlWebpackPlugin injetará automaticamente os bundles gerados, como scripts e estilos, neste arquivo HTML.
      favicon: path.resolve("src", "assets", "Logo.svg"),
      // Define o caminho para um arquivo que será usado como favicon no HTML gerado.
      // Cria um caminho absoluto para o arquivo Logo.svg localizado dentro da pasta src/assets.
      // Essa abordagem permite fornecer um caminho absoluto para o Webpack, garantindo que o favicon seja encontrado de forma consistente, independentemente de onde o comando esteja sendo executado.
    }),
    new CopyWebpackPlugin({
      // Cria uma nova instância do "CopyWebpackPlugin" e o adiciona à lista de plugins do Webpack.
      // Essa instância especifica quais arquivos ou diretórios devem ser copiados durante o build.
      patterns: [
        // Define um array de padrões que indicam quais arquivos ou diretórios devem ser copiados e para onde.
        {
          from: path.resolve(__dirname, "src", "assets"),
          // Especifica a origem dos arquivos a serem copiados. Neste caso, está indicando a pasta "assets" dentro do diretório "src".
          // path.resolve(__dirname, "src", "assets"): Cria um caminho absoluto para a pasta assets, garantindo que a localização seja correta, independentemente do sistema operacional.
          to: path.resolve(__dirname, "dist", "src", "assets"),
          // Define o destino para onde os arquivos da pasta assets devem ser copiados, ou seja, para a pasta "dist/src/assets".
          // Isso garante que os recursos, como imagens e outros arquivos, sejam incluídos no diretório de build final, permitindo que estejam acessíveis na versão de produção do projeto.
        },
      ],
    }),
  ],

  module: {
    // Define uma lista de módulos que o Webpack deve usar durante o processo de build.
    rules: [
      // Define como o Webpack deve lidar com diferentes tipos de arquivos dentro do projeto. Dentro da propriedade rules, configuramos regras para o processamento de arquivos.
      // O Webpack por padrão não entende todos os tipos de arquivos (como .css, .js, .jpg), então precisamos definir regras para que ele saiba o que fazer com cada tipo.
      {
        test: /\.css$/,
        // Define um critério (usando uma expressão regular) para selecionar arquivos que devem ser processados.
        // A expressão regular "/\.css$/" indica que a regra deve ser aplicada a todos os arquivos que terminam com ".css". Isso garante que todos os arquivos CSS do projeto sejam processados pelas ferramentas configuradas.
        use: ["style-loader", "css-loader"], 
        // Define os loaders que serão usados para processar os arquivos que atendem ao critério test.
        // O "css-loader" lê e interpreta os arquivos CSS que foram importados no JavaScript, permitindo que o Webpack entenda o CSS e construa as dependências entre os diferentes módulos de CSS.
        // Ele traduz os arquivos CSS para JavaScript, essencialmente permitindo que você importe CSS nos arquivos JavaScript, por exemplo, com "import './styles.css'".
        // O "style-loader" injeta o CSS processado no DOM, criando um elemento <style> e adicionando o conteúdo CSS nele.
        // Sem o "style-loader", o CSS ficaria apenas disponível como uma string JavaScript processada, mas não seria realmente aplicado ao HTML. Ele garante que os estilos sejam efetivamente aplicados à página.
      },
      {
        test: /\.js$/,
        // Define um critério para selecionar os arquivos que devem ser processados.
        // A expressão regular "/\.js$/" indica que a regra deve ser aplicada a todos os arquivos que terminam com .js (arquivos JavaScript). Isso garante que todos os arquivos JS do projeto sejam processados por essa regra.
        exclude: /node_modules/,
        // Exclui a pasta node_modules da regra de processamento.
        // Normalmente, as bibliotecas presentes na pasta node_modules já estão pré-compiladas, e transpilar todos esses arquivos poderia impactar negativamente no tempo de build. Isso garante que apenas o código da aplicação seja processado.
        use: {
          loader: "babel-loader",
          // o babel-loader como o loader que deve ser usado para processar os arquivos .js.
          // O babel-loader conecta o Webpack ao Babel, permitindo que o Babel transpile os arquivos JavaScript para versões compatíveis.
          options: {
            presets: ["@babel/preset-env"],
            // Define o preset do Babel a ser usado. Neste caso, o preset @babel/preset-env é utilizado para garantir que o JavaScript seja transpilado de forma a ser compatível com os navegadores especificados (ou alvos definidos).
            // O @babel/preset-env adapta automaticamente o código para ser compatível com os navegadores ou versões do Node.js desejados, facilitando o suporte a diferentes ambientes.
          }
        }
      },
    ],
  },
}

/* Resumo do Comportamento:
Ponto de Entrada (entry): O Webpack começa a compilar o projeto a partir do arquivo "src/main.js".
Modo de Desenvolvimento (mode): Facilita a depuração e deixa o código mais legível.
Target (target): Otimiza o código para ser usado em navegadores.
Saída (output):
Compila tudo para um arquivo chamado "main.js".
Esse arquivo é salvo no diretório dist.

O webpack-dev-server é configurado para servir os arquivos da pasta dist na porta 3000.
Ele abre automaticamente o navegador quando o servidor inicia e habilita o recarregamento automático da página quando houver mudanças no código.

O plugin html-webpack-plugin usa o arquivo index.html como template.
Durante o processo de build, o plugin gera um arquivo HTML final que já inclui todos os scripts e folhas de estilo gerados pelo Webpack.
Isso simplifica o desenvolvimento, pois elimina a necessidade de adicionar manualmente as referências aos arquivos gerados sempre que houver mudanças no projeto.

A configuração do css-loader e style-loader permite importar arquivos CSS diretamente nos seus arquivos JavaScript, como import './styles.css'.
O css-loader faz a leitura dos arquivos CSS e resolve suas dependências.
O style-loader adiciona os estilos ao DOM, garantindo que eles sejam aplicados à interface visual.

O copy-webpack-plugin é configurado para copiar todos os arquivos da pasta "src/assets" para "dist/src/assets" durante o processo de build.
Isso garante que os recursos estáticos (imagens, fontes, etc.) sejam incluídos no bundle final, facilitando seu uso no ambiente de produção.

O segundo objeto de "rules" define uma regra para processar arquivos JavaScript (.js).
O babel-loader será utilizado para transpilar o código, mas excluindo os arquivos da pasta node_modules.
O preset @babel/preset-env é usado para garantir a compatibilidade do JavaScript com diferentes navegadores e ambientes.*/

/* Como o Processo Funciona:
O Webpack lê o arquivo "src/main.js" e segue todas as importações feitas nele (e nos arquivos importados por ele).
Todos esses arquivos são empacotados em um único bundle, que é chamado "main.js".
O bundle final é então salvo no diretório dist.*/

/* Fluxo de Execução do css-loader e style-loader:
Quando um arquivo .css é encontrado, o Webpack usa os loaders definidos para processá-lo.
Primeiro, o css-loader interpreta o CSS e o traduz para uma string JavaScript.
Depois, o style-loader pega essa string e a insere em um elemento <style> no documento HTML, aplicando os estilos à página.*/