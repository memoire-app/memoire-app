import { ref } from "vue";
import { useRouter } from "vue-router";

const isMenuOpen = ref(false);

export const useNavbar = () => {
  const router = useRouter();

  const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
  };

  const closeMenu = () => {
    isMenuOpen.value = false;
  };

  const goTo = (path: string) => {
    router.push(`/${path}`);
    closeMenu();
  };

  const isRouteActive = (path: string) => {
    return router.currentRoute.value.path.includes(path);
  };

  return {
    isMenuOpen,
    toggleMenu,
    closeMenu,
    goTo,
    isRouteActive,
  };
};
