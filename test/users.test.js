jest.setTimeout(30000);
const supertest = require("supertest");
const app = require("../app");

test("POST /api/v1/users", async () => {
  await supertest(app)
    .post("/api/v1/users")
    .field("name", "Agung")
    .field("email", "agung@gmail.com")
    .field("password", "abcd1234")
    .attach("img", "public/images/kv-laptop.png")
    .expect(201)
    .then((res) => {
      expect(res.body.status).toBe("ok");
      expect(res.body.message).toBeTruthy();
      expect(res.body.result).toBeTruthy();
    });
});

test("POST /api/v1/users (Bad Request)", async () => {
  await supertest(app)
    .post("/api/v1/users")
    .field("name", "Agung")
    .field("email", "agung@gmail")
    .field("password", "abcd1234")
    .attach("img", "public/images/kv-laptop.png")
    .expect(400)
    .then((res) => {
      expect(res.body.status).toBe("Bad Request");
      expect(res.body.message).toBeTruthy();
      expect(res.body.result).toBeTruthy();
    });
});

test("GET /api/v1/users", async () => {
  await supertest(app)
    .get("/api/v1/users")
    .expect(200)
    .then((res) => {
      expect(res.body.status).toBe("ok");
      expect(res.body.result).toBeTruthy();
      expect(Array.isArray(res.body.result)).toBeTruthy();
    });
});
