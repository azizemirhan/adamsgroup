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
   - **Root directory:** `/` (veya proje kökü; dosyalar `alfagayrimenkul-main` altındaysa `alfagayrimenkul-main` yazın)
   - **Deploy command:** `npm run deploy`
4. **Environment variables:** `CLOUDFLARE_API_TOKEN` ekleyin (API Tokens’tan **Cloudflare Pages Edit** yetkili token)
5. **Save and Deploy** tıklayın

## Wrangler CLI ile Manuel Deploy

```bash
npm install
npm run build
npm run deploy
```

İlk seferde `wrangler pages project create alfagayrimenkul` komutuyla proje oluşturulması istenebilir.

## Yerel Önizleme

```bash
npm run build
npm run preview
```

`dist/` içeriği http://localhost:3000 (veya serve’ün gösterdiği adres) üzerinden açılır.
