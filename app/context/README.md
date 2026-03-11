# Application Context (User State Management)

Ye folder hamari application ke **Global State Management** ke liye banaya gaya hai. Yahan par hum React Context API ka use karke User ki information (login state, profile data) ko manage kar rahe hain taaki kisi bhi component ko bina "Prop Drilling" (bar-bar props pass kiye) aasaani se user data mil sake.

## 📂 Is Folder Mein Kya Hai?

- **`UserContext.tsx`**: Ye is folder ki main file hai jisme **UserContext**, **Interfaces**, **Custom Hook (`useUser`)**, aur **ContextProvider** component define kiye gaye hain.

## 🧠 Kon Si Cheez Kaise Kaam Kar Rahi Hai? (Short Brief)

Is file ko 4 main hisson (parts) mein baanta gaya hai:

### 1. Types & Interfaces (Data ka Blueprint)
- **`infoInterface`**: Ye define karta hai ki User ke object mein kaun-kaun si properties hongi (jaise `username`, `email` etc.). Jin properties ke aage `?` (question mark) laga hai, wo optional hain.
- **`contextInterface`**: Ye define karta hai ki Context Provider baaki app ko kya bhejega. Isme do cheezein pass ho rahi hain:
  - `info`: Jisme User ka actual data hoga (ya `null` agar logout/unauthenticated hai).
  - `setInfo`: Data ko update/change karne ka function.

### 2. Context Creation
- **`UserContext`**: Yahan humne `createContext` ka use karke ek nayi empty context box banayi hai jiski shuruaati value `null` rakhi gayi hai. Ye asal mein ek Global Store banata hai.

### 3. Custom Hook (`useUser`) ✨ (Sabse Important & Safe)
- Context ko consume (use) karne ke liye hum direct `useContext(UserContext)` use kar sakte the. Lekin usse TypeScript baar-baar warning / null error dega.
- Isliye humne ek custom hook banaya `useUser()`. Ye function check karta hai ki agar `info` `null` or undefined hai toh theek se properly ek error throw karega ki *"Aap is hook ko Provider ke bahar nahi use kar sakte"*. Iski wajah se humara app TypeScript Types me 100% safe ban gaya.
- Kisi bhi componet me data use karne ke liye simple: `const { info, setInfo } = useUser();` call karna hota hai.

### 4. Context Provider Component
- **State Management**: `useState` ke through current user data (`info`) store kiya jata hai.
- **Local Storage Visibility (`useEffect`)**: Isme 3 `useEffect` functions lage hain. 
  1. Pehla `useEffect` page load (mount) hone par LocalStorage check karta hai ki kya koi session pehle se save hai, "kiya user pehle se logged in hai?". Agar haan, to load kar leta hai (Taaki page refresh pe user logout na ho).
  2. Dusra aur teesra `useEffect` tab run hote hain jab `info` update hoti hai (Login / Logout). Ye LocalStorage me data automatically Add ya Remove (clear) kar dete hain.
- **`children` Wrapper**: Provider component apne andar aane wale saare dusre components (`children`) ko Context ki values provide karta hai.

---

### 💻 App me Ise Kaise Use Kare?

**Kahin bhi Login / Signup mein (Data set karne ke liye):**
```tsx
import { useUser } from '@/app/context/UserContext';

const LoginComponent = () => {
  const { setInfo } = useUser();
  
  const handleLogin = () => {
    // API se data aane ke baad
    setInfo({ username: 'Amit', email: 'amit@example.com' });
  };
}
```

**Kahin bhi Dashboard/Header me (Data read karne ke liye):**
```tsx
import { useUser } from '@/app/context/UserContext';

const Dashboard = () => {
  const { info } = useUser();
  
  return (
    <div>
      <h1>Welcome, {info?.username}</h1>
    </div>
  );
}
```
