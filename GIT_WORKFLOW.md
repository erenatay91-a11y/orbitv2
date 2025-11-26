# Git Workflow - Kod Güncellemeleri

## 🔄 Nasıl Çalışıyor?

### 1. Ben Kodları Güncelliyorum
- Ben (AI) local dosyalarınızda değişiklik yapıyorum
- Değişiklikler **henüz GitHub'da değil**, sadece bilgisayarınızda

### 2. GitHub'a Push Etmeniz Gerekiyor
Değişiklikleri GitHub'a göndermek için:

```bash
cd /Users/erenatay/Desktop/v7
git add .
git commit -m "Açıklayıcı mesaj"
git push
```

### 3. Vercel Otomatik Deploy Yapar
- GitHub'a push yaptığınızda
- Vercel otomatik olarak değişiklikleri algılar
- Yeni bir deployment başlatır
- 1-2 dakika içinde siteniz güncellenir

## 🚀 Hızlı Push Komutları

### Tüm Değişiklikleri Push Et
```bash
cd /Users/erenatay/Desktop/v7
git add .
git commit -m "Update: açıklama"
git push
```

### Sadece Belirli Dosyaları Push Et
```bash
cd /Users/erenatay/Desktop/v7
git add orbitv7.html services.supabase.js
git commit -m "Fix: Supabase connection"
git push
```

## 📋 Mevcut Durum

**GitHub Repository:** `https://github.com/erenatay91-a11y/orbitv2`

**Son Push:** ✅ Yapıldı (Supabase initialization fix)

## ⚡ Otomatik Workflow

```
Ben Kod Günceller → Git Add/Commit/Push → GitHub → Vercel Otomatik Deploy
```

## 🔍 Kontrol

GitHub'da değişikliklerin olup olmadığını kontrol etmek için:
```bash
git status
git log --oneline -5
```

## 💡 İpucu

Her değişiklikten sonra:
1. `git status` - Hangi dosyalar değişti?
2. `git add .` - Tüm değişiklikleri ekle
3. `git commit -m "Mesaj"` - Commit yap
4. `git push` - GitHub'a gönder

Vercel otomatik olarak deploy edecek! 🎉

