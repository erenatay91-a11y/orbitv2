# Vercel Deployment Guide

## 🚀 Hızlı Deploy (GitHub Integration)

### Adım 1: Vercel'e Giriş Yap
1. [Vercel](https://vercel.com) adresine gidin
2. **Sign Up** veya **Log In** butonuna tıklayın
3. **Continue with GitHub** seçeneğini kullanın
4. GitHub hesabınızla authorize edin

### Adım 2: Projeyi İçe Aktar
1. Vercel Dashboard'da **Add New Project** butonuna tıklayın
2. **Import Git Repository** seçeneğini seçin
3. Repository listesinden **erenatay91-a11y/orbitv2** seçin
4. **Import** butonuna tıklayın

### Adım 3: Proje Ayarları
Vercel otomatik olarak şunları algılayacak:
- ✅ Framework: Other (static)
- ✅ Build Command: (boş - gerek yok)
- ✅ Output Directory: `.` (root)
- ✅ Install Command: (boş - gerek yok)

**Değiştirmenize gerek yok**, direkt **Deploy** butonuna tıklayın!

### Adım 4: Deploy
1. **Deploy** butonuna tıklayın
2. Deploy işlemi başlayacak (1-2 dakika)
3. Tamamlandığında **Visit** butonuna tıklayarak sitenizi görüntüleyin

## 🔧 Environment Variables (Opsiyonel)

Eğer OpenAI API key kullanmak istiyorsanız:

1. Vercel Dashboard'da projenize gidin
2. **Settings** → **Environment Variables** menüsüne gidin
3. Yeni variable ekleyin:
   - **Key**: `OPENAI_API_KEY`
   - **Value**: OpenAI API key'inizi buraya yapıştırın
   - **Environment**: Production, Preview, Development (hepsini seçin)
4. **Save** butonuna tıklayın
5. **Deployments** sekmesine gidin ve son deployment'ı **Redeploy** edin

## 📝 Notlar

- **Supabase config** zaten HTML'de inline olarak var, ekstra ayar gerekmez
- **OpenAI config** opsiyonel - sadece AI özellikleri kullanacaksanız gerekli
- Her GitHub push'unda Vercel otomatik deploy yapacak

## ✅ Deploy Sonrası Kontrol

1. Vercel URL'inizi açın (örn: `https://orbitv2.vercel.app`)
2. Tarayıcı konsolunu açın (F12 → Console)
3. Şu logları kontrol edin:
   - `[Supabase Config] URL: ...`
   - `[Supabase Init] Client created successfully`
   - `[OrbitApi] Services initialized`
4. Yeni kullanıcı kaydı yapmayı deneyin

## 🐛 Sorun Giderme

### Deploy başarısız olursa
- **Deployments** sekmesinde hata loglarını kontrol edin
- **Settings** → **General** → **Build & Development Settings** kontrol edin

### Site açılmıyorsa
- **Deployments** sekmesinde deployment'ın "Ready" durumunda olduğundan emin olun
- URL'in doğru olduğunu kontrol edin

### Supabase bağlantı hatası
- Tarayıcı konsolundaki hata mesajlarını kontrol edin
- Supabase projesinin aktif olduğundan emin olun

