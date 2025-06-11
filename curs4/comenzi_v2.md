
## Creează un nou proiect Vue folosind Vite:
```
npm create vite@latest fronted
```
sau 
```
npm create vite@latest vuecrud --template vue
```
2. Navighează în directorul proiectului:
```
cd vuecrud
```
3. Instalează dependențele:
```
npm install
npm run dev
```
4. Instalează module necesare Vue:
```
npm install vue-router@4
npm install axios
npm install --save bootstrap
npm install --save bootstrap-icons
```
   - `vue-router` pentru gestionarea rutelor.
   - `axios` pentru efectuarea cererilor HTTP.
   - `bootstrap` și `bootstrap-icons` pentru stilizare.
```
5. Creează structura de directoare și fișierele necesare:
```
mkdir src/components
touch src/components/Footer.vue
touch src/components/NavBar.vue
touch src/components/AddUser.vue
touch src/components/Admin.vue
touch src/components/Home.vue
touch src/components/ProfilUser.vue
touch src/router.ts
touch src/vue-shims.d.ts
touch src/http-common.ts
mkdir src/services
touch src/services/UserService.ts 

```
6. Creează fișierul `src/router.ts` pentru gestionarea rutelor:


# Adaugam rutele in main.ts

# modificam src/App.vue

# In src facem http-common.ts