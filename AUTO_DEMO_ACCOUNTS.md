# Demo Accounts - AUTOMATED BATCH CREATION 🚀

## 🔍 Cek .env.local Dulu!

Kamu tidak punya `SERVICE_ROLE_KEY` di .env.local!
Script memerlukan Supabase **Service Role Key** untuk membuat admin users.

Cek isi file kamu:
```
NEXT_PUBLIC_SUPABASE_URL=https://lwzdgxyhorocyysuvceh.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_...
GROQ_API_KEY=gsk_D...
OPIK_API_KEY=3rBkX...
❌ TIDAK ADA SERVICE_ROLE_KEY!
```

**Service Role Key** berbeda dengan anon key yang ada!
Harus didapat dari Supabase Dashboard.

---

## Cara Setup (10 Menit)

### Step 1: Dapatkan Service Role Key (5 menit) ⚙️

**Wajib!** Script tidak akan jalan tanpa ini.

1. Buka https://supabase.com/dashboard
2. Select project: **ASCEND Fitness RPG**
3. Pergi ke: **Settings → API**
4. Scroll ke: **Service Role Keys** section
5. Klik: **"Generate new service role key"**
6. Beri nama: "Demo Accounts Creator"
7. Pilih permissions:
   - ✅ `auth.users.create` (Buat user baru)
   - ✅ `auth.users.read` (Baca user data)
   - ✅ `auth.users.update` (Update metadata)
8. Generate dan copy key (format: `eyJhbGc...`)

**Catatan**: Service role key MULAI berbeda dengan anon key yang ada di .env.local!

### Step 2: Set Environment Variable (2 menit) ⚙️

```bash
# Buat atau update file .env.local

# Windows PowerShell:
$env:SERVICE_ROLE_KEY="paste-full-key-here"

# Linux/Mac (terminal):
export SERVICE_ROLE_KEY="paste-full-key-here"

# Atau tambahkan langsung ke file:
echo 'SERVICE_ROLE_KEY="paste-full-key-here"' >> .env.local
```

### Step 3: Verifikasi (1 menit) 🔍

```bash
# Cek apakah key sudah diset
echo $SERVICE_ROLE_KEY

# Harus tampil key yang di-paste (panjang, mulai dengan eyJhbGc...)
```

Jika output kosong atau error, ulangi Step 2.

### Step 4: Jalankan Script (30 detik) 🚀

```bash
node scripts/create-demo-accounts.js
```

**Expected Output**:
```
🚀 Starting demo accounts creation...
📡 Project: https://lwzdgxyhorocyysuvceh.supabase.co

✅ [1/24] Created: ShadowHunter (S-Rank)
✅ [2/24] Created: PhantomBlade (S-Rank)
...
✅ [24/24] Created: ShadowPaw (C-Rank)

═════════════════════════════════
📊 SUMMARY
═══════════════════════════════════
Total: 24
✅ Success: 24
❌ Failed: 0

🎉 Demo accounts created successfully!

📝 Login Credentials:
   Email: [username]@test.com
   Password: Demo123!

💡 Next Step: Run profile creation SQL to create profiles for these users
```

---

## Troubleshooting

### Error: "SERVICE_ROLE_KEY environment variable is required"
```
❌ ERROR: SERVICE_ROLE_KEY environment variable is required
❌ Get it from: https://supabase.com/dashboard > Settings > API
```

**Solusi**:
- Ikuti Step 1 di atas
- Pastikan service role key dicopy dengan benar
- Set di .env.local sesuai sistem operasi
- Restart terminal jika perlu

### Error: "Failed to create user" + Status 401/403/404
- Service role key salah, expired, atau tidak punya permission yang cukup
- Generate new service role key
- Pastikan permissions: `auth.users.create`, `auth.users.read`, `auth.users.update`

### Error: "Failed to fetch" atau Network Error
- Cek internet connection
- Cek NEXT_PUBLIC_SUPABASE_URL di .env.local
- Coba ulang setelah beberapa saat
- Pastikan Supabase project tidak di-pause/suspend

### Error: TypeError / JSON Parse Error
- Key yang di-copy tidak lengkap atau terpotong
- Copy ulang dari Supabase Dashboard
- Pastikan tidak ada spasi ekstra di awal/akhir

---

## Demo Accounts Details

### Password Unified: `Demo123!`
Semua demo accounts pakai password yang SAMA untuk kemudahan testing!

### Structure:

