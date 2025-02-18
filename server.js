const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

let posts = [
  {
    id: 1,
    title: "Üdvözlet a Blogban",
    subtitle: "Az első bejegyzés",
    shortText: "Ez egy rövid bevezető a blog első bejegyzéséhez.",
    text: "Ez a teljes tartalom az első bejegyzéshez, ahol részletesen kifejtjük a témát és megosztjuk gondolatainkat.",
    image: "https://via.placeholder.com/600x400",
    category: "Tech"
  },
  {
    id: 2,
    title: "Élet és kaland",
    subtitle: "Az élet apró örömei",
    shortText: "Rövid összefoglaló az élet szépségeiről.",
    text: "Ebben a bejegyzésben az élet apró örömeit és a mindennapok csodáit ismerjük meg részletesen.",
    image: "https://via.placeholder.com/600x400",
    category: "Life"
  },
  {
    id: 3,
    title: "Utazási élmények",
    subtitle: "Fedezd fel a világot",
    shortText: "Rövid leírás az utazás örömeiről.",
    text: "Ebben a részletes bejegyzésben bemutatjuk az utazás élményeit, tippeket és látnivalókat különböző országokból.",
    image: "https://via.placeholder.com/600x400",
    category: "Travel"
  },
  {
    id: 4,
    title: "Gasztronómiai kalandok",
    subtitle: "Ízek és élmények",
    shortText: "Rövid ismertető a kulináris utazásról.",
    text: "A gasztronómia szerelmeseinek szánt bejegyzésünkben bemutatjuk a különböző ízeket, recepteket és éttermi élményeket.",
    image: "https://via.placeholder.com/600x400",
    category: "Food"
  }
];

let users = [
    {
        id: 1,
        name: "Admin User",
        email: "admin@admin.hu",
        password: "admin",
        role: "admin"
      },
      {
        id: 2,
        name: "Regular User",
        email: "user@example.com",
        password: "userpass",
        role: "user"
      }
];

const getNewId = (collection) => {
  return collection.length ? Math.max(...collection.map(item => item.id)) + 1 : 1;
};

app.get('/posts', (req, res) => {
  let result = posts;

  if (req.query.q) {
    const query = req.query.q.toLowerCase();
    result = result.filter(post => post.title.toLowerCase().includes(query));
  }

  if (req.query.category) {
    result = result.filter(
      post => post.category.toLowerCase() === req.query.category.toLowerCase()
    );
  }

  res.json(result);
});

app.get('/posts/:id', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (post) {
    res.json(post);
  } else {
    res.status(404).json({ error: "Post not found" });
  }
});

app.post('/posts', (req, res) => {
  const newPost = { id: getNewId(posts), ...req.body };
  posts.push(newPost);
  res.status(201).json(newPost);
});

app.put('/posts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = posts.findIndex(p => p.id === id);
  if (index !== -1) {
    posts[index] = { id, ...req.body };
    res.json(posts[index]);
  } else {
    res.status(404).json({ error: "Post not found" });
  }
});

app.delete('/posts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = posts.findIndex(p => p.id === id);
  if (index !== -1) {
    const deleted = posts.splice(index, 1);
    res.json(deleted[0]);
  } else {
    res.status(404).json({ error: "Post not found" });
  }
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    res.json({ user, token: "fake-jwt-token" });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

app.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  if (users.find(u => u.email === email)) {
    res.status(400).json({ error: "Email already exists" });
  } else {
    const newUser = { id: getNewId(users), name, email, password };
    users.push(newUser);
    res.status(201).json({ user: newUser, token: "fake-jwt-token" });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
