export const useApi = () => {
  const { $apiFetch } = useNuxtApp()
  return $apiFetch
}
