# Nuxt 4 Production PoC Architecture & Guidelines

This document outlines the architecture, directory layout, code standards, and patterns for building a production-grade Nuxt 4 application using a feature-oriented architecture.

---

## 1. Stack Overview

| Concern                    | Recommended Technology                                              |
| :------------------------- | :------------------------------------------------------------------ |
| **Framework**              | Nuxt 4 + Vue 3 (Composition API) + TypeScript                       |
| **Package Manager**        | `npm`                                                               |
| **State Management**       | Pinia (Client/App State) + TanStack Query (Server State, as needed) |
| **API Communication**      | Native `$fetch` / `useFetch` with an abstract Service Layer         |
| **Authentication**         | `nuxt-auth-utils` (or Backend-driven HttpOnly Cookie Session)       |
| **Forms & Validation**     | `vee-validate` + `Zod`                                              |
| **UI & Styling**           | Nuxt UI + Tailwind CSS + Nuxt Icon / Iconify                        |
| **Code Quality & Testing** | ESLint, `vue-tsc`, Vitest (Unit/Component), Playwright (E2E)        |

---

## 2. Architectural Principles

1. **Feature-Oriented over Layer-Oriented**: Organize business logic by feature domain (`auth`, `users`, `products`), not strictly by technical file type. Avoid dumping all components into a single root `components/` folder.
2. **Thin Presentation Components**: Components should focus purely on UI and user interactions. Business logic, API calls, state transforms, and authorization checks belong in feature composables or service layers.
3. **Nuxt 4 Alignment**: Keep all core application code inside the `app/` directory as required by Nuxt 4, placing feature modules under `app/features/`.
4. **Separation of State**:
   - **Pinia**: Client/UI state (e.g., active drawer, theme settings, temporary wizard state).
   - **TanStack Query / `useFetch`**: Server state (e.g., entity caches, paginated lists, mutations).

---

## 3. Directory Layout (Nuxt 4 Native)

```text
.
├── app/
│   ├── app.vue
│   │
│   ├── layouts/
│   │   ├── default.vue
│   │   ├── auth.vue
│   │   └── dashboard.vue
│   │
│   ├── pages/
│   │   ├── index.vue
│   │   ├── auth/
│   │   │   ├── login.vue
│   │   │   └── register.vue
│   │   └── dashboard/
│   │       ├── index.vue
│   │       └── users/
│   │           └── index.vue
│   │
│   ├── middleware/
│   │   ├── auth.ts
│   │   └── guest.ts
│   │
│   ├── plugins/
│   │   └── api-client.ts
│   │
│   ├── features/
│   │   ├── auth/
│   │   │   ├── components/
│   │   │   │   ├── LoginForm.vue
│   │   │   │   └── RegisterForm.vue
│   │   │   ├── composables/
│   │   │   │   └── useAuth.ts
│   │   │   ├── schemas/
│   │   │   │   └── auth.schema.ts
│   │   │   ├── services/
│   │   │   │   └── auth.service.ts
│   │   │   ├── types/
│   │   │   │   └── auth.types.ts
│   │   │   └── index.ts
│   │   │
│   │   └── users/
│   │       ├── components/
│   │       ├── composables/
│   │       ├── services/
│   │       ├── schemas/
│   │       ├── types/
│   │       └── index.ts
│   │
│   └── shared/
│       ├── components/
│       │   └── ui/
│       ├── composables/
│       ├── utils/
│       └── types/
│
├── server/
│   ├── api/
│   ├── middleware/
│   └── utils/
│
├── shared/
│   └── types/           # Code shared across server/ & app/
│
├── public/
├── nuxt.config.ts
├── package.json
├── tsconfig.json
└── eslint.config.mjs
```

---

## 4. Feature Module Pattern

Each feature directory (`app/features/<feature-name>`) encapsulates its own domain assets:

