# Supabase Debug - Kullanıcı Kaydı Sorunu

## 🔍 Adım 1: Tarayıcı Konsolunu Kontrol Et

1. Vercel URL'inizi açın
2. **F12** → **Console** sekmesini açın
3. Yeni kullanıcı kaydı yapmayı deneyin
4. Konsoldaki **TÜM** logları kopyalayın (özellikle `[OrbitApi]` ve `[Signup]` ile başlayanlar)

## 🔍 Adım 2: Supabase'de Kullanıcıları Kontrol Et

SQL Editor'da şu sorguyu çalıştırın:

```sql
-- Son oluşturulan kullanıcıları görüntüle
SELECT 
    id,
    email,
    created_at,
    email_confirmed_at,
    raw_user_meta_data
FROM auth.users 
ORDER BY created_at DESC 
LIMIT 10;
```

Eğer kullanıcı görünüyorsa ama `email_confirmed_at` NULL ise → Email confirmation açık

## 🔍 Adım 3: Supabase'de Tabloları Kontrol Et

```sql
-- Tüm tabloları listele
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;
```

Şu tablolar olmalı:
- ✅ `profiles`
- ✅ `groups`
- ✅ `group_members`
- ✅ `posts`
- ✅ `post_likes`
- ✅ `comments`

Eğer yoksa → `supabase_schema.sql` dosyasını çalıştırın

## 🔍 Adım 4: Email Confirmation Kontrolü

1. **Authentication** → **Providers** → **Email** menüsüne gidin
2. **Enable email confirmations** seçeneğini kontrol edin
3. **Test için KAPATIN**

## 🔍 Adım 5: RLS (Row Level Security) Kontrolü

```sql
-- RLS durumunu kontrol et
SELECT 
    schemaname,
    tablename,
    rowsecurity
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('profiles', 'groups', 'posts', 'comments', 'post_likes', 'group_members');
```

Tüm tablolarda `rowsecurity = true` olmalı.

## 🔍 Adım 6: Test Signup (SQL Editor'dan)

Eğer kod çalışmıyorsa, direkt Supabase'den test edin:

```sql
-- Test kullanıcısı oluştur (Supabase Admin API gerekir)
-- Bu sadece test için, normalde kod üzerinden yapılmalı
```

## 🐛 Yaygın Sorunlar

### 1. "Client not initialized"
- **Çözüm**: Sayfayı hard refresh yapın (Cmd/Ctrl + Shift + R)
- Konsolda `[Supabase Init] Client created successfully` logunu kontrol edin

### 2. "Email not confirmed"
- **Çözüm**: Email confirmation'ı kapatın veya email'i onaylayın

### 3. "Profile creation failed"
- **Çözüm**: `profiles` tablosunun var olduğundan emin olun
- RLS politikalarını kontrol edin

### 4. Kullanıcı oluşuyor ama görünmüyor
- **Çözüm**: `auth.users` tablosunda kontrol edin
- Email confirmation açık olabilir

## 📋 Debug Checklist

- [ ] Tarayıcı konsolunda hata var mı?
- [ ] `[Supabase Init] Client created successfully` logu var mı?
- [ ] `[OrbitApi] Signup: Attempting signup` logu var mı?
- [ ] `[OrbitApi] User created successfully` logu var mı?
- [ ] Supabase'de `auth.users` tablosunda kullanıcı var mı?
- [ ] Email confirmation açık mı?
- [ ] `profiles` tablosu var mı?

## 🚀 Hızlı Test

Test sayfasını kullanın:
1. `test_supabase_connection.html` dosyasını tarayıcıda açın
2. **Test Connection** butonuna tıklayın
3. **Test Signup** butonuna tıklayın
4. Sonuçları kontrol edin

