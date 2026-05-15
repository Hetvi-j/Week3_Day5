import { NextResponse , NextRequest } from "next/server";
import fs from "fs";
import path from "path";

interface User{
    id: number;
    name: string;
    email: string;
}

interface UpdateUserInput{
    name?: string;
    email?: string;
}

interface Context {
  params: Promise<{
    id: string;
  }>;
}

const filePath = path.join(process.cwd(), "data/users.json");

// Update User
export async function PUT(req:NextRequest , context:Context) : Promise<NextResponse>
{
    const params = await context.params;
    const body: UpdateUserInput = await req.json();

    const data:string = fs.readFileSync(filePath, "utf-8");
    let users: User[] = JSON.parse(data);

    users = users.map((user:User) => 
        user.id === Number(params.id) ? {
            ...user,
            name : body.name ?? user.name,    // if body.name exist then write it otherwise keep user.name
            email : body.email ?? user.email, // same here
        } : user
    );

    fs.writeFileSync(
        filePath,
        JSON.stringify(users, null, 2)
    );

    return NextResponse.json({
        message: "user updated succesfully"
    });
}

// Delete User
export async function DELETE(
    req: NextRequest,
    context: Context
): Promise<NextResponse> {

    const params = await context.params;

    const data: string = fs.readFileSync(filePath, "utf-8");
    const users: User[] = JSON.parse(data);

    const filteredUsers: User[] = users.filter(
        (user: User) => user.id !== Number(params.id)
    );

    fs.writeFileSync(
        filePath,
        JSON.stringify(filteredUsers, null, 2)
    );

    return NextResponse.json({
        message: "User deleted successfully",
    });
}





// import { NextResponse } from "next/server";
// import fs from "fs";
// import path from "path";

// const filePath = path.join(process.cwd(), "src/data/users.json");

// // Update User
// export async function PUT(req , context){

//     const params = await context.params;
//     const body = await req.json();

//     const data = fs.readFileSync(filePath, "utf-8");
//     let users = JSON.parse(data);

//     users = users.map((user) => 
//         user.id == params.id ? {
//             ...user,
//             name : body.name,
//             email : body.email,
//         } : user
//     );

//     fs.writeFileSync(
//         filePath,
//         JSON.stringify(users, null, 2)
//     );

//     return NextResponse.json({
//         message: "user updated succesfully"
//     });
// }

// // Delete User
// export async function DELETE(req, context) {

//   const params = await context.params;

//   const data = fs.readFileSync(filePath, "utf-8");

//   let users = JSON.parse(data);

//   users = users.filter(
//     (user) => user.id != params.id
//   );

//   fs.writeFileSync( filePath , JSON.stringify(users, null, 2));

//   return NextResponse.json({
//     message: "User Deleted",
//   });
// }
