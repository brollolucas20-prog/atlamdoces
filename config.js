/**
 * ATLAM DOCES - Configurações Gerais da Marca e Catálogo
 * Edite os dados abaixo para atualizar número de WhatsApp, Instagram, produtos, preços e textos.
 */

const ATLAM_CONFIG = {
  // Informações de Contato e Vendas
  brand: {
    name: "Atlam Doces",
    tagline: "Brownies & Doces Artesanais",
    location: "Aparecida de Goiânia – GO",
    city: "Aparecida de Goiânia",
    state: "GO",
    whatsappNumber: "5562999999999", // Insira o número com DDD (ex: 5562999999999)
    whatsappDisplay: "(62) 99999-9999",
    instagramHandle: "atlamdoces",
    instagramUrl: "https://instagram.com/atlamdoces",
    hours: "Segunda a Sábado: 09h às 19h",
    deliveryInfo: "Entregas em Aparecida de Goiânia e Goiânia sob agendamento",
    pixKey: "contato@atlamdoces.com.br", // Chave Pix para facilidade
  },

  // Catálogo de Produtos
  products: [
    {
      id: "brownie-tradicional",
      name: "Brownie Tradicional",
      category: "tradicional",
      badge: "O Clássico",
      price: 8.50,
      priceDisplay: "R$ 8,50",
      description: "Nossa receita assinatura: casquinha brilhante e craquelada, interior denso, macio e chocolatudo na medida perfeita.",
      image: "Imagens/Captura de tela 2026-08-19 173733.png",
      featured: true
    },
    {
      id: "brownie-doce-de-leite",
      name: "Brownie Recheado Doce de Leite",
      category: "recheado",
      badge: "Mais Vendido",
      price: 12.00,
      priceDisplay: "R$ 12,00",
      description: "O clássico brownie artesanal generosamente recheado com doce de leite cremoso de textura aveludada.",
      image: "Imagens/Captura de tela 2026-08-19 173858.png",
      featured: true
    },
    {
      id: "brownie-brigadeiro",
      name: "Brownie Brigadeiro Gourmet",
      category: "recheado",
      badge: "Favorito",
      price: 12.00,
      priceDisplay: "R$ 12,00",
      description: "Recheio denso de brigadeiro artesanal 50% cacau, combinando perfeitamente com a massa úmida do brownie.",
      image: "Imagens/Captura de tela 2026-08-19 173905.png",
      featured: true
    },
    {
      id: "brownie-ninho-nutella",
      name: "Brownie Especial Ninho & Nutella",
      category: "especial",
      badge: "Edição Especial",
      price: 14.00,
      priceDisplay: "R$ 14,00",
      description: "Camadas generosas de creme de avelã autêntico e brigadeiro suave de Leite Ninho sobre nossa massa tradicional.",
      image: "Imagens/Captura de tela 2026-08-19 173915.png",
      featured: true
    },
    {
      id: "caixa-degustacao-4",
      name: "Caixa Degustação (4 Unidades)",
      category: "kits",
      badge: "Presente Perfeito",
      price: 38.00,
      priceDisplay: "R$ 38,00",
      description: "Caixa presenteável elegante contendo 4 brownies individuais sortidos com laço de cetim e cartão.",
      image: "Imagens/Captura de tela 2026-08-19 173843.png",
      featured: true
    },
    {
      id: "caixa-premium-6",
      name: "Caixa Premium Atlam (6 Unidades)",
      category: "kits",
      badge: "Kit Especial",
      price: 55.00,
      priceDisplay: "R$ 55,00",
      description: "Seleção com 6 unidades dos melhores brownies artesanais da Atlam Doces em embalagem refinada.",
      image: "Imagens/Captura de tela 2026-08-19 173930.png",
      featured: false
    },
    {
      id: "encomendas-eventos",
      name: "Encomendas para Eventos & Festas",
      category: "eventos",
      badge: "Sob Encomenda",
      price: 0,
      priceDisplay: "Sob Consulta",
      description: "Mini brownies e brownies embalados individualmente com etiqueta personalizada para aniversários, casamentos e empresas.",
      image: "Imagens/Captura de tela 2026-08-19 173733.png",
      featured: false
    }
  ],

  // Depoimentos
  testimonials: [
    {
      name: "Mariana Costa",
      location: "Aparecida de Goiânia",
      text: "O melhor brownie que já comi na vida! A casquinha é surreal de crocante e o meio é muito macio e molhadinho. Virei cliente fiel toda semana.",
      rating: 5,
      tag: "Cliente Semanal"
    },
    {
      name: "Lucas Fernandes",
      location: "Goiânia – GO",
      text: "Comprei uma caixa para presentear no aniversário da minha namorada e foi um sucesso total. A embalagem é linda e o sabor é inesquecível!",
      rating: 5,
      tag: "Kit Presente"
    },
    {
      name: "Dra. Camila Silveira",
      location: "Aparecida de Goiânia",
      text: "Fiz uma encomenda corporativa para presentear a equipe da clínica. Todo mundo elogiou a delicadeza e a qualidade impecável dos doces.",
      rating: 5,
      tag: "Encomenda Corporativa"
    }
  ],

  // FAQ
  faqs: [
    {
      question: "Como faço meu pedido?",
      answer: "Você pode escolher seus brownies diretamente aqui pelo site clicando em 'Quero este' ou montando sua sacola de pedido. Ao clicar, você será direcionado ao nosso WhatsApp com a mensagem pronta para combinarmos entrega e pagamento."
    },
    {
      question: "Vocês fazem entregas em Aparecida de Goiânia e região?",
      answer: "Sim! Realizamos entregas em toda Aparecida de Goiânia e também em bairros de Goiânia via entrega agendada ou retirada combinada. Consulte a taxa de entrega no WhatsApp."
    },
    {
      question: "Qual é o prazo para encomendas?",
      answer: "Para pedidos do dia a dia (pronta-entrega), consulte a disponibilidade diária no WhatsApp. Para caixas personalizadas, kits para presentes ou eventos maiores, recomendamos pedir com pelo menos 24h a 48h de antecedência."
    },
    {
      question: "Posso montar um kit presente personalizado?",
      answer: "Com certeza! Você pode escolher a combinação dos sabores de brownie, adicionar laço de fita especial e incluir um cartão de dedicatória escrito à mão. É só nos chamar no WhatsApp!"
    },
    {
      question: "Quais formas de pagamento são aceitas?",
      answer: "Aceitamos Pix (com confirmação instantânea), transferências e cartões de crédito e débito."
    }
  ]
};
