"use server";

export default async function handleLogin(prevState: any, formData: FormData) {
  const password = formData.get("password");

  if(password === "12345") {
    return {
      success: true,
      message: "Welcome back!",
    };
  } else {
    return {
      success: false,
      message: "Wrong password",
    };
  }
}