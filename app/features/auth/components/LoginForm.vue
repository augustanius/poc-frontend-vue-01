<script setup lang="ts">
import { useAuth } from '../composables/useAuth'

const { login, loading, error } = useAuth()
</script>

<template>
  <div class="space-y-space-md">
    <!-- Error alert -->
    <UAlert v-if="error" :title="error" color="error" variant="soft" />

    <!-- Sign in with Keycloak button -->
    <button
      type="button"
      :disabled="loading"
      class="w-full h-11 bg-primary hover:bg-primary-fixed-dim active:bg-primary-container text-on-primary font-label-lg text-label-lg rounded-lg shadow-xl shadow-primary-container/20 flex items-center justify-center gap-space-xs transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      @click="login()"
    >
      <Icon
        v-if="loading"
        name="material-symbols:progress-activity"
        class="animate-spin text-body-lg"
      />
      <Icon
        v-else
        name="material-symbols:login"
        class="text-body-lg"
      />
      <span>{{ loading ? 'Redirecting to Keycloak...' : 'Sign In with Keycloak' }}</span>
    </button>

    <!-- Register link -->
    <p class="text-center text-body-sm text-on-surface-variant mt-space-md">
      Don't have an account?
      <NuxtLink to="/auth/register" class="text-primary hover:underline font-label-md text-label-md">Create one</NuxtLink>
    </p>
  </div>
</template>
