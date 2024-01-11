import { e } from 'vitest/dist/reporters-qc5Smpt5.js'
import type { Match, Player } from '@/types'

const api = {
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

  player: async (name: string): Promise<Player[]> => {
    const matches = await api.list()
    const players = new Map<string, Player>()

    matches.forEach((match) => {
      const { team1, team2, goals1, goals2 } = match
      const allPlayers = [...new Set([...team1.split(','), ...team2.split(',')])].map(playerName => playerName.trim())

      allPlayers.forEach((playerName) => {
        const player = players.get(playerName) || { name: playerName, matches: 0, score: 0 }
        player.matches++
        if (team1.includes(playerName)) {
          if (goals1 > goals2)
            player.score += 1
          else if (goals1 < goals2)
            player.score -= 1
        }
        if (team2.includes(playerName)) {
          if (goals1 > goals2)
            player.score -= 1
          else if (goals1 < goals2)
            player.score += 1
        }

        players.set(playerName, player)
      })
    })

    return Array.from(players.values())
  }

  ,
}

export default api
