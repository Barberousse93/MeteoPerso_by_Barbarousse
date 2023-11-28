export default function useCardHour(props) {
  const dateISO = new Date(props.data.datetime)
  const dateLocale = dateISO.toLocaleDateString('fr-FR', { day: 'numeric', month: 'numeric' })
  const timeLocale = dateISO.toLocaleTimeString('fr-FR', { hour: 'numeric', minute: 'numeric' })
  return {
    dateLocale,
    timeLocale,
  }
}
