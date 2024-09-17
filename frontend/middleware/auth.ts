import { useAuth } from "~/composables/useAuth.js";

export default defineNuxtRouteMiddleware(async (to) => {
  const { checkAuth } = useAuth();

  // Allow access to the index page without authentication
  if (to.path === "/") {
    return;
  }

  try {
    const user = await checkAuth();
    if (user === false) {
      return navigateTo("/");
    }
    useState("avatar", () => user.avatar);
    useState("user", () => user);
  } catch {
    return navigateTo("/");
  }
});
