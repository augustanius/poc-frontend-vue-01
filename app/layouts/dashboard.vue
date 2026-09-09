<template>
  <div class="min-h-screen bg-surface flex">
    <aside class="w-sidebar-width bg-surface-container-low border-r border-surface-variant flex flex-col">
      <div class="h-header-height flex items-center px-space-lg border-b border-surface-variant">
        <span class="font-headline-sm text-headline-sm text-on-surface">AdminLTE Pro</span>
      </div>
      <nav class="flex-1 p-space-md">
        <ul class="space-y-space-xs">
          <li>
            <NuxtLink
              to="/dashboard"
              class="flex items-center gap-space-sm px-space-md py-space-xs rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors"
            >
              <Icon name="material-symbols:dashboard" class="text-[20px]" />
              <span class="font-label-lg text-label-lg">Dashboard</span>
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </aside>

    <div class="flex-1 flex flex-col">
      <header class="h-header-height bg-surface-container-lowest border-b border-surface-variant flex items-center justify-between px-space-lg">
        <div class="flex items-center gap-space-sm">
          <span class="font-body-md text-body-md text-on-surface-variant">Welcome back</span>
        </div>
        <button
          class="flex items-center gap-space-sm text-on-surface-variant hover:text-on-surface transition-colors"
          @click="handleLogout"
        >
          <Icon name="material-symbols:logout" class="text-[20px]" />
          <span class="font-label-md text-label-md">Sign Out</span>
        </button>
      </header>

      <main class="flex-1 p-space-lg">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from '~/features/auth'

const { logout } = useAuth()

const handleLogout = async () => {
  await logout()
}
</script>
