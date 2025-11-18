
const TwitchEmbed = () => {
  return <div className="grid grid-cols-1 gap-4 place-items-stretch" style={{ aspectRatio: '16 / 9' }} >
    <iframe src="https://player.twitch.tv/?channel=urgamingtournament&parent=ur-game-tournament.netlify.app" />
  </div>;
}

export default TwitchEmbed;