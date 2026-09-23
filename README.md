# 📱 PlacaNFC Pro · Sistema Operacional & Redirecionador Dinâmico

> **Plataforma completa para operação, produção, venda e gerenciamento de placas interativas NFC e QR Code para avaliações 5 Estrelas no Google, BioSites e cardápios digitais.**

---

## 🚀 Visão Geral

O **PlacaNFC Pro** é o ecossistema definitivo para quem trabalha com placas físicas de aproximação (NFC) e QR Code para comércios locais (Bares, Clínicas Odontológicas, Consultórios Médicos, Salões, Barbearias, Restaurantes e Oficinas).

Diferente de soluções amadoras que gravam links diretos e estáticos nas tags (inutilizando a placa física de acrílico se o comércio mudar de endereço ou de link), o **PlacaNFC Pro** opera com **redirecionamento dinâmico inteligente (HTTP 302 No-Store)**:
1. A tag física no balcão aponta para um link curto e seguro (Ex: `r.placanfc.pro?r=A7K2&s=n`).
2. Você pode trocar o destino da placa a qualquer momento no seu painel web em 2 segundos — sem jamais precisar ir até a loja ou descartar o acrílico.
3. Você rastreia quantos clientes tocaram pelo **NFC do celular** vs. quantos leram a câmera pelo **QR Code**.

---

## 💎 Módulos Integrados da Aplicação

### 1. 📋 Gerenciador de Placas & Controle de Estoque
* Controle total de lotes (ex: Lote Piloto de 30 unidades NTAG213).
* Separação em tempo real entre placas **Ativas** (instaladas em clientes) e placas **Virgens em Estoque**.
* Geração de códigos alfanuméricos seguros de 4 dígitos sem caracteres ambíguos (`0`, `O`, `1`, `I`, `L`).
* Contador individual de acessos por **NFC** e por **QR Code**.
* Gestão de recorrência mensal (R$ 99/mês) para clientes com contrato de manutenção e relatórios.

### 2. 👑 Nichos de Alto Ticket em Acrílico Recortado a Laser
Modelos temáticos com altíssimo valor percebido (venda de **R$ 290 a R$ 490** com custo de fabricação de apenas **R$ 38 a R$ 50**):
* **Odontologia & Harmonização Facial:** Silhueta em formato de **Dente** recortado a laser em acrílico branco leitoso 3mm com bordas e molduras em **Acrílico Espelhado Dourado (Gold Mirror)** ou Rose Gold. 3 QR codes emoldurados (Google 5★, Instagram da Clínica e Pix/Consulta).
* **Bares, Pubs & Cervejarias:** Formato **Caneco de Chopp com Espuma Relevo** e **Totens Triangulares de Mesa**. Estratégia de venda de kits completos de 10 a 25 peças por bar (pedidos de **R$ 700 a R$ 900+**) e gatilho do *"Shot grátis de cortesia ao avaliar no Google"*.
* **Médicos & Clínicas Nobres:** Formato **Cruz Médica / Titânio Nobre**, focado em atrair pacientes particulares para dermatologia, cirurgia plástica e ortopedia sem dependência de convênios.

### 3. 🖨️ Gráfica 10×15 cm & Exportador PNG 300 DPI
* Proporção oficial padrão balcão (10 cm × 15 cm - proporção 2:3).
* Gerador de QR Code vetorial nítido com as cores oficiais da identidade Google.
* **Exportação em 1 clique de PNG em Alta Resolução (300 DPI - 1181 × 1772 pixels)** pronto para envio direto à gráfica rápida para corte e vinil adesivo laminado.
* **Mockup 3D no Balcão Real:** apresentação com iluminação de spot e reflexo em madeira nobre para mostrar ao comerciante no celular durante a visita.

### 4. 💬 Gerador de Propostas & Fechamento no WhatsApp
* Criação instantânea de propostas personalizadas para os principais pacotes:
  * **1 Placa no Balcão:** R$ 119,00
  * **Combo 3 Placas:** R$ 249,00
  * **Placa + BioSite Express:** R$ 397,00
  * **Lote B2B / Redes:** R$ 890,00
* Botão direto **"Abrir Conversa no WhatsApp"** que já dispara o texto formatado para o número do comerciante.

### 5. ⭐ Extrator Oficial de Link 5 Estrelas Google
* Localizador de **Place ID** oficial do Google Meu Negócio.
* Construtor da URL direta de avaliação com pré-seleção de 5 estrelas (`https://search.google.com/local/writereview?placeid=...`).
* Botão de vincular o link extraído diretamente a uma placa do estoque com 1 clique.

