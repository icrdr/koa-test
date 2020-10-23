import { sum } from "./user.controller";
import request from "supertest";
import { createApp } from "../app";
import Koa from "koa";
import { connection } from "../db";

describe("Test the root path", () => {
  let app: Koa;

  beforeAll(async () => {
    await connection.create();
  });

  beforeEach(async () => {
    app = await createApp();
  });

  afterAll(async () => {
    await connection.clear();
    await connection.close();
  });

  test("1", async () => {
    const response = await request(app.callback()).get("/api/users");
    expect(response.status).toBe(400);
    expect(response.text).toBe("xxx");
  });
  test("2", async () => {
    const response = await request(app.callback()).get("/api/a");
    expect(response.status).toBe(400);
    expect(response.text).toBe("xxx");
  });
});
