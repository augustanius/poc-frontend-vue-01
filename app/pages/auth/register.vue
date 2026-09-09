<script setup lang="ts">
import RegisterForm from '~/features/auth/components/RegisterForm.vue'

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

        <RegisterForm />
      </div>
    </div>
  </div>
</template>
