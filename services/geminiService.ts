import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
Você é um especialista em Frontend (React, HTML, Tailwind CSS) e Motion Design (GSAP).
Sua tarefa é gerar uma Landing Page completa, moderna e responsiva em arquivo único HTML.

REGRAS OBRIGATÓRIAS:
1. O idioma deve ser Português-BR.
2. Use Tailwind CSS via CDN para estilização. O design deve ser moderno (Clean, bom uso de whitespace, tipografia agradável).
3. Use GSAP e ScrollTrigger via CDN para animações de scroll.
4. Adicione um botão de Call-To-Action (CTA) proeminente e fixo (sticky) ou muito visível na seção principal.
5. A estrutura deve ser: Header, Hero Section, Features/Benefícios, Social Proof/Testemunhos, e Footer.
6. Não inclua Markdown (\`\`\`html). Retorne APENAS o código HTML puro.
7. Inclua imagens de placeholder usando https://picsum.photos/
8. O código deve ser totalmente funcional se salvo como .html.

REGRAS DE ANIMAÇÃO (GSAP):
- Use gsap.from() com ScrollTrigger para animar elementos quando entrarem na viewport (fade in, slide up).
- Anime o Hero Section logo ao carregar.

Exemplo de estrutura de script esperada no final do body:
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script>
  gsap.registerPlugin(ScrollTrigger);
  // suas animações aqui
</script>
`;

export const generateLandingPage = async (userPrompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userPrompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    let html = response.text || '';

    // Limpeza básica caso o modelo ainda envie markdown
    html = html.replace(/```html/g, '').replace(/```/g, '');

    return html;
  } catch (error) {
    console.error("Erro ao gerar landing page:", error);
    throw new Error("Falha ao comunicar com a IA.");
  }
};
