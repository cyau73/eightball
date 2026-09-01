# 🔮 Sassy Magic 8-Ball (iOS, Android & Vercel API)

A cross-platform mobile application that delivers hilarious, witty, and savage fortunes when the user **shakes** their device (using the hardware accelerometer) or **spins/swipes** the 8-Ball with their finger.

Powered by a **PostgreSQL database** and serverless API deployed on **Vercel**, with persistent unique installation seeding per user.

---

## 📱 Tech Stack & Architecture

```
eightball/
├── api/          # Serverless Vercel API & PostgreSQL Database (Next.js 14 + Prisma)
└── mobile/       # Cross-platform Mobile App (Expo / React Native for iOS & Android)
```

- **Mobile Client**: Expo SDK 51, React Native, `expo-sensors` (Accelerometer for shake detection), `expo-haptics`, `expo-crypto`, `react-native-gesture-handler`, `react-native-reanimated`.
- **Backend API**: Next.js App Router, Prisma ORM, Mulberry32 deterministic seed RNG, CORS support.
- **Database**: PostgreSQL (compatible with Neon, Supabase, Vercel Postgres, AWS RDS).
- **Deployment**: Vercel for the API, Expo EAS Build for iOS (`.ipa`) and Android (`.apk` / `.aab`).

---

## 🚀 Quick Start

### 1. Run the Vercel Backend API (`/api`)

```bash
cd api
npm install
# Set your DATABASE_URL in .env (or run in resilient in-memory mode without DB)
npm run dev
```
The API dashboard and interactive playground will be live at `http://localhost:3001`.

#### PostgreSQL Setup & Seeding:
```bash
# 1. Push schema to your PostgreSQL instance
npx prisma db push

# 2. Seed 60+ curated sassy fortunes
npx prisma db seed
```

---

### 2. Run the Mobile App (`/mobile`)

```bash
cd mobile
npm install

# Start development server
npx expo start

# Run on iOS Simulator (Mac)
npm run ios

# Run on Android Emulator
npm run android

# Run on Web Preview
npm run web
```

---

## 🎲 Features

1. **Hardware Shake Detection**: Real-time accelerometer processing to detect physical device shaking with debounce filtering.
2. **Touch Spin & Gesture Physics**: Drag and fling the 3D-styled 8-Ball with your finger to trigger a fluid swirl animation.
3. **Persistent Random Seeding**: On initial install, each device generates a unique cryptographic seed (`seed_usr_xxxx`) stored persistently in `AsyncStorage`.
4. **Sass Intensity Levels**: Choose between `Mild`, `Spicy`, and `Savage` sass modes.
5. **Offline Resilient**: If offline or DB is spinning up, the client seamlessly falls back to the embedded fortune engine.
6. **Fortune Archive**: History drawer recording recent answers with timestamps and intensity badges.

---

## ☁️ Deploying to Vercel

1. Push your repository to GitHub.
2. Import the `/api` directory into [Vercel](https://vercel.com).
3. Under **Project Settings > Environment Variables**, add:
   - `DATABASE_URL`: Your PostgreSQL connection string (from Neon, Supabase, or Vercel Postgres).
4. Deploy! Your API endpoints `/api/fortune`, `/api/seed`, and `/api/health` will be live globally.
5. In the mobile app, tap **Settings** and set your production Vercel URL.

---

## 📲 Building for iOS & Android App Stores

Using [Expo Application Services (EAS)](https://expo.dev/eas):

```bash
cd mobile
npm install -g eas-cli
eas login
eas build:configure

# Build Android APK / AAB
eas build -p android --profile preview

# Build iOS App
eas build -p ios --profile preview
```
