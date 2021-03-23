# Marvel Comics App

<img src="https://i.ibb.co/wd9nhhp/icon.png" alt="icon" border="0" height="200px"></a>


<strong>Para que seja possível rodar o projeto é necessário seguir os passos abaixo  🚀</strong>

1. Clonar o repositório.
2. Ir até o diretório aonde clonou o repositório entrar na pasta raiz `/appMarvel` e criar um arquivo com o nome **.env**
3. Dentro deste arquivo é necessário definir as variáveis e tokens no mesmo padrão que existem em .env.example com a sua informações da conta na **MARVEL**. (❗ **Obs:** utilizar o protocolo **https** na variável BASE_URL)
4. Certifique-se de ter todo o ambiente de desenvolvimento instalado (yarn, emulador iOS/Android e tudo mais...), caso necessário segue o link para configuração do ambiente de desenvolvimento: <a style="color:#7e46c3; font-weight:500">https://react-native.rocketseat.dev/</a>
4. Após todo o processo rode os seguintes comandos:

<br />

<pre>
<code>
yarn install
yarn react-native link react-native-vector-icons
</code>
</pre>

<br />

## <b>iOS</b>
<pre>
<code>
cd ios && pod install && cd ..
yarn ios
</code>
</pre>

<br />

## <b>Android</b>
<pre>
<code>
yarn android
</code>
</pre>


<br />

## <b>Testes</b>
Os testes se encontra na pasta `src/__tests__`

<pre>
<code>
yarn test
yarn test:coverage
</code>
</pre>

Espero que goste do App 🥷🏼
