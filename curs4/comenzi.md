```

sudo npm i -g @vue/cli
vue --version   //v5.0.8

sudo npm update -g @vue/cli

vue create frontend
 // select Vue 3  //v3.4.27
cd frontend
npm run serve

la final: npm run build

npm install --save vue-router axios
npm install --save bootstrap
npm install --save @popperjs/core

add in src/main.js
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
```

# Facem componentele necesare

```
touch src/components/Footer.vue
touch src/components/NavBar.vue
touch src/components/AddUser.vue
touch src/components/Admin.vue
touch src/components/Home.vue
touch src/components/ProfilUser.vue
```

# In src facem router.js

# Adaugam rutele in main.js

# modificam src/App.vue

# In src facem http-common.js

# Facem service: /services/UserService.js
