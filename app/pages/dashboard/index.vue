<script setup lang="ts">
import { useAuth } from '~/features/auth'

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})

useHead({
  title: 'Dashboard — AdminLTE Enterprise',
})

const { user } = useAuth()

const userEmail = computed(() => {
  return (user.value as any)?.email || 'user@enterprise.io'
})
</script>

<template>
  <div class="space-y-space-lg">
    <!-- Welcome hero card -->
    <div class="relative bg-surface-container rounded-xl p-space-xl shadow-xl overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-tertiary/5 pointer-events-none" />

      <div class="relative z-10 flex flex-col items-center text-center">
        <div class="w-16 h-16 rounded-xl bg-surface-container-high flex items-center justify-center text-primary mb-space-lg shadow-md">
          <Icon name="material-symbols:shield-person" class="text-[36px]" />
        </div>

        <div class="flex items-center gap-2 mb-space-xs">
          <span class="font-label-sm text-label-sm uppercase tracking-widest text-primary font-semibold">AdminLTE Technical Operations</span>
          <span class="text-outline-variant">•</span>
          <span class="font-code text-code text-on-surface-variant">Auth Profile Tier 1</span>
        </div>

        <h1 class="font-display text-display text-on-surface mb-space-sm">Welcome Back</h1>
        <p class="font-body-md text-body-md text-on-surface-variant max-w-lg mb-space-xl">
          Identity verified through secure federation. You have full supervisory privileges across the central control cluster.
        </p>

        <!-- User email badge -->
        <div class="w-full max-w-xl bg-surface-container-lowest p-space-md rounded-xl shadow-lg flex flex-col sm:flex-row items-center justify-between gap-space-md">
          <div class="flex items-center gap-space-md min-w-0">
            <div class="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary shrink-0">
              <Icon name="material-symbols:alternate-email" class="text-[20px]" />
            </div>
            <div class="flex flex-col text-left min-w-0">
              <div class="flex items-center gap-space-xs">
                <span class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Logged Identity</span>
                <span class="inline-flex items-center px-2 py-0.5 rounded-full text-code font-code bg-tertiary/10 text-tertiary">
                  <span class="w-1.5 h-1.5 rounded-full bg-tertiary mr-1.5" />
                  Verified
                </span>
              </div>
              <span class="font-headline-sm text-headline-sm text-primary tracking-tight truncate select-all">
                {{ userEmail }}
              </span>
            </div>
          </div>
        </div>

        <!-- Session pill -->
        <div class="mt-space-md inline-flex items-center gap-2 px-space-md py-space-xs rounded-full bg-surface-container-high text-on-surface-variant font-code text-code">
          <span class="w-2 h-2 rounded-full bg-secondary" />
          <span>Authenticated via Enterprise SSO</span>
          <span class="text-outline-variant">•</span>
          <span class="text-on-surface font-semibold">Active Session</span>
        </div>
      </div>
    </div>

    <!-- Quick info cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-space-md">
      <div class="bg-surface-container rounded-xl p-space-lg flex items-center gap-space-md shadow-md">
        <div class="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary shrink-0">
          <Icon name="material-symbols:history" class="text-[22px]" />
        </div>
        <div class="flex flex-col min-w-0">
          <span class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Last Sign-In</span>
          <span class="font-label-lg text-label-lg text-on-surface truncate">Just now</span>
          <span class="font-code text-code text-on-surface-variant">Via SAML Federated Gateway</span>
        </div>
      </div>

      <div class="bg-surface-container rounded-xl p-space-lg flex items-center gap-space-md shadow-md">
        <div class="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-secondary shrink-0">
          <Icon name="material-symbols:hub" class="text-[22px]" />
        </div>
        <div class="flex flex-col min-w-0">
          <span class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">System Status</span>
          <span class="font-label-lg text-label-lg text-on-surface truncate">All Systems Operational</span>
          <span class="font-code text-code text-tertiary">99.99% Uptime</span>
        </div>
      </div>

      <div class="bg-surface-container rounded-xl p-space-lg flex items-center gap-space-md shadow-md">
        <div class="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-tertiary shrink-0">
          <Icon name="material-symbols:security" class="text-[22px]" />
        </div>
        <div class="flex flex-col min-w-0">
          <span class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Security Level</span>
          <span class="font-label-lg text-label-lg text-on-surface truncate">Enterprise Tier 1</span>
          <span class="font-code text-code text-tertiary">Full Access Granted</span>
        </div>
      </div>
    </div>
  </div>
</template>
