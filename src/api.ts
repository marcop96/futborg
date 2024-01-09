import type { Match } from '@/types'

export const api = {
  list: async (): Promise<Match[]> => {
    return fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vQTFGE2BT2Zrb0ukSxC4S_uvDWA0y7LOz81GdNgDdGSY_2O5rpFCfY5pnPXm41InTYZ-oRSIslkgAlY/pub?output=tsv')
      .then(res => res.text())
      .then((text) => {
        return text.split('\n').slice(1).map((row) => {
          const [date, team1, team2, goals1, goals2] = row.split('\t')

          return {
            date,
            team1,
            team2,
            goals1: Number.parseInt(goals1),
            goals2: Number.parseInt(goals2),
          }
        })
      })
  },
}
