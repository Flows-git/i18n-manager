<template>
  <div>
    <v-app-bar>
      <div class="pl-3" style="filter: contrast(0)">
        <v-img src="/logo.png" alt="Logo" height="40" width="40" />
      </div>
      <v-app-bar-title>i18n Manager</v-app-bar-title>
      <v-spacer />
      <!-- create translation dialog -->
      <v-dialog width="400" persistent>
        <template #activator="{ props }">
          <v-btn icon="mdi-plus" v-bind="props" />
        </template>
        <template #default="{ isActive }">
          <I18nEntryCreate @cancel="isActive.value = false" @created="isActive.value = false" />
        </template>
      </v-dialog>
      <!-- search input -->
      <div class="px-3">
        <SearchInput />
      </div>

      <!-- more menu -->
      <v-menu min-width="80">
        <template #activator="{ props }">
          <v-btn icon="mdi-dots-vertical" v-bind="props" />
        </template>
        <v-list>
          <v-list-item class="py-0">
            <ThemeSwitch />
          </v-list-item>
          <v-divider />
          <v-dialog width="400" persistent>
            <template #activator="{ props }">
              <v-list-item v-bind="props">
                Manage Languages
              </v-list-item>
            </template>
            <template #default="{ isActive }">
              <LocaleManage @cancel="isActive.value = false" @updated="isActive.value = false" />
            </template>
          </v-dialog>
          <v-divider />
          <v-list-item class="pb-0 text-center opacity-50 text-caption">
            Made with <v-icon icon="mdi-heart" color="error" /> by <br><NuxtLink class="pl-1" href="https://flowa.me" target="_blank">
              Florian Wagner
            </NuxtLink>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-main>
      <slot />
    </v-main>
  </div>
</template>
