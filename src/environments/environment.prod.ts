export const environment = {
  production: true
};

export const SpotifyConfiguration = {
  clientID: '',
  authEndpoint: 'https://accounts.spotify.com/authorize',
  redirectUrl: 'http://localhost:4200/player/',
  scopes: [
    'user-read-currently-playing', // musica tocando agora
    'user-read-recently-played', // ler musicas tocadas recentemente
    'user-read-playback-state', // ler estado do player do usuario
    'user-top-read', // top artistas e musicas do usuario
    'user-modify-playback-state', // alterar player do usuario
    'user-library-read', // ler biblioteca do usuario
    'playlist-read-private', // ler playlists privadas
    'playlist-read-collaborative'// ler playlists abertas
  ]
}
