import { Database } from "../src/database";

describe("Connection", () => {
  it("should be able to connect", async done => {
    const db = await Database.createNew("00");
    const isConnected = await db.isConnected();
    expect(isConnected).toBeTruthy();
    done();
  });
});
