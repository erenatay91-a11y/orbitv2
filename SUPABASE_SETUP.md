# Supabase Database Setup Guide

Bu dosya Orbit v7 uygulaması için Supabase veritabanı kurulumunu açıklar.

## 📋 Adımlar

### 1. Supabase Dashboard'a Giriş

1. [Supabase Dashboard](https://supabase.com/dashboard) adresine gidin
2. Projenizi seçin: `cohjxujvdfbsohhlvnus`
3. Sol menüden **SQL Editor**'ı açın

### 2. SQL Script'i Çalıştırma

1. SQL Editor'da **New Query** butonuna tıklayın
2. `supabase_schema.sql` dosyasının içeriğini kopyalayın
3. SQL Editor'a yapıştırın
4. **Run** butonuna tıklayın (veya `Cmd/Ctrl + Enter`)

### 3. Tabloların Kontrolü

1. Sol menüden **Table Editor**'ı açın
2. Şu tabloların oluşturulduğunu kontrol edin:
   - ✅ `profiles`
   - ✅ `groups`
   - ✅ `group_members`
   - ✅ `posts`
   - ✅ `post_likes`
   - ✅ `comments`

### 4. Row Level Security (RLS) Kontrolü

1. Her tablo için **RLS** aktif olmalı
2. Table Editor'da tabloyu açın
3. **Settings** sekmesinde **Enable RLS** seçeneğinin aktif olduğunu kontrol edin

## 🔐 Authentication Ayarları

### Email Confirmation (Test için kapatılabilir)

1. **Authentication** → **Settings** menüsüne gidin
2. **Enable email confirmations** seçeneğini kontrol edin:
   - **Test için**: Kapatın (kullanıcılar email onayı olmadan giriş yapabilir)
   - **Production için**: Açık tutun (güvenlik için önerilir)

### Email Templates (Opsiyonel)

1. **Authentication** → **Email Templates** menüsüne gidin
2. Email şablonlarını özelleştirebilirsiniz

## 📊 Oluşturulan Tablolar

### `profiles`
Kullanıcı profilleri
- `id` (UUID, Primary Key, auth.users ile bağlı)
- `username` (TEXT, Unique)
- `display_name` (TEXT)
- `email` (TEXT)
- `avatar_url` (TEXT)
- `avatar_color` (TEXT)

### `groups`
Grup bilgileri
- `id` (UUID, Primary Key)
- `name` (TEXT)
- `slug` (TEXT, Unique)
- `about` (TEXT)
- `category` (TEXT)
- `cover_gradient` (TEXT)
- `icon_url` (TEXT)
- `is_private` (BOOLEAN)
- `owner_id` (UUID, auth.users ile bağlı)

### `group_members`
Grup üyelikleri
- `id` (UUID, Primary Key)
- `group_id` (UUID, groups ile bağlı)
- `user_id` (UUID, auth.users ile bağlı)
- `role` (TEXT: 'owner', 'admin', 'member')
- `joined_at` (TIMESTAMPTZ)

### `posts`
Gönderiler
- `id` (UUID, Primary Key)
- `author_id` (UUID, auth.users ile bağlı)
- `group_id` (UUID, groups ile bağlı, nullable)
- `title` (TEXT, nullable)
- `content` (TEXT)
- `image_url` (TEXT, nullable)
- `video_url` (TEXT, nullable)
- `is_sensitive` (BOOLEAN)
- `created_at` (TIMESTAMPTZ)
- `updated_at` (TIMESTAMPTZ)

### `post_likes`
Beğeniler
- `id` (UUID, Primary Key)
- `post_id` (UUID, posts ile bağlı)
- `user_id` (UUID, auth.users ile bağlı)
- `created_at` (TIMESTAMPTZ)

### `comments`
Yorumlar
- `id` (UUID, Primary Key)
- `post_id` (UUID, posts ile bağlı)
- `author_id` (UUID, auth.users ile bağlı)
- `text` (TEXT)
- `parent_id` (UUID, comments ile bağlı, nullable - nested comments için)
- `created_at` (TIMESTAMPTZ)
- `updated_at` (TIMESTAMPTZ)

## 🔧 Otomatik Özellikler

### 1. Otomatik Profil Oluşturma
Yeni kullanıcı kaydolduğunda otomatik olarak `profiles` tablosunda profil oluşturulur.

### 2. Updated At Trigger
`profiles`, `groups`, `posts`, `comments` tablolarında güncelleme yapıldığında `updated_at` otomatik güncellenir.

### 3. Count Functions
- `get_post_likes_count(post_uuid)` - Post beğeni sayısı
- `get_post_comments_count(post_uuid)` - Post yorum sayısı
- `get_group_members_count(group_uuid)` - Grup üye sayısı

## 🔒 Row Level Security (RLS) Politikaları

Tüm tablolarda RLS aktif ve şu politikalar tanımlı:

- **Profiles**: Herkes görüntüleyebilir, kullanıcılar sadece kendi profilini güncelleyebilir
- **Groups**: Herkes public grupları görebilir, sadece private gruplara üye olanlar görebilir
- **Posts**: Public gruplardaki veya üye olunan gruplardaki postlar görüntülenebilir
- **Comments**: Post görüntülenebiliyorsa yorumları da görüntülenebilir
- **Likes**: Herkes beğenileri görebilir, kullanıcılar sadece kendi beğenilerini ekleyebilir/silebilir

## ✅ Kurulum Sonrası Kontrol

1. ✅ Tüm tablolar oluşturuldu mu?
2. ✅ RLS tüm tablolarda aktif mi?
3. ✅ Indexler oluşturuldu mu?
4. ✅ Trigger'lar çalışıyor mu?
5. ✅ Test kullanıcısı oluşturup profil oluştu mu?

## 🐛 Sorun Giderme

### "relation does not exist" hatası
- SQL script'in tamamını çalıştırdığınızdan emin olun
- Tabloların oluşturulduğunu Table Editor'dan kontrol edin

### RLS hatası
- Her tablo için RLS'in aktif olduğunu kontrol edin
- Politikaların doğru oluşturulduğunu kontrol edin

### Profil oluşturulmuyor
- `handle_new_user` trigger'ının oluşturulduğunu kontrol edin
- `auth.users` tablosunda yeni kullanıcı var mı kontrol edin

## 📝 Notlar

- Bu script idempotent'tir (birden fazla kez çalıştırılabilir)
- `IF NOT EXISTS` kullanıldığı için mevcut tabloları silmez
- Production'da email confirmation'ı açık tutmanız önerilir