### 6. 🌐 BioSite Express (Ticket de R$ 397)
* Construtor de mini-site mobile ultrarrápido para estabelecimentos que não possuem site próprio.
* Botões de chamada rápida para WhatsApp, Cardápio, Chave Pix, Instagram e Avaliação Google.

### 7. 📊 Calculadora Financeira & Viabilidade (Porto Alegre)
* Simulação real de custos de materiais: Tag NTAG213 (R$ 1,33), Placa de Acrílico/PVC (R$ 3,00), Adesivo Laminado (R$ 4,00), Suporte de Mesa (R$ 4,00), Deslocamento rateado (R$ 9,00).
* Margem líquida calculada por placa vendida (~80% de lucro).
* Ponto de equilíbrio (Break-even) e metas de faturamento mensal.

### 8. 🧭 Guia de Rua & Roteiro de Abordagem de 30 Segundos
* Roteiro validado de abordagem de balcão sem parecer vendedor chato.
* Técnica de demonstração ao vivo tocando o celular na placa teste.
* Matriz de respostas para as 4 principais objeções (*"Já tenho clientes suficientes"*, *"Acho caro"*, *"Vou pensar"* e *"Como funciona?"*).

---

## 🛠️ Tecnologias Utilizadas

* **Framework:** React 19 + TypeScript
* **Build Tool:** Vite 8
* **Estilização:** Tailwind CSS v4
* **Ícones:** Lucide React
* **QR Code:** QRCode Engine (SVG & DataURL)
* **Animações e Efeitos:** Canvas Confetti + Motion
* **Persistência Local:** LocalStorage State Manager com semente inicial de 30 placas

---

## 💻 Como Rodar o Projeto Localmente

### Pré-requisitos
* Node.js 18+ instalado
* NPM ou Yarn

### Passo a Passo:

1. **Clone o repositório:**
```bash
git clone https://github.com/SEU_USUARIO/placanfc-pro.git
cd placanfc-pro
```

2. **Instale as dependências:**
```bash
npm install
```

3. **Inicie o servidor de desenvolvimento:**
```bash
npm run dev
```
O aplicativo estará acessível em `http://localhost:3000`.

4. **Gerar build de produção:**
```bash
npm run build
```
Os arquivos estáticos otimizados serão gerados na pasta `dist/`.

---

## 📦 Guia de Produção Física das Placas

### 1. Tags NFC Recomendadas
* **Chip:** NTAG213 (144 bytes de memória utilizável — ideal para URLs curtas).
* **Frequência:** 13.56 MHz (ISO 14443A).
* **Adesivo:** Adesivo 3M circular de 25mm.
* **Atenção:** Se a placa tiver partes de metal ou for colada sobre inox/chapa de ferro, utilize **Tags Anti-Metal (On-Metal)** com camada de ferrite isolante.

### 2. Gravação das Tags no Celular
1. Instale o aplicativo gratuito **NFC Tools** (disponível na App Store e Google Play).
2. No PlacaNFC Pro, copie o link NFC da placa (ex: `https://seu-dominio.com?r=A7K2&s=n`).
3. No NFC Tools, toque em **Escrever** → **Adicionar registro** → **URL / URI**.
4. Cole o link e aproxime o topo do celular da tag NTAG213.
5. (Opcional recomendado): Vá em **Outras opções** → **Bloquear permanentemente** para evitar que terceiros sobrescrevam o link.

### 3. Corte a Laser & Gráfica
* **Fundo:** Acrílico Cast Branco Leitoso 3mm cortado a laser no formato (Dente, Caneco de Chopp, ou Retângulo 10×15 cm).
* **Moldura / Aplique:** Acrílico Espelhado Dourado (Gold Mirror) 2mm colado na frente com fita dupla face 3M 467MP.
* **Base de Apoio:** Acrílico Preto Black Piano 5mm com vinco usinado para encaixe firme sem tombar no balcão.

---

## 📤 Como Exportar para o GitHub

Você pode exportar este projeto para o seu GitHub de duas maneiras:

### Opção 1: Direto pela interface do Google AI Studio (Mais Fácil)
1. No canto superior direito da janela do AI Studio, clique no menu de configurações/três pontinhos ou no botão **Export**.
2. Selecione **Export to GitHub**.
3. Escolha sua conta do GitHub (`rgbarcellos@gmail.com`), dê o nome ao repositório (ex: `placanfc-pro`) e confirme.
4. O AI Studio fará o commit e push de todos os arquivos automaticamente.

### Opção 2: Via Linha de Comando (Git)
```bash
git init
git add .
git commit -m "feat: lancamento do PlacaNFC Pro - operacao completa de placas nfc e nichos"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/placanfc-pro.git
git push -u origin main
```

---

## 📄 Licença

Desenvolvido para uso operacional comercial e pessoal. Distribuído sob licença MIT.
