<script setup lang="ts">
definePageMeta({
  layout: 'auth',
  middleware: 'guest',
})

useHead({
  title: 'Register — Admin Dashboard',
})
</script>

<template>
  <div class="flex flex-col w-full items-center justify-center py-space-xl relative overflow-hidden">
    <!-- Background decorative glows -->
    <div class="absolute -top-40 left-1/2 -translate-x-1/2 w-[42rem] h-[42rem] bg-gradient-to-b from-primary/10 via-secondary-container/5 to-transparent rounded-full blur-3xl pointer-events-none" />
    <div class="absolute bottom-0 right-10 w-96 h-96 bg-primary-container/5 rounded-full blur-3xl pointer-events-none" />

    <div class="w-full max-w-md relative z-10">
      <!-- Register card -->
      <div class="bg-surface-container-low rounded-xl p-space-xl md:p-space-2xl shadow-xl relative backdrop-blur-sm">
        <div class="flex flex-col items-center text-center mb-space-xl">
          <div class="relative mb-space-md p-1.5 rounded-lg bg-surface-container-highest shadow-md">
            <img
              alt="AdminLTE Pro Enterprise Logo"
              class="w-12 h-12 rounded object-contain"
              src="https://lh3.googleusercontent.com/aida/AEtjO1VxoR-F0U9zR9sFEZopXkcZORthn0e5KPaFthldo6iDOjMN793dcTwfVhvS8jD47IT0B0BVgcRmXpwBHKjyO2qZJg6VhKu6tgPRM76em-xOzoAtu0qPglKtb5ENmLaqe8ZulKudndsYjf8G-XVTWFtVBkGh2yeYF7oGWxxdzaBUl3pEIc5zl0KOuit4CMeehZN3L-Cc9bBN_Gh_64MJye6JxOJaYmTJUbAVJlG0x-98QsYyr71MSIicFuI"
            >
          </div>
          <h1 class="font-headline-md text-headline-md text-on-surface tracking-tight">Create Account</h1>
          <p class="font-body-md text-body-md text-on-surface-variant mt-space-2xs">Register for your secure back-office console</p>
        </div>

        <form class="space-y-space-md" @submit.prevent>
          <!-- Full name field -->
          <div>
            <label class="block font-label-md text-label-md text-on-surface mb-space-2xs" for="fullName">Full Name</label>
            <div class="relative flex items-center">
              <Icon
                name="material-symbols:person"
                class="absolute left-space-md text-outline pointer-events-none text-body-lg"
              />
              <input
                id="fullName"
                type="text"
                placeholder="John Doe"
                required
                class="w-full h-10 pl-11 pr-space-md bg-surface-container-lowest text-on-surface font-body-md text-body-md rounded-lg placeholder-outline focus:outline-none focus:bg-surface-container-high transition-colors"
              >
            </div>
          </div>

          <!-- Email field -->
          <div>
            <label class="block font-label-md text-label-md text-on-surface mb-space-2xs" for="regEmail">Work Identity Email</label>
            <div class="relative flex items-center">
              <Icon
                name="material-symbols:badge"
                class="absolute left-space-md text-outline pointer-events-none text-body-lg"
              />
              <input
                id="regEmail"
                type="email"
                placeholder="user@enterprise.io"
                required
                class="w-full h-10 pl-11 pr-space-md bg-surface-container-lowest text-on-surface font-body-md text-body-md rounded-lg placeholder-outline focus:outline-none focus:bg-surface-container-high transition-colors"
              >
            </div>
          </div>

          <!-- Password field -->
          <div>
            <label class="block font-label-md text-label-md text-on-surface mb-space-2xs" for="regPassword">Password</label>
            <div class="relative flex items-center">
              <Icon
                name="material-symbols:lock"
                class="absolute left-space-md text-outline pointer-events-none text-body-lg"
              />
              <input
                id="regPassword"
                type="password"
                placeholder="••••••••••••"
                required
                class="w-full h-10 pl-11 pr-space-md bg-surface-container-lowest text-on-surface font-body-md text-body-md rounded-lg placeholder-outline focus:outline-none focus:bg-surface-container-high transition-colors"
              >
            </div>
          </div>

          <!-- Register button -->
          <button
            type="submit"
            class="w-full h-11 mt-space-md bg-primary hover:bg-primary-fixed-dim active:bg-primary-container text-on-primary font-label-lg text-label-lg rounded-lg shadow-xl shadow-primary-container/20 flex items-center justify-center gap-space-xs transition-all"
          >
            <Icon name="material-symbols:person-add" class="text-body-lg" />
            <span>Create Account</span>
          </button>
        </form>

        <!-- Login link -->
        <p class="text-center text-body-sm text-on-surface-variant mt-space-md">
          Already have an account?
          <NuxtLink to="/auth/login" class="text-primary hover:underline font-label-md text-label-md">Sign in</NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>
