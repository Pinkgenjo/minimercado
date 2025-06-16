# 🛒 Sistema Web Mercadinho

Este é um projeto de sistema web para um minimercado, desenvolvido como parte da disciplina Fundamentos de Sistemas Web da PUCRS

O objetivo deste projeto é criar uma plataforma online atrativa e dinâmica que permita aos clientes visualizar produtos, realizar cadastros e agendar serviços de entrega ou retirada.

---

## 🚀 Funcionalidades

O sistema do Mercadinho oferece as seguintes funcionalidades principais:

* **Página Inicial (`index.html`):**
    * Apresentação do minimercado e seus diferenciais.
    * Carrossel interativo (`productCarousel`) exibindo os produtos em destaque.
    * Informações de contato e horário de funcionamento no rodapé.
    * Navegação intuitiva para outras seções do site.

* **Página de Produtos (`produtos.html`):**
    * Exibição detalhada de produtos divididos por categorias (Alimentos, Higiene, Bebidas).
    * Opção "Adicionar ao Carrinho" com feedback visual temporário.
    * Design responsivo para diferentes tamanhos de tela.

* **Página de Serviços (`servicos.html`):**
    * **Formulário de Cadastro de Cliente:** Permite que novos clientes se registrem com informações como nome, sobrenome, e-mail, telefone, endereço completo (com cidade, estado e CEP). Inclui validações e campos obrigatórios.
    * **Formulário de Agendamento de Serviço:** Permite que clientes agendem serviços de entrega ou retirada.
        * Escolha do tipo de serviço (Entrega ou Retirada) com campo de endereço condicional para entregas.
        * Seleção de data (com calendário, impedindo datas passadas e domingos) e horário.
        * Campo para observações e lista de produtos para o pedido.
    * Modal de sucesso (`successModal`) com mensagens de confirmação após o envio dos formulários.

* **Estilização e Interatividade (CSS e JavaScript):**
    * **Design Moderno:** Utilização de **CSS** (`styles.css`) e **Bootstrap 5** para um layout responsivo, componentes estilizados (navbar, cards, botões, modais) e uma paleta de cores consistente.
    * **Validação de Formulários:** Funções em **JavaScript** (`script.js`) para validar campos (e-mail, telefone, CEP, datas) em tempo real, fornecendo feedback ao usuário.
    * **Dinamicidade:** Efeitos visuais como transições nos cards, animações de scroll (`fade-in-up`) e feedback animado nos botões.
    * **Formatação:** Funções para formatar datas e horários de agendamento de forma amigável.

---

## 🛠️ Tecnologias Utilizadas

* **HTML5:** Estrutura semântica das páginas.
* **CSS3:** Estilização e design personalizado (`styles.css`).
* **Bootstrap 5:** Framework CSS para componentes e responsividade.
* **JavaScript (ES6+):** Lógica interativa e manipulação do DOM (`script.js`).
* **Font Awesome:** Ícones vetoriais.

---

## ✅ Ajustes Realizados na Fase 2

Para esta fase, foram implementadas as seguintes melhorias e funcionalidades:

* **Implementação Completa de CSS/Bootstrap:** Integração total do `styles.css` e uso extensivo do Bootstrap para modernizar o layout e os componentes.
* **Funcionalidades JavaScript:** Adição do `script.js` para:
    * Controle do carrossel de produtos.
    * Lógica de validação e processamento dos formulários de cadastro e agendamento.
    * Animações e interações dinâmicas (ex: feedback de "Adicionado!" ao botão).
    * Validação de datas e horários de agendamento, incluindo restrição para domingos.
* **Formulário de Cadastro:** Elaboração completa do formulário de cadastro de cliente, incluindo nome, sobrenome, e-mail, telefone, endereço, cidade, estado e CEP, com validações específicas e campos obrigatórios.
* **Formulário de Agendamento de Serviço:** Criação do formulário para agendamento de tele-entrega ou retirada, com seleção de data via calendário e horário.
* **Acessibilidade:** Garantia do uso de **atributos `alt` descritivos** em todas as imagens para melhorar a acessibilidade para deficientes visuais.

---