```text
app/features/products/
├── components/
│   ├── ProductCard.vue
│   ├── ProductFilters.vue
│   └── ProductForm.vue
├── composables/
│   ├── useProducts.ts
│   └── useProductMutation.ts
├── services/
│   └── product.service.ts
├── schemas/
│   └── product.schema.ts
├── types/
│   └── product.types.ts
└── index.ts               # Public barrel file for exporting feature APIs
```

---

## 5. Core Implementation Templates

### A. Zod Schema Definition (`app/features/auth/schemas/auth.schema.ts`)

```typescript
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type LoginInput = z.infer<typeof loginSchema>;
```

### B. Feature Service (`app/features/auth/services/auth.service.ts`)

```typescript
import type { LoginInput } from "../schemas/auth.schema";
import type { UserResponse } from "../types/auth.types";

export class AuthService {
  static async login(credentials: LoginInput): Promise<UserResponse> {
    return await $fetch<UserResponse>("/api/auth/login", {
      method: "POST",
      body: credentials,
    });
  }

  static async me(): Promise<UserResponse> {
    return await $fetch<UserResponse>("/api/auth/me");
  }

  static async logout(): Promise<void> {
    await $fetch("/api/auth/logout", { method: "POST" });
  }
}
```

### C. Feature Composable (`app/features/auth/composables/useAuth.ts`)

```typescript
import { AuthService } from "../services/auth.service";
import type { LoginInput } from "../schemas/auth.schema";

export function useAuth() {
  const { user, clear: clearSession, fetch: fetchSession } = useUserSession();
  const loading = ref(false);
  const error = ref<string | null>(null);

  const login = async (credentials: LoginInput) => {
    loading.value = true;
    error.value = null;
    try {
      await AuthService.login(credentials);
      await fetchSession();
      await navigateTo("/dashboard");
    } catch (err: any) {
      error.value = err?.data?.message || "Authentication failed";
    } finally {
      loading.value = false;
    }
  };

  const logout = async () => {
    await AuthService.logout();
    await clearSession();
    await navigateTo("/auth/login");
  };

  return {
    user,
    loading,
    error,
    login,
    logout,
  };
}
```

### D. Presentation Component (`app/features/auth/components/LoginForm.vue`)

```vue
<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { loginSchema, type LoginInput } from "../schemas/auth.schema";
import { useAuth } from "../composables/useAuth";

const { login, loading, error } = useAuth();

const { handleSubmit, errors, defineField } = useForm<LoginInput>({
  validationSchema: toTypedSchema(loginSchema),
});

const [email, emailProps] = defineField("email");
const [password, passwordProps] = defineField("password");

const onSubmit = handleSubmit(async (values) => {
  await login(values);
});
</script>

<template>
  <form @submit.prevent="onSubmit" class="space-y-4">
    <UAlert v-if="error" :title="error" color="red" variant="soft" />

    <div>
      <UFormGroup label="Email" :error="errors.email">
        <UInput v-model="email" v-bind="emailProps" type="email" placeholder="you@example.com" />
      </UFormGroup>
    </div>

    <div>
      <UFormGroup label="Password" :error="errors.password">
        <UInput v-model="password" v-bind="passwordProps" type="password" />
      </UFormGroup>
    </div>

    <UButton type="submit" :loading="loading" block> Sign In </UButton>
  </form>
</template>
```

### E. Auth Route Middleware (`app/middleware/auth.ts`)

```typescript
export default defineNuxtRouteMiddleware((to) => {
  const { loggedIn } = useUserSession();

  if (!loggedIn.value) {
    return navigateTo({
      path: "/auth/login",
      query: { redirect: to.fullPath },
    });
  }
});
```

---

## 6. Recommended Package Initializer

To set up the dependencies outlined for this architecture, run:

```bash
# Core Dependencies
npm install pinia @pinia/nuxt zod vee-validate @vee-validate/zod nuxt-auth-utils

# Optional Server State Management (for complex caching/stale-while-revalidate requirements)
npm install @tanstack/vue-query

# Dev & Quality Dependencies
npm install -D vitest @nuxt/test-utils playwright eslint vue-tsc
```
