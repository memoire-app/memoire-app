import { useAuth } from "~/composables/useAuth.js";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const { checkAuth } = useAuth();

  // Allow access to the index page without authentication
  if (to.path === "/") {
    return;
  }

  try {
    const user = await checkAuth();
    if (user === false) {
      // If we went from the login page, we redirect to the login page
      if (from.path === "/login") {
        return navigateTo("/login");
      }
    }
    useState("avatar", () => {
      if (user) {
        return user.avatar;
      }
    });
    useState("user", () => user);
  } catch {
    if (from.path === "/login") {
      return navigateTo("/login");
    }
    return navigateTo("/");
  }
});
