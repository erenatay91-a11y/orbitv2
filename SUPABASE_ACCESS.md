# Supabase Projesi Erişim Bilgileri

## ✅ Proje Durumu

Proje **ÇALIŞIYOR** ve API'ye erişim mevcut!

**Proje URL:** `https://cohjxujvdfbsohhlvnus.supabase.co`  
**Proje Referansı:** `cohjxujvdfbsohhlvnus`

## 🔍 Dashboard'da Görünmüyorsa

Eğer Supabase Dashboard'da bu projeyi göremiyorsanız, şu nedenler olabilir:

1. **Farklı Organizasyonda**: Proje başka bir organizasyonda olabilir
   - Dashboard'da organizasyon değiştirmeyi deneyin
   - Sol üstteki organizasyon seçicisini kontrol edin

2. **Farklı Hesapta**: Proje başka bir GitHub/Email hesabıyla oluşturulmuş olabilir
   - O hesaba giriş yapmanız gerekebilir

3. **Proje Aktif Ama Görünmüyor**: Bazen projeler listede görünmeyebilir
   - Direkt URL ile erişmeyi deneyin: `https://supabase.com/dashboard/project/cohjxujvdfbsohhlvnus`

## ✅ Proje Çalışıyor - Ne Yapmalı?

Proje API'si çalışıyor, bu yüzden:

### 1. Tabloları Kontrol Edin

SQL Editor'dan şu sorguyu çalıştırın:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;
```

### 2. Eksik Tablolar Varsa

Eğer tablolar eksikse veya şema farklıysa:

1. **SQL Editor**'ı açın
2. `supabase_schema.sql` dosyasını çalıştırın
3. Tablolar oluşturulacak veya güncellenecek

### 3. Direkt Erişim

Dashboard'a erişemeseniz bile, proje çalışıyor:

- ✅ API erişimi var
- ✅ Tablolar mevcut (profiles, groups, posts, comments, post_likes, group_members)
- ✅ Authentication çalışıyor

## 🔧 Alternatif Erişim Yolları

### SQL Editor'a Direkt Erişim

1. Tarayıcıda şu URL'yi açın:
   ```
   https://supabase.com/dashboard/project/cohjxujvdfbsohhlvnus/sql
   ```

2. Veya Settings → API menüsüne direkt erişim:
   ```
   https://supabase.com/dashboard/project/cohjxujvdfbsohhlvnus/settings/api
   ```

### Table Editor'a Direkt Erişim

```
https://supabase.com/dashboard/project/cohjxujvdfbsohhlvnus/editor
```

## 📊 Mevcut Tablolar

API'den görünen tablolar:
- ✅ `profiles`
- ✅ `groups`
- ✅ `group_members`
- ✅ `posts`
- ✅ `post_likes`
- ✅ `comments`

## ⚠️ Önemli Not

Proje çalışıyor ama dashboard'da görünmüyorsa:
- Proje başka bir organizasyonda olabilir
- Ya da başka bir hesapta oluşturulmuş olabilir
- Ama API erişimi çalıştığı için uygulama normal çalışacaktır

## 🚀 Sonraki Adımlar

1. Uygulamayı test edin - çalışıyor olmalı
2. Yeni kullanıcı kaydı yapmayı deneyin
3. Eğer hata alırsanız, SQL script'i çalıştırın

