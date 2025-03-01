import LoginPage from "@/views/auth/login.vue";
import RegisterPage from "@/views/auth/register.vue";

export default [
  { path: "/login", component: LoginPage, name: "Login" },
  { path: "/register", component: RegisterPage, name: "Register" }
];