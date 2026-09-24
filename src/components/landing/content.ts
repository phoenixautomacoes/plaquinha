export const SITE_URL = "https://plaquinhas.phoenixautomacoes.com.br";
export const PHOENIX_URL = "https://phoenixautomacoes.com.br/";

export const plans = [
  {
    name: "Placa Balcão Express",
    price: 119.9,
    displayPrice: "119,90",
    label: "O primeiro toque",
    description: "Sua marca no balcão. Seu cliente mais perto.",
    detail: "Placa com pagamento único",
    cta: "Quero minha placa",
    features: [
      "1 placa de acrílico de 10 × 15 cm",
      "Personalização com nome e logotipo",
      "NFC configurado + QR Code",
      "Suporte na configuração inicial",
    ],
  },
  {
    name: "Combo Turbo + Landing Page",
    price: 497.9,
    displayPrice: "497,90",
    label: "Do físico ao digital",
    description: "A placa e uma página para apresentar seu negócio.",
    detail: "Placa + criação da landing page",
    cta: "Quero o Combo Turbo",
    features: [
      "Tudo da Placa Balcão Express",
      "Landing page com a sua identidade",
      "Catálogo de serviços e WhatsApp",
      "Botão para avaliações no Google",
      "Layout responsivo e SEO configurado",
    ],
  },
  {
    name: "Kit Empresa Completa",
    price: 697.9,
    displayPrice: "697,90",
    label: "Presença mais completa",
    description: "Seu balcão, seu site e seu perfil no Google.",
    detail: "Placa + landing + configuração Google",
    cta: "Quero o Kit Completo",
    features: [
      "Tudo do Combo Turbo",
      "Configuração do Perfil da Empresa no Google",
      "Orientação de categorias e termos locais",
      "Suporte prioritário Phoenix",
    ],
  },
];

export const faqs = [
  {
    q: "O cliente precisa baixar um aplicativo?",
    a: "Não é necessário instalar um aplicativo específico para usar a placa. Em um celular compatível, basta aproximar a área de leitura NFC ou ler o QR Code com a câmera. É preciso ter internet para abrir a página de destino. Para publicar uma avaliação, o Google pode solicitar que o cliente entre na própria conta.",
  },
  {
    q: "Funciona no iPhone e no Android?",
    a: "A aproximação funciona em aparelhos com NFC compatível e ativado. A posição de leitura varia conforme o modelo. Para aparelhos sem NFC, o QR Code oferece outra forma de acessar o mesmo destino usando a câmera ou um leitor de QR Code.",
  },
  {
    q: "Como funciona a personalização e o pedido?",
    a: "Digite o nome da empresa e envie seu logo no simulador para visualizar a composição. Depois, continue no WhatsApp para definir o pacote e confirmar arte, destino do link, prazo e entrega com a Phoenix. O logo fica apenas na prévia do navegador: anexe o arquivo na conversa para concluir o pedido.",
  },
  {
    q: "A placa garante avaliações de 5 estrelas?",
    a: "A placa facilita o acesso à página de avaliação. A nota, o comentário e a decisão de publicar são sempre do cliente. Não há avaliações automáticas, garantia de quantidade de avaliações ou promessa de posição nas buscas do Google.",
  },
  {
    q: "Posso usar a placa para WhatsApp, site ou cardápio?",
    a: "Sim. A Phoenix pode configurar a placa para o endereço escolhido no pedido, como avaliações no Google, WhatsApp, cardápio digital ou site. Se você precisa trocar o destino depois, consulte as condições de atualização ou redirecionamento dinâmico antes da produção.",
  },
  {
    q: "Tem mensalidade? O que está incluído nos combos?",
    a: "A Placa Balcão Express custa R$ 119,90 e não tem mensalidade obrigatória. O Combo Turbo custa R$ 497,90 e inclui a criação da landing page; o Kit Empresa Completa custa R$ 697,90 e acrescenta a configuração do Perfil da Empresa no Google. Confirme no atendimento as condições de domínio, hospedagem, renovação e entrega. Sofia, CRM e outros serviços do ecossistema são contratados à parte.",
  },
  {
    q: "Qual é o tamanho e onde posso colocar?",
    a: "O modelo de balcão mede 10 × 15 cm e é produzido em acrílico, com suporte para mesa. Funciona bem na recepção, no caixa ou na bancada de atendimento. Confirme as opções de acabamento com a Phoenix e mantenha a área de aproximação acessível ao cliente.",
  },
];

export function whatsappLink(number: string, message: string) {
  const digits = number.replace(/\D/g, "");
  return `https://wa.me/${digits.startsWith("55") ? digits : `55${digits}`}?text=${encodeURIComponent(message)}`;
}
