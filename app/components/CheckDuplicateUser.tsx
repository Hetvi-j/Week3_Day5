interface User{
  id: number;
  name: string;
  email: string;
}

export default function checkDuplicateUser(
  users:User[],
  email:string,
  currentUserId:number | null = null
):boolean {

  return users.some(

    (user:User) =>

      user.email.toLowerCase() ===
      email.toLowerCase()

      &&

      user.id !== currentUserId
  );
}