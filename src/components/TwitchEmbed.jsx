import links from '../data/links.json';

const TwitchEmbed = () => {
    return <div className="grid grid-cols-1 gap-4 place-items-stretch" style={{ aspectRatio: '16 / 9' }} >
      <iframe src={links.Twitch} allowFullScreen="true" scrolling="no" frameBorder={0} />
    </div>;
  }
  
  export default TwitchEmbed;