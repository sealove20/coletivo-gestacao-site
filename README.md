# 🎭 Coletivo Gestação — Site Oficial

Site do Coletivo Afroperspectivista Gestação, grupo de teatro negro de Rondonópolis, MT.

---

## 🚀 Como colocar no ar (Vercel) — Passo a Passo

### Pré-requisitos
- Uma conta no [GitHub](https://github.com) (grátis)
- Uma conta na [Vercel](https://vercel.com) (grátis — pode criar com a conta do GitHub)

---

### Passo 1: Criar o repositório no GitHub

1. Acesse [github.com/new](https://github.com/new)
2. Nome do repositório: `coletivo-gestacao-site`
3. Deixe como **Public** (ou Private, como preferir)
4. Clique em **"Create repository"**

### Passo 2: Subir os arquivos

**Opção A — Pelo terminal (se tiver Git instalado):**

```bash
cd coletivo-gestacao-site
git init
git add .
git commit -m "Site do Coletivo Gestação"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/coletivo-gestacao-site.git
git push -u origin main
```

**Opção B — Pelo site do GitHub (mais fácil, sem terminal):**

1. Na página do repositório recém-criado, clique em **"uploading an existing file"**
2. Arraste TODOS os arquivos e pastas deste projeto para a área de upload
3. Clique em **"Commit changes"**

> ⚠️ **Importante:** Suba a estrutura de pastas completa (src/, public/, package.json, etc.)

### Passo 3: Deploy na Vercel

1. Acesse [vercel.com](https://vercel.com) e faça login com sua conta GitHub
2. Clique em **"Add New..." → "Project"**
3. Na lista de repositórios, encontre `coletivo-gestacao-site` e clique em **"Import"**
4. A Vercel vai detectar automaticamente que é um projeto Vite
5. Verifique se as configurações estão assim:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
6. Clique em **"Deploy"**
7. Aguarde ~1 minuto. Pronto! 🎉

A Vercel vai te dar um link tipo: `coletivo-gestacao-site.vercel.app`

### Passo 4 (opcional): Domínio personalizado

Se quiserem um domínio como `coletivogestacao.com.br`:
1. Registre o domínio no [Registro.br](https://registro.br) (~R$40/ano)
2. Na Vercel, vá em **Settings → Domains**
3. Adicione o domínio e siga as instruções de configuração DNS

---

## 🖼️ Como adicionar as fotos reais

1. Coloque as fotos na pasta `public/images/` (crie a pasta se não existir)
2. No arquivo `src/App.jsx`, substitua os placeholders de foto por tags `<img>`:

```jsx
// Onde estiver o placeholder de foto, troque por:
<img 
  src="/images/nome-da-foto.jpg" 
  alt="Cena do espetáculo Gestação de Cam"
  style={{ width: "100%", height: "100%", objectFit: "cover" }}
/>
```

3. Faça commit e push — a Vercel atualiza automaticamente!

---

## 📝 Como editar textos

Todos os textos estão no arquivo `src/App.jsx`. Basta abrir, encontrar o texto que quer mudar, editar e salvar. Ao fazer push para o GitHub, a Vercel atualiza automaticamente.

---

## 🛠️ Desenvolvimento local

Se quiser rodar o site no seu computador antes de subir:

```bash
npm install
npm run dev
```

O site vai abrir em `http://localhost:5173`

---

## 📁 Estrutura do Projeto

```
coletivo-gestacao-site/
├── public/
│   └── favicon.svg          ← Ícone do site
├── src/
│   ├── App.jsx              ← Componente principal (todo o site)
│   └── main.jsx             ← Ponto de entrada React
├── index.html               ← HTML base (com SEO)
├── package.json             ← Dependências
├── vite.config.js           ← Configuração do Vite
└── README.md                ← Este arquivo
```
