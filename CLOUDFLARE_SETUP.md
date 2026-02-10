# Cloudflare ile Yayınlama

## Önemli: Cloudflare Pages Kullanın

Bu proje **statik HTML** olduğu için **Cloudflare Pages** ile yayınlanır. Build sonrası `dist/` klasörü deploy edilir.

## Cloudflare Pages Kurulumu (GitHub ile)

1. [Cloudflare Dashboard](https://dash.cloudflare.com) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
2. GitHub hesabınızı bağlayın ve `azizemirhan/alfagayrimenkul` deposunu seçin
3. **Build settings** bölümünde:
   - **Framework preset:** None
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Root directory:** Repo kökünde sadece `alfagayrimenkul-main` klasörü varsa **`alfagayrimenkul-main`** yazın (build/deploy bu klasörde çalışmalı; yoksa wrangler bulunamaz).
   - **Deploy command (doğrudan wrangler):** `npx wrangler pages deploy ./dist --project-name=alfagayrimenkul`  
     *(npm yerine wrangler komutunu doğrudan kullanmak için; `npx` projedeki wrangler’ı çalıştırır.)*
4. **Environment variables:** `CLOUDFLARE_API_TOKEN` ekleyin (API Tokens’tan **Cloudflare Pages Edit** yetkili token)
5. **Save and Deploy** tıklayın

## Deploy komutu seçenekleri

| Yöntem | Deploy command |
|--------|-----------------|
| Doğrudan wrangler | `npx wrangler pages deploy ./dist --project-name=alfagayrimenkul` |
| npm script ile | `npm run deploy` |

[Wrangler Pages deploy](https://developers.cloudflare.com/workers/wrangler/commands/#pages-deploy) dokümantasyonu: `wrangler pages deploy [DIRECTORY]` ile statik klasör yayınlanır.

## Wrangler CLI ile Manuel Deploy

```bash
npm install
npm run build
npx wrangler pages deploy ./dist --project-name=alfagayrimenkul
```

İlk seferde `npx wrangler pages project create alfagayrimenkul` komutuyla proje oluşturulması istenebilir.

## Yerel Önizleme

```bash
npm run build
npm run preview
```

`dist/` içeriği http://localhost:3000 (veya serve’ün gösterdiği adres) üzerinden açılır.
