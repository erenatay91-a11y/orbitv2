# Vercel Manuel Deploy

## 🔄 Otomatik Deploy Çalışmıyorsa

Eğer GitHub'a push yaptığınızda Vercel otomatik deploy yapmıyorsa:

### Çözüm 1: Manuel Redeploy

1. **Vercel Dashboard** → Projenize gidin
2. **Deployments** sekmesine gidin
3. En son deployment'ı bulun
4. Sağdaki **"..."** (üç nokta) menüsüne tıklayın
5. **Redeploy** seçeneğini seçin
6. **Redeploy** butonuna tıklayın

### Çözüm 2: GitHub Webhook Kontrolü

1. **Vercel Dashboard** → Projenize gidin
2. **Settings** → **Git** menüsüne gidin
3. **Connected Git Repository** kontrol edin
4. Eğer bağlı değilse:
   - **Connect Git Repository** butonuna tıklayın
   - `erenatay91-a11y/orbitv2` seçin
   - **Connect** butonuna tıklayın

### Çözüm 3: Vercel CLI ile Deploy

Terminal'de:

```bash
# Vercel CLI yükleyin (bir kez)
npm install -g vercel

# Projeye gidin
cd /Users/erenatay/Desktop/v7

# Deploy edin
vercel

# Production'a deploy edin
vercel --prod
```

## ⚡ Hızlı Manuel Deploy

**En hızlı yol:**
1. Vercel Dashboard → Deployments
2. Son deployment'ın yanındaki **"..."** → **Redeploy**

Bu şekilde GitHub'daki en son kodu çeker ve deploy eder.

## 🔍 Webhook Sorununu Düzeltme

Eğer otomatik deploy hiç çalışmıyorsa:

1. **Settings** → **Git** → **Repository** kontrol edin
2. **Disconnect** sonra tekrar **Connect** yapın
3. GitHub'da repository **Settings** → **Webhooks** kontrol edin
4. Vercel webhook'unun aktif olduğundan emin olun

## 📝 Not

Manuel redeploy yapmak otomatik deploy'dan daha hızlı olabilir çünkü:
- Webhook gecikmesi olmaz
- Hemen deploy başlar
- GitHub'daki en son commit'i çeker

