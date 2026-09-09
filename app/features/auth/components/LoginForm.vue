<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { loginSchema, type LoginInput } from '../schemas/auth.schema'
import { useAuth } from '../composables/useAuth'

const { login, loading, error } = useAuth()

const { handleSubmit, errors, defineField } = useForm<LoginInput>({
  validationSchema: toTypedSchema(loginSchema),
})

const [email, emailProps] = defineField('email')
const [password, passwordProps] = defineField('password')

const showPassword = ref(false)

const onSubmit = handleSubmit(async (values) => {
  await login(values)
})
</script>

<template>
  <form @submit.prevent="onSubmit" class="space-y-space-md">
    <!-- Email field -->
    <div>
      <label class="block font-label-md text-label-md text-on-surface mb-space-2xs" for="workEmail">Work Identity Email</label>
      <div class="relative flex items-center">
        <Icon
          name="material-symbols:badge"
          class="absolute left-space-md text-outline pointer-events-none text-body-lg"
        />
        <input
          id="workEmail"
          :value="email"
          type="email"
          placeholder="user@enterprise.io"
          required
          class="w-full h-10 pl-11 pr-space-md bg-surface-container-lowest text-on-surface font-body-md text-body-md rounded-lg placeholder-outline focus:outline-none focus:bg-surface-container-high transition-colors"
          :class="{ 'ring-1 ring-error': errors.email }"
          @input="emailProps.onInput($event)"
          @blur="emailProps.onBlur($event)"
        >
      </div>
      <p v-if="errors.email" class="mt-1 text-body-sm text-error">{{ errors.email }}</p>
    </div>

    <!-- Password field -->
    <div>
      <div class="flex items-center justify-between mb-space-2xs">
        <label class="block font-label-md text-label-md text-on-surface" for="masterPassword">Console Password</label>
        <a href="#" class="font-label-sm text-label-sm text-primary hover:underline">Forgot password?</a>
      </div>
      <div class="relative flex items-center">
        <Icon
          name="material-symbols:lock"
          class="absolute left-space-md text-outline pointer-events-none text-body-lg"
        />
        <input
          id="masterPassword"
          :value="password"
          :type="showPassword ? 'text' : 'password'"
          placeholder="••••••••••••"
          required
          class="w-full h-10 pl-11 pr-11 bg-surface-container-lowest text-on-surface font-body-md text-body-md rounded-lg placeholder-outline focus:outline-none focus:bg-surface-container-high transition-colors"
          :class="{ 'ring-1 ring-error': errors.password }"
          @input="passwordProps.onInput($event)"
          @blur="passwordProps.onBlur($event)"
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

    <!-- Remember device checkbox -->
    <div class="flex items-center justify-between pt-space-2xs">
      <label class="flex items-center gap-space-xs cursor-pointer select-none">
        <input
          id="rememberDevice"
          type="checkbox"
          checked
          class="w-4 h-4 rounded bg-surface-container-lowest accent-primary cursor-pointer"
        >
        <span class="font-body-sm text-body-sm text-on-surface-variant">Remember this hardware device for 30 days</span>
      </label>
    </div>

    <!-- Error alert -->
    <UAlert v-if="error" :title="error" color="red" variant="soft" />

    <!-- Sign in button -->
    <button
      type="submit"
      :disabled="loading"
      class="w-full h-11 mt-space-md bg-primary hover:bg-primary-fixed-dim active:bg-primary-container text-on-primary font-label-lg text-label-lg rounded-lg shadow-xl shadow-primary-container/20 flex items-center justify-center gap-space-xs transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
      <span>{{ loading ? 'Authenticating Token...' : 'Sign In to Console' }}</span>
    </button>

    <!-- Register link -->
    <p class="text-center text-body-sm text-on-surface-variant mt-space-md">
      Don't have an account?
      <NuxtLink to="/auth/register" class="text-primary hover:underline font-label-md text-label-md">Create one</NuxtLink>
    </p>
  </form>
</template>
