import "./SessionItem.css";
import ListeningIcon from "../assets/headphones.png";
import VocabularyIcon from "../assets/word.png";
import HangulIcon from "../assets/letter.png";
import SpeakingIcon from "../assets/speaking.png";

function SessionItems({ activityType, duration, date, notes }) {
  const icons = {
    'Listening': ListeningIcon,
    'Vocabulary': VocabularyIcon,
    'Hangul Characters': HangulIcon,
    'Speaking': SpeakingIcon,
    // 'Reading': ReadingIcon,
    // 'Writing': WritingIcon,
  };

  return (
    <div className="session-item">
      <div className="session-left">
        <img
          src={icons[activityType]}
          alt={activityType}
          className="session-icon"
        />
        <div className="session-info">
          <span className="session-type">{activityType}</span>
          <span className="session-notes">{notes ?? "—"}</span>
        </div>
      </div>
      <div className="session-right">
        <span className="session-duration">{duration} min</span>
        <span className="session-date">{date}</span>
      </div>
    </div>
  );
}

export default SessionItems;
