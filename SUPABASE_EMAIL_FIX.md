# Supabase Email Confirmation Link Düzeltme

## 🔧 Sorun

Email onay linki `localhost:3000`'e yönlendiriyor. Bu, Supabase'deki Site URL ve Redirect URL ayarlarından kaynaklanıyor.

## ✅ Çözüm 1: Site URL ve Redirect URLs Güncelleme

### Adım 1: Authentication Settings'e Git

Direkt URL:
```
https://supabase.com/dashboard/project/cohjxujvdfbsohhlvnus/auth/url-configuration
```

Veya:
1. **Authentication** → **URL Configuration** menüsüne gidin

### Adım 2: Site URL'i Güncelle

**Site URL** alanına şunu yazın:
```
http://localhost:5500
```
veya production için:
```
https://your-domain.com
```

### Adım 3: Redirect URLs Ekle

**Redirect URLs** listesine şunları ekleyin:
```
http://localhost:5500/**
http://localhost:3000/**
http://127.0.0.1:5500/**
https://your-domain.com/**
```

**Wildcard (`**`) kullanarak** tüm alt path'leri kapsayabilirsiniz.

### Adım 4: Kaydet

**Save** butonuna tıklayın.

## ✅ Çözüm 2: Email Template'i Güncelleme

### Adım 1: Email Templates'e Git

Direkt URL:
```
https://supabase.com/dashboard/project/cohjxujvdfbsohhlvnus/auth/templates
```

### Adım 2: Confirm signup Template'ini Düzenle

1. **Confirm signup** template'ini seçin
2. **Redirect URL** kısmını bulun
3. Şunu değiştirin:
   ```
   {{ .ConfirmationURL }}
   ```
   
   Veya direkt URL kullanın:
   ```
   http://localhost:5500/orbitv7.html
   ```

### Adım 3: Kaydet

**Save** butonuna tıklayın.

## ✅ Çözüm 3: Email Confirmation'ı Kapat (Test için)

Eğer test aşamasındaysanız, email confirmation'ı kapatabilirsiniz:

### Adım 1: Authentication Settings

Direkt URL:
```
https://supabase.com/dashboard/project/cohjxujvdfbsohhlvnus/auth/providers
```

### Adım 2: Email Provider Ayarları

1. **Email** provider'ını bulun
2. **Enable email confirmations** seçeneğini **KAPATIN**
3. **Save** butonuna tıklayın

Bu şekilde kullanıcılar email onayı olmadan direkt giriş yapabilir.

## ✅ Çözüm 4: Manuel Email Onayı (Hızlı Test)

Eğer dashboard'a erişemiyorsanız, kullanıcıyı manuel olarak onaylayabilirsiniz:

### SQL Editor'dan:

Direkt URL:
```
https://supabase.com/dashboard/project/cohjxujvdfbsohhlvnus/sql
```

Şu SQL'i çalıştırın:

```sql
-- Kullanıcının email'ini onayla
UPDATE auth.users 
SET email_confirmed_at = NOW() 
WHERE email = 'your-email@example.com';
```

`your-email@example.com` yerine kendi email'inizi yazın.

## 🚀 Hızlı Çözüm (Önerilen)

**Test için en hızlı yol:**

1. **Email confirmation'ı kapatın** (Çözüm 3)
2. Veya **Site URL'i güncelleyin** (Çözüm 1)

## 📝 Notlar

- **Site URL**: Uygulamanızın ana URL'i
- **Redirect URLs**: Email onay linklerinin yönlendirebileceği URL'ler
- **Wildcard (`**`)**: Tüm alt path'leri kapsar (örn: `/orbitv7.html`, `/groups`, vb.)

## 🔍 Kontrol

Ayarları güncelledikten sonra:

1. Yeni bir test kullanıcısı oluşturun
2. Email'i kontrol edin
3. Link'in doğru URL'e yönlendirdiğini kontrol edin

