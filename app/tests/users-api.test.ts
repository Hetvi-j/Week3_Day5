import { NextRequest } from "next/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const { readFileSync, writeFileSync } = vi.hoisted(() => ({
  readFileSync: vi.fn(),
  writeFileSync: vi.fn(),
}));

vi.mock("fs", () => ({
  default: {
    readFileSync,
    writeFileSync,
  },
  readFileSync,
  writeFileSync,
}));

describe("users API routes", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("GET returns all users", async () => {
    readFileSync.mockReturnValue(
      JSON.stringify([
        { id: 1, name: "Hetvi", email: "hetvi@gmail.com" },
      ])
    );

    const { GET } = await import("../api/users/route");
    const response = await GET();
    const body = await response.json();

    expect(readFileSync).toHaveBeenCalledTimes(1);
    expect(body).toEqual([
      { id: 1, name: "Hetvi", email: "hetvi@gmail.com" },
    ]);
  });

  it("POST adds a new user", async () => {
    vi.spyOn(Date, "now").mockReturnValue(12345);
    readFileSync.mockReturnValue(
      JSON.stringify([
        { id: 1, name: "Hetvi", email: "hetvi@gmail.com" },
      ])
    );

    const { POST } = await import("../api/users/route");
    const request = {
      json: vi.fn().mockResolvedValue({
        name: "Asha",
        email: "asha@gmail.com",
      }),
    } as unknown as NextRequest;

    const response = await POST(request);
    const body = await response.json();

    expect(writeFileSync).toHaveBeenCalledTimes(1);
    expect(body).toEqual({
      message: "User Added",
      user: {
        id: 12345,
        name: "Asha",
        email: "asha@gmail.com",
      },
    });
  });

  it("PUT updates a user by id", async () => {
    readFileSync.mockReturnValue(
      JSON.stringify([
        { id: 1, name: "Hetvi", email: "hetvi@gmail.com" },
        { id: 2, name: "Asha", email: "asha@gmail.com" },
      ])
    );

    const { PUT } = await import("../api/users/[id]/route");
    const request = {
      json: vi.fn().mockResolvedValue({
        name: "Hetvi Updated",
        email: "hetvi.updated@gmail.com",
      }),
    } as unknown as NextRequest;

    const response = await PUT(request, {
      params: Promise.resolve({ id: "1" }),
    });
    const body = await response.json();

    expect(writeFileSync).toHaveBeenCalledTimes(1);
    expect(body).toEqual({
      message: "user updated succesfully",
    });
  });

  it("DELETE removes a user by id", async () => {
    readFileSync.mockReturnValue(
      JSON.stringify([
        { id: 1, name: "Hetvi", email: "hetvi@gmail.com" },
        { id: 2, name: "Asha", email: "asha@gmail.com" },
      ])
    );

    const { DELETE } = await import("../api/users/[id]/route");
    const request = {} as NextRequest;

    const response = await DELETE(request, {
      params: Promise.resolve({ id: "2" }),
    });
    const body = await response.json();

    expect(writeFileSync).toHaveBeenCalledTimes(1);
    expect(body).toEqual({
      message: "User deleted successfully",
    });
  });
});
