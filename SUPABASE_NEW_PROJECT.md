# Yeni Supabase Projesi Oluşturma

## Adım 1: Supabase'de Yeni Proje Oluştur

1. [Supabase Dashboard](https://supabase.com/dashboard) adresine gidin
2. **New Project** butonuna tıklayın
3. Proje bilgilerini doldurun:
   - **Name**: `orbit-v7` (veya istediğiniz bir isim)
   - **Database Password**: Güçlü bir şifre oluşturun (kaydedin!)
   - **Region**: Size en yakın bölgeyi seçin (örn: `West US`, `Europe West`)
   - **Pricing Plan**: Free tier yeterli (başlangıç için)

4. **Create new project** butonuna tıklayın
5. Proje oluşturulmasını bekleyin (1-2 dakika)

## Adım 2: API Bilgilerini Al

1. Proje oluşturulduktan sonra, sol menüden **Settings** → **API** seçin
2. Şu bilgileri kopyalayın:
   - **Project URL**: `https://xxxxx.supabase.co` formatında
   - **anon/public key**: `eyJhbGci...` ile başlayan uzun string

## Adım 3: Config Dosyasını Güncelle

1. `config.supabase.js` dosyasını açın
2. Yeni proje bilgilerini yapıştırın:

```javascript
window.SUPABASE_URL = 'YENİ_PROJE_URL_BURAYA';
window.SUPABASE_ANON_KEY = 'YENİ_ANON_KEY_BURAYA';
```

## Adım 4: SQL Schema'yı Çalıştır

1. Supabase Dashboard'da **SQL Editor**'ı açın
2. `supabase_schema.sql` dosyasının içeriğini kopyalayın
3. SQL Editor'a yapıştırın ve **Run** butonuna tıklayın

## Adım 5: Email Confirmation Ayarları (Test için)

1. **Authentication** → **Settings** menüsüne gidin
2. **Enable email confirmations** seçeneğini **KAPATIN** (test için)
3. Kaydedin

## Adım 6: Test Et

1. Uygulamayı yenileyin
2. Yeni bir kullanıcı oluşturmayı deneyin
3. Giriş yapmayı deneyin

## Önemli Notlar

- **Database Password**: Proje oluştururken verdiğiniz şifreyi kaydedin, bir daha göremezsiniz!
- **API Keys**: `anon` key'i public olabilir, ama `service_role` key'ini asla paylaşmayın
- **Free Tier Limits**: 
  - 500 MB database
  - 2 GB bandwidth
  - 50,000 monthly active users

## Sorun Giderme

### Proje oluşturulamıyor
- Supabase hesabınızın aktif olduğundan emin olun
- Farklı bir proje adı deneyin

### API key bulunamıyor
- Settings → API menüsünden `anon/public` key'i kopyalayın
- `service_role` key'ini kullanmayın (güvenlik riski)

### SQL script hata veriyor
- Script'i adım adım çalıştırmayı deneyin
- Hata mesajını kontrol edin

