const http = require("http");
const test = require("ava");
const got = require("got");
const app = require("../index.js");

/**
 * Opens server, before tests.
 */
test.before(async (t) => {
  // Create server
  t.context.server = http.createServer(app);
  const server = t.context.server.listen();
  const { port } = server.address();
  t.context.got = got.extend({ responseType: "json", prefixUrl: `http://localhost:${port}`});
});

/**
 * Closes server, after tests
 */
test.after.always((t) => {
  t.context.server.close();
});

// DELETE /authors/{authorId}
test("DELETE /authors/{authorId}", async (t) => {
    const authorId = 0;
    const response = await t.context.got.delete(`authors/${authorId}`);
    t.is(response.statusCode, 200);
});

// GET /authors/{authorId}
test("GET /authors/{authorId}", async (t) => {
    const authorId = 0;
    const response = await t.context.got.get(`authors/${authorId}`);
    t.is(response.statusCode, 200);
    t.truthy(response.body);
    t.is(response.body.name, "name");
    t.is(response.body.id, 0);
});

// PUT /authors/{authorId}
test("PUT /authors/{authorId}", async (t) => {
    const authorId = 0;
    const requestbody = { name: "lala"};

    const response = await t.context.got.put(`authors/${authorId}`, {json :requestbody});
    t.is(response.statusCode, 200);
    t.truthy(response.body);
    t.is(response.body.name, "name");
    t.is(response.body.id, 0);
});

// GET /authors
test("GET /authors", async (t) => {
    const response = await t.context.got.get(`authors`);
    t.is(response.statusCode, 200);
    t.truthy(response.body);
    t.true(Array.isArray(response.body));
    t.is(response.body[0].name, "name");
    t.is(response.body[0].id, 0);
});

// POST /authors
test("POST /authors", async (t) => {
    const requestbody = { name: "lala"};

    const response = await t.context.got.post(`authors`, {json :requestbody});
    t.is(response.statusCode, 200);
    t.truthy(response.body);
    t.is(response.body.name, "name");
    t.is(response.body.id, 0);
});

// DELETE /books/{bookId}
test("DELETE /books/{bookId}", async (t) => {
    const bookId = 0;
    const response = await t.context.got.delete(`books/${bookId}`);
    t.is(response.statusCode, 200);
});

// GET /books/{bookId}
test("GET /books/{bookId}", async (t) => {
    const bookId = 0;
    const response = await t.context.got.get(`books/${bookId}`);
    t.is(response.statusCode, 200);
    t.truthy(response.body);
    t.is(response.body.category_id, 1);
    t.is(response.body.published_year, 5);
    t.is(response.body.id, 0);
    t.is(response.body.title, "title");
    t.is(response.body.author_id, 6);
    t.deepEqual(response.body, {
        id: 0,
        title: "title",
        author_id: 6,
        category_id: 1,
        published_year: 5
    });
});

// PUT /books/{bookId}
test("PUT /books/{bookId}", async (t) => {
    const bookId = 0;
    const requestBody = { 
        title: "new title",
        author_id: 1,
        category_id: 2,
        published_year: 4
    };
    const response = await t.context.got.put(`books/${bookId}`, {json: requestBody});
    t.is(response.statusCode, 200);
    t.truthy(response.body);
    t.deepEqual(response.body, {
        id: 0,
        title: "title",
        author_id: 6,
        category_id: 1,
        published_year: 5
    });
});

//GET /books
test("GET /books", async (t) => {
    const response = await t.context.got.get(`books`);
    t.is(response.statusCode, 200);
    t.truthy(response.body);
    t.true(Array.isArray(response.body));
    t.is(response.body[0].category_id, 1);
    t.is(response.body[0].published_year, 5);
    t.is(response.body[0].id, 0);
    t.is(response.body[0].title, "title");
    t.is(response.body[0].author_id, 6);
    t.deepEqual(response.body[0], {
        id: 0,
        title: "title",
        author_id: 6,
        category_id: 1,
        published_year: 5
    });
});

//POST /books
test("POST /books", async (t) => {
    const requestBody = { 
        title: "new title",
        author_id: 1,
        category_id: 2,
        published_year: 4
    };
    const response = await t.context.got.post(`books`, {json: requestBody});
    t.is(response.statusCode, 200);
    t.truthy(response.body);
    t.deepEqual(response.body, {
        id: 0,
        title: "title",
        author_id: 6,
        category_id: 1,
        published_year: 5
    });
});


//DELETE /categories/{categoryId}
test("DELETE /categories/{categoryId}", async (t) => {
    const categoryId = 0;
    const response = await t.context.got.delete(`categories/${categoryId}`);
    t.is(response.statusCode, 200);
});


// GET /categories/{categoryId}
test("GET /categories/{categoryId}", async (t) => {
    const categoryId = 0;
    const response = await t.context.got.get(`categories/${categoryId}`);
    t.is(response.statusCode, 200);
    t.truthy(response.body);
    t.deepEqual(response.body, {
        id: 0,
        name: "name"
    });
});

// PUT /categories/{categoryId}
test("PUT /categories/{categoryId}", async (t) => {
    const categoryId = 0;
    const requestBody = { 
        id: 4,
        name: "new name"
    };
    const response = await t.context.got.put(`categories/${categoryId}`, {json: requestBody});
    t.is(response.statusCode, 200);
    t.truthy(response.body);
    t.deepEqual(response.body, {
        name : "name",
        id : 0
    });
});

// GET /categories
test("GET /categories", async (t) => {
    const response = await t.context.got.get(`categories`);
    t.is(response.statusCode, 200);
    t.truthy(response.body);
    t.true(Array.isArray(response.body));
    t.deepEqual(response.body[0], {
        id: 0,
        name: "name"
    });
});


// POST /categories
test("POST /categories", async (t) => {
    const requestBody = {
        name: "new name"
    }
    const response = await t.context.got.post(`categories`, {json: requestBody});
    t.is(response.statusCode, 200);
    t.truthy(response.body);
    t.deepEqual(response.body, {
        id: 0,
        name: "name"
    });
});