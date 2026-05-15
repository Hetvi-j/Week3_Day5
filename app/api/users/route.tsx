import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// User Type
interface User {
  id: number;
  name: string;
  email: string;
}

// Create User Input Type
interface CreateUserInput {
  name: string;
  email: string;
}

const filePath = path.join(process.cwd(), "data/users.json");

// List All Users
export async function GET(): Promise<NextResponse> {

  const data: string = fs.readFileSync(filePath, "utf-8");

  const users: User[] = JSON.parse(data);

  return NextResponse.json(users);
}

// Add User
export async function POST(
  req: NextRequest
): Promise<NextResponse> {

  const body: CreateUserInput = await req.json();

  const data: string = fs.readFileSync(filePath, "utf-8");

  const users: User[] = JSON.parse(data);

  const newUser: User = {
    id: Date.now(),
    name: body.name,
    email: body.email,
  };

  users.push(newUser);

  fs.writeFileSync(
    filePath,
    JSON.stringify(users, null, 2)
  );

  return NextResponse.json({
    message: "User Added",
    user: newUser,
  });
}





// import { NextResponse } from "next/server";
// import fs from "fs";
// import path from "path";

// const filePath = path.join(process.cwd(), "src/data/users.json");

// // List all User
// export async function GET() {

//   const data = fs.readFileSync(filePath, "utf-8");
//   const users = JSON.parse(data);

//   return NextResponse.json(users);
// }


// // Add User
// export async function POST(req) {

//   const body = await req.json();

//   const data = fs.readFileSync(filePath, "utf-8");
//   const users = JSON.parse(data);

//   const newUser = {
//     id: Date.now(),
//     name: body.name,
//     email: body.email,
//   };

//   users.push(newUser);

//   fs.writeFileSync( filePath , JSON.stringify(users, null, 2));

//   return NextResponse.json({
//     message: "User Added",
//     user: newUser,
//   });
// }
