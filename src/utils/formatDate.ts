export const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric' }
  return new Date(dateString).toLocaleDateString(undefined, options)
}
