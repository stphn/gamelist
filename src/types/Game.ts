export type Game = {
  id: string
  label: string
  core_path: string
  core_name: string
  thumb_url: string
  released: string
  desc: string
  developed_by: string
  genre: string
  publisher: string
  retroachievements_id: number | null // integer 4 bytes or null
  systems: {
    name: string
    iconURL: string
  }
}
