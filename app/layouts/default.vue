<script setup lang="ts">
import LocaleCreate from '~/components/LocaleCreate.vue'

const searchValue = useSearchValue()
</script>

<template>
  <div>
    <v-app-bar>
      <div class="pl-3" style="filter: contrast(0)">
        <v-img src="/logo.png" alt="Logo" height="40" width="40" />
      </div>
      <v-app-bar-title>i18n Manager</v-app-bar-title>
      <v-spacer />
      <v-menu min-width="80">
        <template #activator="{ props }">
          <v-btn icon="mdi-plus" v-bind="props" />
        </template>
        <v-list>
          <v-dialog width="400" persistent>
            <template #activator="{ props }">
              <v-list-item v-bind="props">
                add Translation Key
              </v-list-item>
            </template>
            <template #default="{ isActive }">
              <I18nEntryCreate @cancel="isActive.value = false" @created="isActive.value = false" />
            </template>
          </v-dialog>

          <v-dialog width="400" persistent>
            <template #activator="{ props }">
              <v-list-item v-bind="props">
                add Locale
              </v-list-item>
            </template>
            <template #default="{ isActive }">
              <LocaleCreate @cancel="isActive.value = false" @created="isActive.value = false" />
            </template>
          </v-dialog>
        </v-list>
      </v-menu>
      <div class="px-3">
        <v-text-field v-model="searchValue" label="Search Translation" hide-details density="compact" width="300px" append-inner-icon="mdi-magnify" />
      </div>
      <theme-switch />
    </v-app-bar>
    <v-main>
      <slot />
    </v-main>
  </div>
</template>