**S-Rank (2 akun)** - Level 90-95
| Username | Class | Level | XP | Stats |
|----------|-------|-------|-----|-------|
| ShadowHunter | Assassin | 95 | 237.5k | STR:95 AGI:88 STA:92 |
| PhantomBlade | Striker | 92 | 184k | STR:92 AGI:90 STA:88 |

**A-Rank (6 akun)** - Level 70-78
| Username | Class | Level | XP |
|----------|-------|-------|-----|
| ThunderStrike | Tank | 78 | 156k |
| FrostWarrior | Striker | 75 | 150k |
| IronTank | Tank | 72 | 144k |
| FlameKnight | Tank | 71 | 142k |
| StormRider | Striker | 69 | 138k |
| VoidWalker | Assassin | 68 | 136k |

**B-Rank (8 akun)** - Level 32-48
| Username | Class | Level | XP |
|----------|-------|-------|-----|
| SwiftWolf | Assassin | 48 | 96k |
| CyberDragon | Tank | 45 | 90k |
| BlazingFist | Striker | 42 | 84k |
| ThunderClaw | Striker | 40 | 80k |
| ShadowStrike | Assassin | 40 | 80k |
| FrozenSoul | Tank | 38 | 76k |
| IronShield | Tank | 35 | 70k |
| BladeRunner | Striker | 32 | 64k |

**C-Rank (8 akun)** - Level 5-22
| Username | Class | Level | XP |
|----------|-------|-------|-----|
| SwiftNinja | Assassin | 22 | 44k |
| CyberWolf | Striker | 20 | 40k |
| DreadKnight | Tank | 18 | 36k |
| SilverFang | Assassin | 15 | 30k |
| ThunderBolt | Striker | 12 | 24k |
| IronHeart | Tank | 10 | 20k |
| FrostStrike | Striker | 8 | 16k |
| ShadowPaw | Assassin | 5 | 10k |

---

## Step 5: Buat Profiles (5 menit) 📋

Setelah users berhasil dibuat, buat profiles:

1. Copy semua isi file: `supabase/migrations/012_fix_demo_accounts.sql`
2. Buka Supabase SQL Editor
3. Paste dan execute
4. Ini akan membuat profiles untuk semua 24 users

---

## Step 6: Test Login (1 menit) 🎮

1. Buka `/auth/login`
2. Coba login dengan akun S-Rank:
   - Email: `shadowhunter@test.com`
   - Password: `Demo123!`
3. Harus berhasil dan redirect ke `/dashboard`
4. Cek profile data (rank, level, XP, stats)

---

## Files

### ✅ Baru (Otomatis)
- `scripts/create-demo-accounts.js` - Script batch creation
- `AUTO_DEMO_ACCOUNTS.md` - Dokumentasi ini

### ✅ Sudah Ada
- `app/api/generate-demo-data/route.ts` - API untuk generate data (opsional)
- `supabase/migrations/012_fix_demo_accounts.sql` - SQL untuk buat profiles
- `app/auth/reset-password/page.tsx` - Reset password page
- `app/auth/login/page.tsx` - Enhanced login page

---

## Alternative: Manual (Jika Script Gagal) 😬

Jika script tetap gagal setelah mengikuti semua steps:

1. Buka Supabase Dashboard → Authentication → Users
2. "Add user" x 24 kali (sangat membosong)
3. Gunakan username/email dari script output (bisa dijalankan untuk lihat saja)
4. Password: `Demo123!` untuk semua
5. Toggle: "Confirm email" untuk semua
6. Add metadata (lihat tabel di atas) untuk setiap user

Total waktu: ~2 jam manual 😢

---

## Summary

**🚀 BARU: Otomatis batch creation!**
- Waktu: ~40 detik total (10 menit setup + 30 detik eksekusi)
- Tidak lagi satu per satu di Dashboard!
- Data random setiap kali dijalankan
- Password unified: `Demo123!`
- Progress tracking real-time

**Required:**
- ⚠️ Service Role Key (WAJIB dari Supabase Dashboard)
- Node.js (sudah terinstall)

**Quick Start:**
1. Buka https://supabase.com/dashboard → Settings → API
2. Generate service role key dengan permissions: auth.users.create/read/update
3. Set di .env.local: `SERVICE_ROLE_KEY="paste-key-here"`
4. Jalankan: `node scripts/create-demo-accounts.js`
5. Run SQL untuk buat profiles
6. Test login: `shadowhunter@test.com` / `Demo123!`

**Total: ~12 menit vs 2 jam manual!** ⚡🚀
