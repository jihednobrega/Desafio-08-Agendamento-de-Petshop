import dayjs from "dayjs"
import "dayjs/locale/pt-br"

dayjs.locale("pt-br")

/*
import dayjs from "dayjs":
O que faz: Importa a biblioteca dayjs para ser usada no arquivo.
Por que usar: A biblioteca dayjs permite manipular, validar e formatar datas de forma similar ao Moment.js, mas com uma abordagem leve e minimalista.

import "dayjs/locale/pt-br":
O que faz: Importa o suporte ao idioma português do Brasil (pt-br) para o dayjs.
Por que usar: Essa linha garante que a biblioteca tenha o idioma pt-br carregado, possibilitando o uso de datas no formato local.

dayjs.locale("pt-br"):
O que faz: Define o idioma padrão (locale) do dayjs para português do Brasil.
Por que usar: Assim, qualquer formatação de data feita com dayjs neste contexto utilizará as convenções de data e hora do português brasileiro.
*/