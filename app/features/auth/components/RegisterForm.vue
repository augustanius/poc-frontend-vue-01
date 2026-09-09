<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { registerSchema, type RegisterInput } from '../schemas/auth.schema'
import { AuthService } from '../services/auth.service'

const loading = ref(false)
const error = ref<string | null>(null)
const success = ref(false)

const { handleSubmit, errors, defineField } = useForm<RegisterInput>({
  validationSchema: toTypedSchema(registerSchema),
})

const [username, usernameProps] = defineField('username')
const [email, emailProps] = defineField('email')
const [password, passwordProps] = defineField('password')
const [confirmPassword, confirmPasswordProps] = defineField('confirmPassword')

const showPassword = ref(false)

const onSubmit = handleSubmit(async (values) => {
  loading.value = true
  error.value = null
  try {
    await AuthService.register(values)
    success.value = true
  }
  catch (err: any) {
    error.value = err?.data?.message || err?.message || 'Registration failed'
  }
  finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="space-y-space-md">
    <!-- Success message -->
    <div v-if="success" class="space-y-space-md">
      <UAlert title="Account created successfully" color="success" variant="soft">
        <template #description>
          <p>You can now sign in with your credentials.</p>
        </template>
      </UAlert>
      <NuxtLink
        to="/auth/login"
        class="w-full h-11 bg-primary hover:bg-primary-fixed-dim active:bg-primary-container text-on-primary font-label-lg text-label-lg rounded-lg shadow-xl shadow-primary-container/20 flex items-center justify-center gap-space-xs transition-all"
      >
        <Icon name="material-symbols:login" class="text-body-lg" />
        <span>Go to Sign In</span>
      </NuxtLink>
    </div>

    <!-- Registration form -->
    <form v-else class="space-y-space-md" @submit.prevent="onSubmit">
      <!-- Username field -->
      <div>
        <label class="block font-label-md text-label-md text-on-surface mb-space-2xs" for="regUsername">Username</label>
        <div class="relative flex items-center">
          <Icon
            name="material-symbols:person"
            class="absolute left-space-md text-outline pointer-events-none text-body-lg"
          />
          <input
            id="regUsername"
            v-model="username"
            v-bind="usernameProps"
            type="text"
            placeholder="johndoe"
            required
            class="w-full h-10 pl-11 pr-space-md bg-surface-container-lowest text-on-surface font-body-md text-body-md rounded-lg placeholder-outline focus:outline-none focus:bg-surface-container-high transition-colors"
            :class="{ 'ring-1 ring-error': errors.username }"
          >
        </div>
        <p v-if="errors.username" class="mt-1 text-body-sm text-error">{{ errors.username }}</p>
      </div>

      <!-- Email field -->
      <div>
        <label class="block font-label-md text-label-md text-on-surface mb-space-2xs" for="regEmail">Email</label>
        <div class="relative flex items-center">
          <Icon
            name="material-symbols:badge"
            class="absolute left-space-md text-outline pointer-events-none text-body-lg"
          />
          <input
            id="regEmail"
            v-model="email"
            v-bind="emailProps"
            type="email"
            placeholder="user@enterprise.io"
            required
            class="w-full h-10 pl-11 pr-space-md bg-surface-container-lowest text-on-surface font-body-md text-body-md rounded-lg placeholder-outline focus:outline-none focus:bg-surface-container-high transition-colors"
            :class="{ 'ring-1 ring-error': errors.email }"
          >
        </div>
        <p v-if="errors.email" class="mt-1 text-body-sm text-error">{{ errors.email }}</p>
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
            v-model="password"
            v-bind="passwordProps"
            :type="showPassword ? 'text' : 'password'"
            placeholder="••••••••••••"
            required
            class="w-full h-10 pl-11 pr-11 bg-surface-container-lowest text-on-surface font-body-md text-body-md rounded-lg placeholder-outline focus:outline-none focus:bg-surface-container-high transition-colors"
            :class="{ 'ring-1 ring-error': errors.password }"
          >
          <button
            type="button"
            class="absolute right-space-md text-outline hover:text-on-surface focus:outline-none flex items-center justify-center"
            @click="showPassword = !showPassword"
          >
            <Icon
              :name="showPassword ? 'material-symbols:visibility-off' : 'material-symbols:visibility'"
              class="text-body-lg"
            />
          </button>
        </div>
        <p v-if="errors.password" class="mt-1 text-body-sm text-error">{{ errors.password }}</p>
      </div>

      <!-- Confirm Password field -->
      <div>
        <label class="block font-label-md text-label-md text-on-surface mb-space-2xs" for="regConfirmPassword">Confirm Password</label>
        <div class="relative flex items-center">
          <Icon
            name="material-symbols:lock"
            class="absolute left-space-md text-outline pointer-events-none text-body-lg"
          />
          <input
            id="regConfirmPassword"
            v-model="confirmPassword"
            v-bind="confirmPasswordProps"
            :type="showPassword ? 'text' : 'password'"
            placeholder="••••••••••••"
            required
            class="w-full h-10 pl-11 pr-space-md bg-surface-container-lowest text-on-surface font-body-md text-body-md rounded-lg placeholder-outline focus:outline-none focus:bg-surface-container-high transition-colors"
            :class="{ 'ring-1 ring-error': errors.confirmPassword }"
          >
        </div>
        <p v-if="errors.confirmPassword" class="mt-1 text-body-sm text-error">{{ errors.confirmPassword }}</p>
      </div>

      <!-- Error alert -->
      <UAlert v-if="error" :title="error" color="error" variant="soft" />

      <!-- Register button -->
      <button
        type="submit"
        :disabled="loading"
        class="w-full h-11 bg-primary hover:bg-primary-fixed-dim active:bg-primary-container text-on-primary font-label-lg text-label-lg rounded-lg shadow-xl shadow-primary-container/20 flex items-center justify-center gap-space-xs transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Icon
          v-if="loading"
          name="material-symbols:progress-activity"
          class="animate-spin text-body-lg"
        />
        <Icon
          v-else
          name="material-symbols:person-add"
          class="text-body-lg"
        />
        <span>{{ loading ? 'Creating Account...' : 'Create Account' }}</span>
      </button>

      <!-- Login link -->
      <p class="text-center text-body-sm text-on-surface-variant mt-space-md">
        Already have an account?
        <NuxtLink to="/auth/login" class="text-primary hover:underline font-label-md text-label-md">Sign in</NuxtLink>
      </p>
    </form>
  </div>
</template>
