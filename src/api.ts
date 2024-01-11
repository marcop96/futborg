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
      const team1Players = team1.split(',')
      const team2Players = team2.split(',')
      const allPlayers = team1Players.concat(team2Players)

      team1Players.forEach((playerName) => {
        const player = players.get(playerName) || { name: playerName, matches: 0, score: 0 }
        player.matches++
        player.score += goals1 - goals2
        players.set(playerName, player)
      })

      team2Players.forEach((playerName) => {
        const player = players.get(playerName) || { name: playerName, matches: 0, score: 0 }
        player.matches++
        player.score += goals2 - goals1
        players.set(playerName, player)
      })
    })

    return Array.from(players.values())
  },
}

export default api
