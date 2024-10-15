<script setup lang="ts">
import { ref, computed } from "vue";
import type { PropType } from "vue";
import type { DeckAPI } from "~/models";
import { copyCode } from "../../utils";

const { t } = useI18n();
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

const deckIsPublic = computed(() => props.deck.isPublic);

const copy = () => {
  copyCode(props.deck.code);
  toast.add({
    title: t("notifications.misc.copyCode") + props.deck.code,
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

  toast.add({ title: t("notifications.decks.deletedSuccess") });
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

  toast.add({
    title: t("notifications.decks.privatizedSuccess"),
    icon: "i-lucide-lock-keyhole",
  });
  emit("refresh");
};

const publicizeDeck = async () => {
  await $fetch(`/decks/${props.deck.code}/publicize`, {
    baseURL: runtimeConfig.public.BACK_URL as string,
    headers,
    credentials: "include",
    method: "PATCH",
  });

  toast.add({
    title: t("notifications.decks.publicizedSuccess"),
    icon: "i-lucide-lock-keyhole-open",
  });
  emit("refresh");
};

const duplicateDeck = async () => {
  await $fetch(`/decks/${props.deck.code}/duplicate`, {
    baseURL: runtimeConfig.public.BACK_URL as string,
    headers,
    credentials: "include",
    method: "POST",
  });

  toast.add({
    title: t("notifications.decks.duplicatedSuccess"),
    icon: "i-lucide-copy-plus",
  });
  emit("refresh");
};

// Define the dropdown items with proper click handlers
const items = computed(() => [
  [
    {
      label: deckIsPublic.value ? t("decks.privatize") : t("decks.publicize"),
      icon: deckIsPublic.value
        ? "i-lucide-lock-keyhole"
        : "i-lucide-lock-keyhole-open",
      click: () => (deckIsPublic.value ? privatizeDeck() : publicizeDeck()),
    },
    {
      label: t("decks.duplicate"),
      icon: "i-lucide-copy-plus",
      click: duplicateDeck,
    },
    {
      label: t("decks.share"),
      icon: "i-lucide-share-2",
      click: copy,
    },
    {
      label: t("decks.delete"),
      icon: "i-lucide-trash",
      click: () => (deleteIsOpen.value = true),
    },
  ],
]);
</script>

<template>
  <div
    class="flex justify-between rounded border border-neutral-100 px-4 py-4 shadow transition-all hover:cursor-pointer hover:border-neutral-200 dark:border-neutral-600 dark:bg-neutral-700 dark:hover:border-neutral-500"
    @click="router.push('/flashcards/' + deck.code)"
  >
    <div class="flex h-full w-4/5 flex-col gap-1 pr-2">
      <div class="flex gap-4 text-sm text-neutral-400">
        <UTooltip :text="t('decks.nbCards')" class="flex items-center gap-1">
          <UIcon name="i-lucide-rectangle-vertical" />
          <span>{{ deck.nbFlashcards }}</span>
        </UTooltip>
        <UTooltip
          :text="t('decks.nbRevisions')"
          class="flex items-center gap-1"
        >
          <UIcon name="i-lucide-brain" />
          <span>{{ deck.nbRevisions }}</span>
        </UTooltip>
      </div>
      <DeckInfo :deck="deck" />
    </div>
    <div class="flex items-start gap-2">
      <div class="flex items-center gap-2">
        <UTooltip v-if="deck.isPublic" :text="t('decks.isPublic')">
          <UIcon name="i-lucide-lock-keyhole-open" class="opacity-50" />
        </UTooltip>
        <UTooltip v-else :text="t('decks.isPrivate')">
          <UIcon name="i-lucide-lock-keyhole" class="opacity-50" />
        </UTooltip>
        <UDropdown :items="items" @click.stop>
          <UButton icon="i-lucide-more-vertical" size="xs" variant="soft" />
        </UDropdown>
      </div>
    </div>
  </div>

  <UModal v-model="deleteIsOpen">
    <div class="flex flex-col gap-4 p-4">
      <label class="text-lg">
        {{ t("decks.delete") }}
      </label>
      <span class="text-sm">
        {{ t("decks.delete_confirm") }}
      </span>
      <div class="flex justify-end gap-2">
        <UButton
          color="gray"
          variant="ghost"
          size="sm"
          class="h-fit"
          @click="deleteIsOpen = false"
        >
          {{ t("utils.cancel") }}
        </UButton>
        <UButton color="red" size="sm" class="h-fit" @click="deleteDeck()">
          {{ t("utils.delete") }}
        </UButton>
      </div>
    </div>
  </UModal>
</template>
