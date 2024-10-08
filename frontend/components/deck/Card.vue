<script setup lang="ts">
import type { DeckAPI } from "~/models";
import type { PropType } from "vue";
import { copyCode } from "../../utils";

const router = useRouter();
const toast = useToast();
const headers = useRequestHeaders();
const runtimeConfig = useRuntimeConfig();

const props = defineProps({
  deck: {
    type: Object as PropType<DeckAPI>,
    required: true,
  },
});

const deleteIsOpen = ref(false);
const emit = defineEmits(["refresh"]);

const deckIsPublic = computed(() => {
  return props.deck.isPublic;
});

const copy = () => {
  copyCode(props.deck.code);
  toast.add({
    title: "Code copié : " + props.deck.code,
    icon: "i-lucide-circle-check-big",
  });
};

const deleteDeck = async () => {
  await $fetch(`/decks/${props.deck.code}`, {
    baseURL: runtimeConfig.public.BACK_URL as string,
    headers,
    credentials: "include",
    method: "DELETE",
  });

  toast.add({ title: "Deck supprimé" });
  deleteIsOpen.value = false;

  emit("refresh");
};

const privatizeDeck = async () => {
  await $fetch(`/decks/${props.deck.code}/privatize`, {
    baseURL: runtimeConfig.public.BACK_URL as string,
    headers,
    credentials: "include",
    method: "PATCH",
  });

  toast.add({ title: "Deck privatisé", icon: "i-lucide-lock-keyhole" });
  emit("refresh");
};

const publicizeDeck = async () => {
  await $fetch(`/decks/${props.deck.code}/publicize`, {
    baseURL: runtimeConfig.public.BACK_URL as string,
    headers,
    credentials: "include",
    method: "PATCH",
  });

  toast.add({ title: "Deck public", icon: "i-lucide-lock-keyhole-open" });
  emit("refresh");
};

const duplicateDeck = async () => {
  await $fetch(`/decks/${props.deck.code}/duplicate`, {
    baseURL: runtimeConfig.public.BACK_URL as string,
    headers,
    credentials: "include",
    method: "POST",
  });

  toast.add({ title: "Deck dupliqué", icon: "i-lucide-copy-plus" });
  emit("refresh");
};
</script>

<template>
  <div
    class="flex h-fit justify-between bg-white px-4 py-4 ring-neutral-300 transition-all hover:cursor-pointer hover:ring-1 dark:bg-neutral-700"
    @click="router.push('/flashcards/' + deck.code)"
  >
    <div class="flex w-4/5 flex-col gap-1 pr-2">
      <div class="flex gap-4 text-sm text-neutral-400">
        <UTooltip text="Nombre de cartes" class="flex items-center gap-1">
          <UIcon name="i-lucide-rectangle-vertical" />
          <span>{{ deck.nbFlashcards }}</span>
        </UTooltip>
        <UTooltip text="Nombre de révisions" class="flex items-center gap-1">
          <UIcon name="i-lucide-brain" />
          <span>{{ deck.nbRevisions }}</span>
        </UTooltip>
      </div>
      <span class="text-2xl font-semibold">{{ deck.title }}</span>
      <div class="mb-4 flex flex-wrap gap-2">
        <UBadge
          v-for="(tag, i) in props.deck.tagArray"
          :key="i"
          class="w-fit text-xs"
        >
          {{ tag }}
        </UBadge>
      </div>

      <UtilsLastUpdatedTag
        v-if="deck.updatedAt"
        :date="new Date(deck.updatedAt)"
      />
    </div>
    <div class="flex flex-col items-end justify-between gap-2">
      <div class="flex flex-col items-end gap-2">
        <div>
          <UTooltip v-if="deckIsPublic" text="Rendre le deck privé">
            <UButton
              icon="i-lucide-lock-keyhole-open"
              size="xs"
              variant="soft"
              color="green"
              @click.stop="privatizeDeck()"
            />
          </UTooltip>
          <UTooltip v-else text="Rendre le deck public">
            <UButton
              icon="i-lucide-lock-keyhole"
              size="xs"
              variant="soft"
              color="orange"
              @click.stop="publicizeDeck()"
            />
          </UTooltip>
        </div>

        <div class="flex gap-1">
          <UTooltip text="Dupliquer le deck">
            <UButton
              icon="i-lucide-copy-plus"
              size="xs"
              variant="soft"
              color="indigo"
              @click.stop="duplicateDeck()"
            />
          </UTooltip>

          <UTooltip text="Partager le deck">
            <UButton
              icon="i-lucide-share-2"
              size="xs"
              variant="soft"
              @click.stop="copy()"
            />
          </UTooltip>

          <UTooltip text="Supprimer le deck">
            <UButton
              icon="i-lucide-trash"
              size="xs"
              color="red"
              variant="soft"
              @click.stop="deleteIsOpen = true"
            />
          </UTooltip>
        </div>
      </div>
    </div>
  </div>

  <UModal v-model="deleteIsOpen">
    <div class="flex flex-col gap-4 p-4">
      <label class="text-lg">Supprimer le deck</label>
      <span class="text-sm">Êtes-vous sûr de vouloir supprimer ce deck ?</span>
      <div class="flex justify-end gap-2">
        <UButton
          color="gray"
          variant="ghost"
          size="sm"
          class="h-fit"
          @click="deleteIsOpen = false"
        >
          Annuler
        </UButton>
        <UButton color="red" size="sm" class="h-fit" @click="deleteDeck()">
          Supprimer
        </UButton>
      </div>
    </div>
  </UModal>
</template>

<style scoped></style>
